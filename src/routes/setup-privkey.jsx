import React, { useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { savePrivateKey } from "../services/userdata";

export default function SetupPrivateKey(props) {
  const [privateKeyText, setPrivateKeyText] = useState("");
  const [finished, setFinished] = useState(false);
  const inputRef = React.useRef();

  function handleClickFinish() {
    try {
      const { type, data } = nip19.decode(privateKeyText);

      if (type == "nsec") {
        savePrivateKey(data).then(() => {
          setFinished(true);
        });
      } else {
        throw "invalid nsec";
      }
    } catch (err) {
      inputRef.current.value = "";
      alert("That appears to be an invalid nsec private key, try again");
    }
  }

  if (finished) {
    return <SetupComplete />;
  }

  return (
    <Container>
      <h1>Private Key 🔒</h1>
      <p>
        Zapr needs your private key to sign Payment Request events. Event
        signing happens on your own device. Zapr will never store, share or send
        your private key anywhere and will never use your key to sign anything
        other than Payment Request events (which will not be published to
        relays).
      </p>
      <p>
        Your Zapr preferences and private key are stored in an IndexedDB store
        (on your device), be aware that clearing your browsers data on your
        device will remove this store, if that happens don't worry, you can just
        visit Zapr again in your browser to recreate it.
      </p>
      <PrivateKeyInput
        ref={inputRef}
        type="password"
        placeholder="nsec"
        value={privateKeyText}
        onChange={(e) => setPrivateKeyText(e.target.value)}
      />
      <FinishButton onClick={handleClickFinish}>Finish Setup</FinishButton>
    </Container>
  );
}

function SetupComplete(props) {
  return (
    <Container>
      <h1 style={{ marginBottom: 40 }}>You are ready!</h1>
      <p>
        Please take a moment to read the following before closing this page, it
        has some useful information on using Zapr and what's to come.
      </p>
      <h2 style={{ fontSize: "1.15em" }}>How do I zap a note?</h2>
      <p>
        There are two ways to Zap a Nostr event, you can either open a ZaprLink
        from anywhere or Tap to Zap.
      </p>
      <h3 style={{ fontSize: "0.9em" }}>What is a ZaprLink</h3>
      <p>
        ZaprLinks are just like any other url you are likely used to seeing. The
        link looks something like 'http://zapr.social/#/zap?payload=....' where
        the payload can be a bech32 encoded note identifier or even a website
        url that points to a note such as 'https://damus.io/[noteid]'
      </p>
      <p>
        Currently, when passing in a weburl as the payload only damus.io is
        currently supported but I will be releasing support for more web client
        urls, if you have a request for a specific web client url scheme to be
        supported just ask.
      </p>
      <h3 style={{ fontSize: "0.9em" }}>What about Tap to Zap?</h3>
      <p>
        Tap to Zap is useful for when you are using a native Nostr client on
        your iOS device. Most of these clients have some way of copying either
        the note identifier or a web link to that note for sharing, we can make
        use of this feature by copying either the web link of a note or it's
        identifier to your devices clipboard then double tapping on the back of
        your device to trigger the shortcut you installed earlier.
      </p>
      <p>
        The shortcut will extract the contents of your clipboard (the note
        identifier or web link) and create a ZaprLink with it. This Zapr link is
        then opened in a web view.
      </p>
      <h2 style={{ fontSize: "1.15em" }}>Additional info</h2>
      <p>
        The first time you use the Zapr shortcut, you may be asked if you would
        like to allow the shortcut access to your clipboard or to open
        zapr.hendore.com. I recommend to allways allowing this so that the
        shortcut doesn't ask you everytime you Tap to Zap.
      </p>
      <p>
        This is still an early development release so it's currently missing a
        couple of features that I've put towards the top of my todo list. The
        obvious one is allowing you to change the wallet to open after zapping,
        editing the zap amount options and specifying a comment to add to your
        Zap. They will be implemented pretty soon but if you have any feedback
        please get in touch 🫂
      </p>
      <h2 style={{ fontSize: "1.15em" }}>Known issue</h2>
      <p>
        After zapping a note, the payment request invoice will be opened in
        walletofsatoshi (support for other iOS wallets to be added over the next
        few days), the webview remains open, at this point just close the
        webview by sliding it down or tapping done to reveal your wallet.
      </p>
    </Container>
  );
}

const Container = Styled.div`
    padding: 24px;
`;

const Header = Styled.h1`
    display: flex;
    align-items: center;
    gap: 18px;
`;
const FinishButton = Styled(Link)`
    display: block;
    background-color: var(--color-brand);
    padding: 22px 28px;
    color: var(--color-text);
    border:none;
    outline:none;
    text-decoration: none;
    border-radius: var(--corner-smoothness);
    font-weight: 700;
    text-align: center;
`;

const PrivateKeyInput = Styled.input`
    background-color: var(--color-background-1);
    padding: 18px;
    border-radius: var(--corner-smoothness);
    border: none;
    outline: none;
    display: block;
    width: 100%;
    margin-bottom: 24px;
    color: white;
    font-size: 1em;
`;
