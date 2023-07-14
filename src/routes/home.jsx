import React from "react";
import Styled from "styled-components";

export default function Home(props) {
  return (
    <Container>
      <p>
        There's nothing to see here just yet, however it won't be long until you
        can manage your preferences and private key from here along with other
        goodies such as browsing your zaps sent/received.
      </p>
    </Container>
  );
}

const Container = Styled.div`
    padding: 24px;
`;
