import React, { useEffect } from "react";
import Styled from "styled-components";
import { Button, TextInput, Text } from "../../uikit";

export default function PassphraseDialog(props) {
  const input = React.useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    input.current.focus();
  }, []);

  function handleClickCancel() {
    document.body.style.overflow = "auto";
    props.onCancel();
  }

  function handleClickContinue() {
    document.body.style.overflow = "auto";
    props.onContinue(input.current.value);
  }

  return (
    <Backdrop>
      <Content>
        <Text>Enter your private key passphrase to complete the Zap</Text>
        <TextInput ref={input} type="password" />
        <ActionsContainer>
          <CancelButton as="div" onClick={handleClickCancel}>
            Cancel
          </CancelButton>
          <ContinueButton as="div" onClick={handleClickContinue}>
            Continue
          </ContinueButton>
        </ActionsContainer>
      </Content>
    </Backdrop>
  );
}

const Backdrop = Styled.div`
  position:absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Content = Styled.div`
  background-color: var(--color-background-2);
  padding: 24px;
  border-radius: 8px;
  text-align: center;
`;

const ActionsContainer = Styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = Styled(Button)`
    flex: 1;
  background-color: var(--color-background-3);
  text-align: center;
`;

const ContinueButton = Styled(Button)`
  flex: 1;
  text-align: center;
`;
