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
          // After reloading, the home screen should now be accessible
          // since the user has saved their private key. The home screen
          // has an example note the user can test their setup with
          window.location.reload();
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
