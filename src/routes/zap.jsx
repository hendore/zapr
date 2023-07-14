import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SimplePool, nip19 } from "nostr-tools";
import Note from "../components/note";
import { createZapRequest } from "../services/zaps";
import { fetchPaymentRequest } from "../services/wallet";
import shortNumber from "short-number";

function useNoteLookup(payload, relays) {
  const [note, setNote] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    const { _type, data } = nip19.decode(payload);

    const pool = new SimplePool();
    const noteFilter = [{ ids: [data.id || data], limit: 1 }];
    const noteSubscription = pool.sub(relays, noteFilter);
    noteSubscription.on("event", (note) => {
      noteSubscription.unsub();
      setNote(note);

      const authorFilter = [{ kinds: [0], authors: [note.pubkey], limit: 1 }];
      const authorSubscription = pool.sub(relays, authorFilter);
      authorSubscription.on("event", (author) => {
        authorSubscription.unsub();
        const profile = JSON.parse(author.content);
        setAuthor({ pubkey: author.pubkey, profile });
        console.log(profile);
      });
    });

    return () => pool.close(relays);
  }, [payload, relays]);

  return { note, author };
}

function parsePayloadEventID(payload) {
  // Handle urls for popular services (can keep adding url parsers in the future)
  // Alot of this needs a tidy up but it gets the job done for now
  if (payload.startsWith("http://") || payload.startsWith("https://")) {
    if (payload.startsWith("https://damus.io/")) {
      return payload.substr("https://damus.io/".length);
    } else {
      alert(
        "Payload is a url I don't understand. Ping @hendore with the url to get that provider supported."
      );
    }
  }

  // Not a url, we have to assume its an event id we can decode and make sense of 🤞
  return payload;
}

export default function ZapEvent(props) {
  // Can't do anything until the component has the user preferences (relays/zap-amounts/comment etc...)
  // There will soon be a way to manage these preferences (in a future release)
  const [params] = useSearchParams();
  const payload = parsePayloadEventID(decodeURI(params.get("payload")));
  const { note, author } = useNoteLookup(payload, props.preferences.relays);

  const [amount, setAmount] = useState(0);

  if (!note || !author) {
    return;
  }

  function handleClickSend(e) {
    createZapRequest({
      recipient: author.pubkey,
      note: note.id,
      sats: amount,
      comment: "Pew Pew!",
      relays: props.preferences.relays,
    })
      .then((zr) => {
        fetchPaymentRequest(zr, author)
          .then((res) => {
            if (res.pr) {
              window.location.href = "lightning:" + res.pr;
              window.close();
            } else {
              throw "Failed to fetch payment request from users lightning node.";
            }
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // Handle a case where note author doesn't have a lightning address
  // hides the zap form and replaces it with a message telling the zapper
  // whats up
  const authorHasLightningAddress =
    author.profile.lud06 || author.profile.lud16;

  return (
    <Container layout>
      <NotePreviewSection>
        <Note note={note} author={author} />
        {!authorHasLightningAddress && (
          <NoLightningAddress
            name={author.profile.display_name || author.profile.name}
          />
        )}
      </NotePreviewSection>
      {authorHasLightningAddress && (
        <ZapForm>
          <ZapPicker
            transition={{ staggerChildren: 0.03, delayChildren: 0.2 }}
            initial="initial"
            animate="visible"
          >
            {props.preferences.amounts.map((option) => (
              <ZapPickerOption
                key={option.sats}
                selected={option.sats == amount}
                onClick={() => setAmount(option.sats)}
                transition={{
                  type: "spring",
                  damping: 8,
                  stiffness: 120,
                  mass: 0.5,
                }}
                variants={{
                  initial: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
              >
                <ZapPickerOptionEmoji>{option.emoji}</ZapPickerOptionEmoji>
                <span>{shortNumber(option.sats)}</span>
              </ZapPickerOption>
            ))}
          </ZapPicker>
          <ZapButton onClick={handleClickSend} amount={amount} />
        </ZapForm>
      )}
    </Container>
  );
}

function NoLightningAddress(props) {
  return (
    <NoLightningContainer>
      🥹 <b>{props.name}</b> doesn't have a lightning address on their profile.
    </NoLightningContainer>
  );
}

const NoLightningContainer = Styled.div`
  background-color: var(--color-brand);
  padding: 24px;
  margin-top: 50px;
`;

function ZapButton(props) {
  const visible = props.amount > 0;

  return (
    <ZapButtonContainer
      whileTap={{ scale: 0.9 }}
      onClick={props.onClick}
      initial={{ opacity: 0 }}
      animate={{
        y: visible ? 0 : 100,
        scale: visible ? 1 : 0.8,
        opacity: visible ? 1 : 0,
      }}
    >
      Send {shortNumber(props.amount)}
    </ZapButtonContainer>
  );
}

const Container = Styled(motion.div)`
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  overflow: hidden;
}`;

const NotePreviewSection = Styled.div`
  padding: 24px;
  overflow: auto;
`;

const ZapForm = Styled.div`
  margin-top: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-background-2);
  border-radius: 5px 5px 0 0;
`;

const ZapFormContainer = Styled.div`
  padding: 0 var(--horizontal-padding);
`;

const SatsTextInput = Styled.input`
  width: 60%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 3em;
  font-weight: 900;
  text-align: center;
  color: white;
  font-family: var(--font-serif);
`;

const ZapPicker = Styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const ZapPickerOption = Styled(motion.div)`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  opacity: 0.8;
  background-color: var(--color-background-3);
  font-weight: 700;
  line-height: 1em;

  border: 2px solid ${(props) =>
    props.selected ? "var(--color-background-4)" : "transparent"};
`;

const ZapPickerOptionEmoji = Styled.span`
  font-size: 1.3em;
`;

const ZapButtonContainer = Styled(motion.button)`
  background-color: var(--color-brand);
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.35em;
  color: white;
  font-weight: 600;
  height: 60px;
  padding: 18px 36px;
  border-radius: 10px; 
  width: 100%;
`;
