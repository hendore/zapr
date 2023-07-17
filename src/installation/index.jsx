import React from "react";
import { Routes, Route } from "react-router-dom";
import Styled from "styled-components";
import Welcome from "./steps/welcome";
import EventSigning from "./steps/event-signing";
import Shortcut from "./steps/shortcut";
import SetupZaprAPI from "./steps/setup-zaprapi";
import SetupPrivkey from "./steps/setup-privkey";

export default function Installation(props) {
  return (
    <Container>
      <Header>
        <Logo src="/favicon.png" />
        <span>Zapr</span>
      </Header>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="event-signing" element={<EventSigning />} />
        <Route path="event-signing/zaprapi" element={<SetupZaprAPI />} />
        <Route path="event-signing/privkey" element={<SetupPrivkey />} />
        <Route path="shortcut" element={<Shortcut />} />
      </Routes>
    </Container>
  );
}

const Container = Styled.div`
  padding: 32px;
  background: url(/images/bolts-pattern.png) repeat;
  background-size: 500px 500px;
  animation: scroll 18s linear infinite;
  min-height: 100%;
`;

const Header = Styled.h1`
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 30px;
  font-weight: 400;
`;

const Logo = Styled.img`
  width: 40px;
  height: 40px;
  border-radius:5px;
`;
