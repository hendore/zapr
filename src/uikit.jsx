import Styled from "styled-components";
import { Link } from "react-router-dom";

export const Subtitle = Styled.h2`
  margin-top: 48px;
  font-size: 18px;
`;

export const Text = Styled.p`
  color: color-mix(in srgb, var(--color-text) 80%, transparent);
`;

export const TextInput = Styled.input`
  display: block;
  width: 100%;
  background: var(--color-background-1);
  border-radius: 8px;
  border:none;
  outline:none;
  padding: 18px 24px;
  color: white;
  text-align: left;
  font-size: 1em;
  -webkit-appearance: none;
  margin-bottom: 24px;
`;

export const Label = Styled.label`
  display: block;
  font-weight: 600;
  font-size: 0.9em;
  margin-bottom: 6px;
`;

export const Button = Styled(Link)`
  display: block;
  background-color: var(--color-brand);
  padding: 24px;
  color: var(--color-text);
  border:none;
  outline:none;
  text-decoration: none;
  border-radius: var(--corner-smoothness);
  font-weight: 700;
`;
