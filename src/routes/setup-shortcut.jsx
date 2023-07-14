import React, { useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

export default function SetupShortcut(props) {
  const [privateKeyText, setPrivateKeyText] = useState("");
  const profile = useProfileLoader(privateKeyText);

  return (
    <Container>
      <h1>Double Tap to Zap ⚡️</h1>
      <p>
        Download and install the shortcut. Once installed, bind the shortcut to
        your iPhones double tap feature. Open and navigate to{" "}
        <b>"Accessibility → Touch"</b> in your iPhone settings. From there,
        enable the <b>"Back Tap"</b> feature then assign the shortcut you just
        installed to either <b>"Double Tap"</b> or <b>"Tripple Tap"</b>.
      </p>
      <SettingsImage src="/images/double-tap-settings.jpg" />
      <DownloadButton as="a" href="/downloads/zapr.shortcut" download="Zapr">
        <span>🚀</span>
        <span>Download Shortcut</span>
      </DownloadButton>
      <NextButton to="/setup-privkey">I've done that, next!</NextButton>
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
const SettingsImage = Styled.img`
  border: 3px solid var(--color-background-4);
  margin-bottom: 24px;
`;
const DownloadButton = Styled(Link)`
    display: block;
    background-color: var(--color-background-3);
    padding: 22px 28px;
    color: var(--color-text);
    border:none;
    outline:none;
    text-decoration: none;
    border-radius: var(--corner-smoothness);
    font-weight: 700;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;
const NextButton = Styled(DownloadButton)`
  background-color: var(--color-brand);
  margin-top: 24px;
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
