import { BodyText, Subheading, Title } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import SvgIcon from "@src/utils/SvgIcon";
import React, { useState } from "react";
import { logEvent } from "@src/utils/logClient";
import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { Display1 } from "./styles";
import { graphql, useStaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";

const StyledContainer = s(Container)`
  position: relative;
  margin: 40px auto;
  ${mediaQueries[1]} {
    margin: 60px auto;
  }
`;

const Columns = s.div`
  display: flex;
  flex-direction: column;
  ${mediaQueries[1]} {
    flex-direction: row;
    gap: 20px;
  }
`;

const Header = s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const QuestionContainer = s("div")<{ active: boolean }>`
  padding: 30px 70px 0 30px;
  margin-bottom: 20px;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  z-index: 9;
  background-color: #F1F3F8;
  break-inside: avoid;
  & > h3 {
    margin: 0;
    font-weight: 700;
    text-wrap: balance;
    font-family: DojoDisplay !important;
    margin-bottom: 30px;
  }
  & > div {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.2s ease-out, opacity 0.8s ease-out;
    // opacity: 0;
    // overflow: hidden;
  }
  & > div > p {
    overflow: hidden;
    margin-bottom: 0;
    transition: all ease-out 0.8s;
    opacity: 0;
    color: #3E11A7;
  }
  & > span {
    transition: all ease 0.4s;
    position: absolute;
    top: 30px;
    right: 20px;
    svg path {
      fill: #8047FF !important;
    }
  }
  :focus-visible {
    outline: none;
  }
  ${(p) =>
    p.active &&
    `
      background: #F0E7FF;
      & > span {
        transform: rotate(45deg);
        transition: all ease 0.4s;
      }
      & > div {
        margin-top: 30px;
        grid-template-rows: 1fr;
        opacity: 1;
        transition: all ease-in 0.4s;
        > p {
          opacity: 1;
          transition: all ease-in 0.8s, opacity 0.8s ease-in 0.3s;
          padding-bottom: 30px;
        }
      }
      & p, & h3 {
        color: #3E11A7;
      }
    `}
`;

const FAQColumn = ({ faqItems, startIndex, openSections, toggleSection }) => {
  return (
    <div css={{ flex: 1 }}>
      {faqItems.map((item, index) => {
        const originalIndex = startIndex + index;
        return (
          <QuestionContainer
            key={`question${originalIndex}`}
            active={openSections[originalIndex]}
            onClick={() => toggleSection(originalIndex)}
          >
            <Subheading>{item.question}</Subheading>
            <SvgIcon name="Plus.Circle.Filled" size={38} iconColor="#8047FF" />
            <div>
              <BodyText>
                <ReactMarkdown>{item.answer}</ReactMarkdown>
              </BodyText>
            </div>
          </QuestionContainer>
        );
      })}
    </div>
  );
};

const FaqSection = (props) => {
  const data = useStaticQuery(graphql`
    {
      magnifying: file(relativePath: { eq: "schoolleader/plasticine-magnifying@2x.png" }) {
        publicURL
      }
    }
  `);

  const { magnifying } = data;

  const [openSections, setOpenSections] = useState(
    props.faq.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {}),
  );

  function toggleSection(key: number) {
    const newState = {
      ...openSections,
      [key]: !openSections[key],
    };
    setOpenSections(newState);
    logEvent({
      eventName: "web.external_page.dojo_islands.faq_click",
      eventValue: `question-${key}`,
    });
  }

  return (
    <div style={{ position: "relative" }}>
      <StyledContainer>
        <Header>
          <img src={magnifying.publicURL} width={150} alt="Illustration" />
          <Display1 css={{ marginBottom: 60, marginTop: 30, color: "#2C2A50" }}>{props.title}</Display1>
        </Header>
        <Columns>
          <FAQColumn
            faqItems={props.faq.slice(0, props.faq.length / 2)}
            startIndex={0}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          <FAQColumn
            faqItems={props.faq.slice(props.faq.length / 2)}
            startIndex={props.faq.length / 2}
            openSections={openSections}
            toggleSection={toggleSection}
          />
        </Columns>
      </StyledContainer>
    </div>
  );
};

export default FaqSection;
