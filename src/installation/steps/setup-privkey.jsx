import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, Subtitle, Text, TextInput } from "../../uikit";
import localforage from "localforage";
import CryptoJS from "crypto-js";
import { nip19 } from "nostr-tools";

export default function SetupPrivkey(props) {
  const navigate = useNavigate();
  const [privkey, setPrivkey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [passphraseConfirm, setPassphraseConfirm] = useState("");

  function handleClickNext(props) {
    if (passphrase != passphraseConfirm) {
      return alert("Your passphrases don't match.");
    }

    try {
      const { type, data } = nip19.decode(privkey);
      if (type != "nsec") {
        return alert("Private key must be in nsec format");
      }

      localforage
        .setItem("signingconf", {
          method: "privkey",
          privkey: CryptoJS.AES.encrypt(data, passphrase).toString(),
        })
        .then(() => navigate("../shortcut"));
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <Subtitle>Setup Private Key</Subtitle>
      <Text>
        You've opted to sign Zap Request events with your own encrypted private
        key. This method is not recommended for most users. If you are unsure,
        please go back and use the Zapr API method.
      </Text>
      <Label>Private Key</Label>
      <TextInput
        type="password"
        placeholder="nsec"
        value={privkey}
        onInput={(e) => setPrivkey(e.target.value)}
      />
      <Label>Encryption Passphrase</Label>
      <TextInput
        type="password"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
      />
      <Label>Confirm Passphrase</Label>
      <TextInput
        type="password"
        value={passphraseConfirm}
        onChange={(e) => setPassphraseConfirm(e.target.value)}
      />
      <Button as="div" onClick={handleClickNext}>
        Next
      </Button>
    </>
  );
}
