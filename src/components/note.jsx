import React from "react";
import Styled from "styled-components";

export default function Note(props) {
  const paragraphs = props.note.content
    .split("\n")
    .filter((p) => p.length != 0)
    .map((p) => p.trim());

  return (
    <Container>
      <Metadata>
        <Avatar src={props.author.profile.picture} />
        <div>
          <DisplayName>
            {props.author.profile["name"].trim() ||
              props.author.profile["display_name"].trim()}
          </DisplayName>
          <Timestamp>3h</Timestamp>
        </div>
      </Metadata>
      <Content>
        {paragraphs.map((paragraph) => {
          return <p>{paragraph}</p>;
        })}
      </Content>
    </Container>
  );
}

const Container = Styled.div`
  background-color: color-mix(in srgb, var(--color-background-1) 80%, transparent);
  border-radius: var(--corner-smoothness);
  padding: 16px;
  backdrop-filter: blur(5px);
`;

const Metadata = Styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Avatar = Styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
`;

const DisplayName = Styled.div`
    font-weight: 600;
`;

const Timestamp = Styled.div`
  font-weight: 400;
  opacity: 0.5;
`;

const Content = Styled.div`
  word-break: break-word;
`;
