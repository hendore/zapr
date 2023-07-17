import React from "react";
import Styled from "styled-components";
import shortNumber from "short-number";
import { motion } from "framer-motion";

export default function ZapForm(props) {
  return (
    <Container>
      <AmountInput
        type="number"
        pattern="\d*"
        placeholder="0 Sats"
        value={props.amount}
        onChange={(e) => props.onChangeAmount(e.target.value)}
      />
      <ZapPicker
        transition={{ staggerChildren: 0.03, delayChildren: 0.2 }}
        initial="initial"
        animate="visible"
      >
        {props.predefinedAmounts.map((option) => (
          <ZapPickerOption
            key={option.sats}
            selected={option.sats == props.amount}
            onClick={() => props.onChangeAmount(option.sats)}
            transition={{
              type: "spring",
              damping: 8,
              stiffness: 120,
              mass: 0.5,
            }}
            variants={{
              initial: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
          >
            <ZapPickerOptionEmoji>{option.emoji}</ZapPickerOptionEmoji>
            <span>{shortNumber(option.sats)}</span>
          </ZapPickerOption>
        ))}
      </ZapPicker>
      <ZapButton onClick={props.onSubmit} amount={props.amount} />
    </Container>
  );
}

function ZapButton(props) {
  const visible = props.amount > 0;

  return (
    <ZapButtonContainer
      whileTap={{ scale: 0.9 }}
      onClick={props.onClick}
      initial={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      animate={{
        y: visible ? 0 : 100,
        // scale: visible ? 1 : 0.8,
        opacity: visible ? 1 : 0,
      }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      disabled={props.amount <= 0}
    >
      <ZapButtonText sats={props.amount} />
    </ZapButtonContainer>
  );
}

function ZapButtonText({ sats }) {
  if (sats == 1) {
    return "Zap 1 Sat";
  }

  return `Zap ${shortNumber(parseInt(sats) || 0)} Sats`;
}

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AmountInput = Styled.input`
  background: var(--color-background-1);
  border-radius: 50px;
  border:none;
  outline:none;
  font-size: 2em;
  padding: 18px 24px;
  color: white;
  text-align: center;
  -webkit-appearance: none;
`;

const ZapFormContainer = Styled.div`
  padding: 0 var(--horizontal-padding);
`;

const ZapPicker = Styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const ZapPickerOption = Styled(motion.div)`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  opacity: 0.8;
  background-color: var(--color-background-3);
  font-weight: 700;
  line-height: 1em;

  border: 2px solid ${(props) =>
    props.selected ? "var(--color-background-4)" : "transparent"};
`;

const ZapPickerOptionEmoji = Styled.span`
  font-size: 1.3em;
`;

const ZapButtonContainer = Styled(motion.button)`
  background-color: var(--color-brand);
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.35em;
  color: white;
  font-weight: 600;
  height: 60px;
  padding: 18px 36px;
  border-radius: 10px; 
  width: 100%;
`;
