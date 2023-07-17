import React, { useState } from "react";
import Styled from "styled-components";

export default function ClipboardTest(props) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  function handleClickCopy() {
    // Happens in development, clipboard api requires to be served over https
    if (!navigator.clipboard) {
      return alert("Failed to copy to clipboard");
    }

    navigator.clipboard
      .writeText(props.content)
      .then(() => {
        setCopiedToClipboard(true);
        setTimeout(() => {
          setCopiedToClipboard(false);
        }, 200);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <Container>
      <Content>{props.content}</Content>
      <CopyButton onClick={handleClickCopy}>
        {copiedToClipboard ? "✅ Copied" : "📋 Copy"}
      </CopyButton>
    </Container>
  );
}

const Container = Styled.div`
      display: flex;
      background-color: var(--color-background-1);
      border: 1px solid var(--color-background-2);
      border-radius: 5px;
      padding: 8px;
      gap: 8px;
      margin-bottom: 12px;
  `;

const Content = Styled.div`
      background-color: transparent;
      color: var(--color-background-4);
      flex: 1;
      outline: none;
      border:none;
      overflow: auto;
  `;

const CopyButton = Styled.div`
      font-weight: 600;
      font-size: 0.8em;
  `;
