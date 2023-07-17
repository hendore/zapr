import React from "react";
import Styled from "styled-components";
import { Button, Subtitle, Text } from "../../uikit";
import { Link } from "react-router-dom";

export default function SetupEventSigning(props) {
  return (
    <>
      <Subtitle>How do you want to sign events?</Subtitle>
      <Text>
        Zapr needs to sign Zap Request events, we've provided two options for
        you to choose from.
      </Text>
      <Text>
        The free Zapr API can sign Zap Request events for you. All you need to
        get going is your pubkey. Zaps will appear as though they were sent from
        Zapr and we will add your npub to the Zap comment.
      </Text>
      <CloudSigningButton to="./zaprapi">Zapr API</CloudSigningButton>
      <Text>
        Alternatively, you can use an encrypted private key to sign events on
        your device without the Zapr API. When using your own private key you
        are in control over how Zaps appear (profile image, name, comment)
        however we only recommend this option if you really know what you are
        doing, if you are unsure please use the API.
      </Text>
      <Text>
        Zapr will never save your private key in plain-text, by using this
        option you will need to enter your passphrase each time you send a Zap.
      </Text>
      <LocalSigningButton to="./privkey">
        Encrypted Private Key
      </LocalSigningButton>
    </>
  );
}

const SigningMethodButton = Styled(Button)`
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: 16px 16px;
  padding-left: 74px;
  margin-bottom: 24px;
`;

const CloudSigningButton = Styled(SigningMethodButton)`
  background-image: url('/images/methods/cloud-signing-icon.png');
`;

const LocalSigningButton = Styled(SigningMethodButton)`
  background-color: #d6683c;
  background-image: url('/images/methods/local-signing-icon.png');
`;
