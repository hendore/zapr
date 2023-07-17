import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, Subtitle, Text, TextInput } from "../../uikit";
import localforage from "localforage";

export default function SetupZaprAPI(props) {
  const navigate = useNavigate();
  const [pubkey, setPubkey] = useState("");

  // Stores the pubkey on the users device
  function handleClickNext(props) {
    localforage
      .setItem("signingconf", {
        method: "zaprapi",
        pubkey: pubkey,
      })
      .then(() => navigate("../shortcut"));
  }

  return (
    <>
      <Subtitle>Setup Zapr API</Subtitle>
      <Text>
        You've opted to use the Zapr API. Zapr will sign Zap Requests for you,
        we just need your public key to add to the comment of any Zaps you send.
      </Text>
      <Label>Public Key</Label>
      <TextInput
        type="text"
        placeholder="npub, hex"
        value={pubkey}
        onInput={(e) => setPubkey(e.target.value)}
      />
      <Button as="div" onClick={handleClickNext}>
        Next
      </Button>
    </>
  );
}
