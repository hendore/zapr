import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import ZapForm from "./components/zap-form/zap-form";
import NotePreview from "./components/note-preview";
import PassphraseDialog from "./components/passphrase-dialog";
import usePayloadParser from "./hooks/payload-parser";
import { useNoteSub, useNoteAuthorSub } from "./hooks/nostr-subscriptions";
import localforage from "localforage";
import { getUserPreference } from "../storage";
import {
  createZaprSignedZapRequest,
  createLocallySignedZapRequest,
} from "../payment-requests";
import { createPaymentRequest } from "../lightning-wallet";

function usePreferences() {
  const [preferences, setPreferences] = useState();

  useEffect(() => {
    getUserPreference().then(setPreferences);
  }, []);

  return preferences;
}

export default function ZapEvent(props) {
  const payload = usePayloadParser();
  const preferences = usePreferences();
  const note = useNoteSub(payload, preferences?.relays);
  const recipient = useNoteAuthorSub(note, preferences?.relays);
  const [zapAmount, setZapAmount] = useState(0);
  const [askingForPassphrase, setAskingForPassphrase] = useState(false);

  if (!note || !recipient) {
    // @todo, add a loading skeleton view
    return;
  }

  async function handleSubmitZapForm() {
    try {
      const signingconf = await localforage.getItem("signingconf");

      if (!signingconf) {
        throw "No Signing Config found. Open zapr.social in Safari to setup";
      }

      if (signingconf.method == "privkey") {
        setAskingForPassphrase(true);
        return;
      }

      if (signingconf.method == "zaprapi") {
        const zapreq = await createZaprSignedZapRequest({
          senderPubkey: signingconf.pubkey,
          note,
          sats: zapAmount,
        });

        return createAndOpenInvoice(recipient, zapAmount, zapreq);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  /**
   * Used when signing a zap request locally, needs a passphrase to unlock the
   * encrypted private key to sign the event.
   *
   * @param String passphrase
   */
  async function handlePassphraseSubmit(passphrase) {
    setAskingForPassphrase(false);
    const zapreq = await createLocallySignedZapRequest({
      note,
      sats: zapAmount,
      passphrase,
    });
    alert(JSON.stringify(zapreq));

    return createAndOpenInvoice(recipient, zapAmount, zapreq);
  }

  async function createAndOpenInvoice(recipient, sats, zapreq) {
    const pr = await createPaymentRequest(recipient, sats, zapreq);
    window.location.href = "lightning:" + pr;
  }

  return (
    <Container>
      <ZapFormSection>
        <ZapForm
          amount={zapAmount}
          onChangeAmount={setZapAmount}
          predefinedAmounts={preferences.amounts}
          onSubmit={handleSubmitZapForm}
        />
      </ZapFormSection>
      <NotePreviewSection>
        <NotePreview note={note} author={recipient} />
      </NotePreviewSection>
      {askingForPassphrase && (
        <PassphraseDialog
          onCancel={() => setAskingForPassphrase(false)}
          onContinue={handlePassphraseSubmit}
        />
      )}
    </Container>
  );
}

const Container = Styled.div`
  display: flex;
  flex-direction: column;
}`;

const ZapFormSection = Styled.div`
  background: url(/images/bolts-pattern.png) repeat;
  background-size: 500px 500px;
  animation: scroll 18s linear infinite;
  padding: 24px;
`;

const NotePreviewSection = Styled.div`
  border-top: 1px solid var(--color-background-1);
  padding: 24px;
`;
