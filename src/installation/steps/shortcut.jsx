import React from "react";
import Styled from "styled-components";
import ClipboardTest from "../components/clipboard-test";
import { Button, Subtitle, Text } from "../../uikit";

export default function SetupShortcut(props) {
  return (
    <>
      <Subtitle>Double Tap to Zap</Subtitle>
      <Text>
        You are almost ready, last step is to set up Zaps from anywhere,
        download and install the shortcut below.
      </Text>
      <Text>
        Once installed, open your iPhone settings app and navigate to
        "Accessibility → Touch". Open the "Back Tap" settings and assign the
        Zapr shortcut you just installed to "Double Tap".
      </Text>
      <Button as="a" href="/zapr.shortcut" download="Zapr">
        <span>Download Shortcut</span>
      </Button>
      <Subtitle>Using Zapr</Subtitle>
      <Text>
        With the shortcut installed and setup to run on Double Tap, you are all
        set! 🎉
      </Text>
      <Text>
        Simply get a copy of the Note ID or a supoorted website url on your
        clipboard then double tap the back of your iPhone. Go ahead, test it out
        below.
      </Text>
      <ClipboardTest content="nevent1qqswkkfl5v4gpcd5vmyg32xjnm96ekw4m4uwlrdyvxah4980mwtmcqgpz4mhxue69uhhyetvv9ujuerpd46hxtnfduhsyjarwm" />
      <ClipboardTest content="https://snort.social/e/nevent1qqswkkfl5v4gpcd5vmyg32xjnm96ekw4m4uwlrdyvxah4980mwtmcqgpz4mhxue69uhhyetvv9ujuerpd46hxtnfduhsyjarwm" />
      <ClipboardTest content="https://damus.io/nevent1qqswkkfl5v4gpcd5vmyg32xjnm96ekw4m4uwlrdyvxah4980mwtmcqgpz4mhxue69uhhyetvv9ujuerpd46hxtnfduhsyjarwm" />
      <Text>
        You may now close this tab and Zap from anywhere. If you would like to
        update your preferences such as how to handle event signing, just visit
        zapr.social in Safari again to overwrite your previous preferences (you
        won't need to download and setup the shortcut again).
      </Text>
    </>
  );
}
