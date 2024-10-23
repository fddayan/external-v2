import React, { useContext } from "react";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { Oversized } from "../schoolleader/styles";
import Translate from "@src/components/translation/Translate";
import ReactMarkdown from "react-markdown";
import { Headline1 } from "../schoolleader/styles";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const Hero = styled.div`
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  color: #fff;
  margin-block: 80px;
  text-align: center;

  ${mediaQueriesMax[1]} {
    background-size: cover;
    height: 400px;
    margin-block: 25px;
  }
`;

const PrivacyHero = ({ heading, bgImage }) => {
  const t = useContext(TranslationContext);

  return (
    <Container>
      <Hero
        css={{
          backgroundImage: `linear-gradient(0deg, rgba(9, 1, 25, 0.30) 0%, rgba(9, 1, 25, 0.30) 100%), url(${bgImage})`,
        }}
      >
        <Oversized css={{ color: "#fff" }}>
          Privacy.
          <br />
          By ClassDojo.
        </Oversized>
      </Hero>
      <div css={{ maxWidth: 700, marginInline: "auto", marginBottom: 80 }}>
        <Headline1 css={{ fontWeight: 500, textAlign: "center" }}>
          <ReactMarkdown>
            {t.translate("directus.page_privacy_2024.Hero_text").toString()}
          </ReactMarkdown>
        </Headline1>
      </div>
    </Container>
  );
};

export default PrivacyHero;
