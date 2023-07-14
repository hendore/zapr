import React from "react";
import Styled from "styled-components";

export default function Home(props) {
  const [copied, setCopied] = React.useState(false);

  function handleClickCopyNoteLink() {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(
          "note1pswgdnhxtze2r5nyfw9wr7p88f3qwfa3qh8x2gu6dplghvxf2v0s2mvh8j"
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
