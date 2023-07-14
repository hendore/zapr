import React, { useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { getPrivateKey, savePrivateKey } from "../services/userdata";

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
        device will remove this store, if that happens just visit Zapr in your
        browser and follow these steps again to continue Zapping.
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
      <h1>You're all set!</h1>
      <p>
        You can now close this page and start Zapping. Open your preferred nostr
        client, find a note you would like to zap and copy it's ID to your
        clipboard. Once copied, double (or tripple) tap the back of your iPhone
        to launch the Zap flow.
      </p>
      <p>
        📝 The first time you send a Zap, the shortcut will ask for permission
        to open up the Zapr website in your default browser, clicking always
        allow will prevent the shortcut from asking you again in the future.
      </p>
      <p>
        📝 Zapr is still in progress, some things to expect in the future
        include
      </p>
      <ul>
        <li>Browsing zaps sent</li>
        <li>Browsing zaps received</li>
        <li>
          Edit preferences (zap amounts, relay list, default wallet to open)
        </li>
        <li>Editing the comment sent with the Zap</li>
      </ul>
      <p>
        I also have an idea that will make using Zapr even easier (with the help
        of native nostr client devs)
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
