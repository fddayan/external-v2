import React, { useContext, useState, useEffect } from "react";
import Container from "@src/components/Container";
import {
  Caption,
  Headline1,
  PurpleBox,
  Blockquote,
  Display1,
  Display2,
  Icon,
  Body1,
} from "@src/components/partials/schoolleader/styles";
import { Button } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import CommonModal from "@src/components/modals/CommonModal";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import ReactMarkdown from "react-markdown";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { Carret } from "@src/components/partials/schoolleader/styles";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  margin-block: 48px;

  ${mediaQueriesMax[1]} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #f6f2ff;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  padding-block: 24px;
  padding-inline: 30px;
  gap: 18px;
  max-width: 430px;
  text-align: left;
  justify-self: center;
  ${mediaQueriesMax[1]} {
    svg {
      display: none;
    }
  }
`;

const Letter = ({ cards, founders, signature }) => {
  const t = useContext(TranslationContext);

  return (
    <>
      <Container maxWidth={700} marginBottom={80} css={{ textAlign: "center" }}>
        <img
          src={founders}
          width={375}
          alt="Sam & Liam"
          css={{ marginBottom: 36 }}
        />
        <Display1 css={{ marginBottom: 48 }}>
          {t.translate("directus.page_privacy_2024.Letter_heading")}
        </Display1>
        <Headline1 css={{ fontWeight: 500 }}>
          <ReactMarkdown>
            {t.translate("directus.page_privacy_2024.Letter_part_1").toString()}
          </ReactMarkdown>
        </Headline1>
        <Display2 css={{ marginTop: 80, color: "#2c2a50" }}>
          {t.translate("directus.page_privacy_2024.Cards_heading")}
        </Display2>
      </Container>
      <Container>
        <CardContainer>
          {cards.map((card, index) => (
            <Card key={index}>
              <Icon icon={card.icon} />
              <Headline1 css={{ flexGrow: 1 }}>{card.heading}</Headline1>
              <Body1 css={{ flexGrow: 1, marginBottom: 0 }}>
                {card.cta_text}
              </Body1>
            </Card>
          ))}
        </CardContainer>
      </Container>
      <Container maxWidth={700} css={{ textAlign: "center" }}>
        <Headline1 css={{ fontWeight: 500, marginTop: 80 }}>
          <ReactMarkdown>
            {t.translate("directus.page_privacy_2024.Letter_part_2").toString()}
          </ReactMarkdown>
        </Headline1>
        <img src={signature} width={266} alt="Sam & Liam" />
      </Container>
    </>
  );
};

export default Letter;
