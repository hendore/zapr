import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styled from "styled-components";
import { Button, Label, Text } from "../uikit";
import { getPreferredWallet, savePreferredWallet } from "../storage";

export default function Preferences(props) {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState();

  useEffect(() => {
    getPreferredWallet().then(setWallet);
  }, []);

  function handleClickSave() {
    savePreferredWallet(wallet).then(() => {
      alert("Preferences have been updated 🤙");
      navigate(-1, { replace: true });
    });
  }

  return (
    <Container>
      <h1>Zapr Preferences</h1>
      <Text>
        Configure how Zapr works, more preferences will come soon such as
        changing the default zap amounts (emoji/values) and setting a default
        comment.
      </Text>
      <Label>Lightning Wallet</Label>
      <Select value={wallet} onChange={(e) => setWallet(e.target.value)}>
        <option value="lightning:">System Default</option>
        <option value="walletofsatoshi:lightning:">Wallet of Satoshi</option>
        <option value="muun:">Muun</option>
        <option value="zuesln:lightning:">Zues</option>
        <option value="zebedee:lightning:">Zebedee</option>
        <option value="bluewallet:lightning">Blue Wallet</option>
      </Select>
      <Button onClick={handleClickSave}>Save Preferences</Button>
    </Container>
  );
}

const Container = Styled.div`
    padding: 24px;
`;

const Select = Styled.select`
    border-radius: 8px;
    padding: 18px;
    background-color: var(--color-background-2);
    color: white;
    display: block;
    border: none;
    outline: none;
    -webkit-appearance: none;
    font-size: 1em;
    margin-bottom: 28px;
`;
