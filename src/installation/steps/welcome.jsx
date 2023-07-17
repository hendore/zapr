import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Subtitle, Text } from "../../uikit";

export default function Welcome(props) {
  return (
    <>
      <Subtitle>What is Zapr?</Subtitle>
      <Text>
        Zapr provides a quick and easy way to Zap Nostr notes from any native or
        web application on your iOS device.
      </Text>
      <Text>
        It works by simply double tapping the back of your device after copying
        a Nostr Note ID or URL to your clipboard.
      </Text>
      <Button to="/install/event-signing">Get Started</Button>
    </>
  );
}
