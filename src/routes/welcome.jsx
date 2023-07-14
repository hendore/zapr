import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

export default function Welcome(props) {
  return (
    <Container>
      <Header>
        <img src="/images/bolt.fill.svg" />
        <span>Zapr</span>
      </Header>
      <p>
        Since Apple started it's crackdown on native Nostr clients providing zap
        payments that they consider to be tipping "digital content", alternative
        methods to restore Zaps have surfaced. Zapr aims to provide a fast way
        to Zap notes from any app or website without any nostr wallet
        connections whilst keeping you in full control of your private key.
      </p>
      <p>
        The next couple of steps will guide you through getting your device
        ready to Zap notes again.
      </p>
      <GetStartedButton to="/setup-shortcut">Let's Go!</GetStartedButton>
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
const GetStartedButton = Styled(Link)`
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
