import React from "react";
import Styled from "styled-components";

export default function Home(props) {
  const [copied, setCopied] = React.useState(false);

  function handleClickCopyNoteLink() {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(
          "nevent1qqsfv6cgp2enam8a6mtcvny0g9yf28zvxxuad3zl0qfpd70m2cvp0ngpz4mhxue69uhhyetvv9ujuerpd46hxtnfduhs8u9s8x"
        )
        .then(() => {
          alert("note link copied to clipboard");
          setCopied(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("no access to navigator.clipboard");
    }
  }

  return (
    <Container>
      <h1 style={{ marginBottom: 40 }}>You're Ready 🎉</h1>
      <p>
        Let's test everything works as expected, copy the note link below to
        your clipboard
      </p>
      <div onClick={handleClickCopyNoteLink}>Copy Link</div>
      {copied && (
        <>
          <p>
            Great! now just double tap the back of your iPhone to Zap the note.
          </p>
        </>
      )}
    </Container>
  );
}

const Container = Styled.div`
    padding: 24px;
`;
