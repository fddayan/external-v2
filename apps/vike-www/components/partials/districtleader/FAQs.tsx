import { BodyText, Subheading, Title } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import SvgIcon from "@src/utils/SvgIcon";
import React, { useState } from "react";
import { logEvent } from "@src/utils/logClient";
import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { Display2 } from "./styles";
import { graphql, useStaticQuery } from "gatsby";

export type FaqSectionProps = {
  title: string;
  faq: {
    question: string;
    answer: string;
  }[];
};

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
  justify-content: space-between;
  align-items: center;
  flex-direction: column-reverse;
  ${mediaQueries[0]} {
    flex-direction: row;
  }
  ${mediaQueriesMax[0]} {
    text-align: center;
    margin-bottom: 40px;
  }

`;

const QuestionContainer = s("div")<{ active: boolean }>`
  padding: 18px 54px 18px 18px;
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
  }
  & > div {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s ease-out, margin-top 0.4s ease-out;
    margin-top: 0;
  }
  & > div > p {
    overflow: hidden;
    margin-bottom: 0;
  }
  & > span {
    transition: all ease 0.4s;
    position: absolute;
    top: 21px;
    right: 18px;
    svg path {
      fill: #3E11A7 !important;
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
        transform: rotate(135deg);
        transition: all ease 0.4s;
      }
      & > div {
        grid-template-rows: 1fr;
        margin-top: 16px;
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
            <SvgIcon name="Plus.Circle.Filled" size={28} />
            <div>
              <BodyText dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </QuestionContainer>
        );
      })}
    </div>
  );
};

const FaqSection: React.FC<FaqSectionProps> = (props) => {
  const data = useStaticQuery(graphql`
    {
      magnifying: file(relativePath: { eq: "districts/plasticine-magnifying.png" }) {
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
          <Display2 css={{ maxWidth: 590, marginBottom: 30 }}>Here to answer all your questions</Display2>
          <img src={magnifying.publicURL} width={380} alt="Illustration" />
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
