import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { MinusIcon, PlusIcon } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import React, { useState } from "react";

export interface FaqSectionProps {
  heading: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

const FaqSection: React.FC<FaqSectionProps> = (props) => {
  const theme = useTheme();
  const [openQuestions, setOpenQuestions] = useState(
    props.faq.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {}),
  );

  function toggleQuestion(key: number) {
    const newState = {
      ...openQuestions,
      [key]: !openQuestions[key],
    };
    setOpenQuestions(newState);
    logEvent({
      eventName: `web.external_page.dojo_islands.faq.expand.show_${openQuestions[key] ? "more" : "less"}.tap`,
      metaData: { question: props.faq[key].question },
    });
  }

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: 30,
    textAlign: "center",
    width: "100%",
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: 60,
    },
  };

  const flexCss = {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 80,
    "@media (min-width: 960px)": {
      flexDirection: "row",
      gap: "24px 36px",
    },
  };

  const columnCss = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  };

  const faqCss = {
    backgroundColor: theme.__new.colors.grape10,
    padding: 24,
    borderRadius: 18,

    "& .question": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 18,
    },

    "& h2": {
      ...theme.__new.typography.Display6ExtraBold,
      fontSize: 20,
      margin: 0,
    },

    "& .answer": {
      ...theme.__new.typography.Headline3Medium,
      marginTop: 18,
    },

    "& button": {
      border: "none",
      width: 36,
      height: 36,
      display: "grid",
      placeContent: "center",
      borderRadius: 99,
      cursor: "pointer",
    },

    "@media (min-width: 960px)": {
      padding: 30,

      "& .question": {
        gap: 30,
      },

      "& h2": {
        fontSize: 23,
      },

      "& .answer": {
        fontSize: 21,
      },
    },
  };

  const half = Math.ceil(props.faq.length / 2);
  const firstHalf = props.faq.slice(0, half);
  const secondHalf = props.faq.slice(half);

  return (
    <Container>
      <h1 css={headingCss}>
        <Translate path={props.heading} />
      </h1>
      <div css={flexCss}>
        <div css={columnCss}>
          {firstHalf.map(({ question, answer }, index) => (
            <div css={faqCss} key={index}>
              <div className="question">
                <h2>
                  <Translate path={question} />
                </h2>
                <button onClick={() => toggleQuestion(index)}>
                  {openQuestions[index] ? (
                    <MinusIcon color="grape50" size="l" />
                  ) : (
                    <PlusIcon color="grape50" size="l" />
                  )}
                </button>
              </div>
              {openQuestions[index] && (
                <div className="answer">
                  <Translate path={answer} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div css={columnCss}>
          {secondHalf.map(({ question, answer }, index) => (
            <div css={faqCss} key={index + half}>
              <div className="question">
                <h2>
                  <Translate path={question} />
                </h2>
                <button onClick={() => toggleQuestion(index + half)}>
                  {openQuestions[index + half] ? (
                    <MinusIcon color="grape50" size="l" />
                  ) : (
                    <PlusIcon color="grape50" size="l" />
                  )}
                </button>
              </div>
              {openQuestions[index + half] && (
                <div className="answer">
                  <Translate path={answer} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FaqSection;
