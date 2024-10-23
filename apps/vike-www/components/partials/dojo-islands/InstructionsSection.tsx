import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React from "react";
import { lineHeight } from "styled-system";

export interface InstructionsSectionProps {
  heading: string;
  description: string;
  instructions: {
    text: string;
    image: string;
    url: string;
  }[];
  image: string;
}
const InstructionsSection: React.FC<InstructionsSectionProps> = (props) => {
  const theme = useTheme();

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: 18,
    maxWidth: 800,
    "@media (min-width: 768px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: 30,
    },
  };

  const textCss = {
    ...theme.__new.typography.Headline2Medium,
    marginBottom: 48,
    maxWidth: 800,
    "@media (min-width: 768px)": {
      ...theme.__new.typography.Headline1Medium,
      marginBottom: 60,
    },
  };

  const flexCss = {
    display: "flex",
    flexDirection: "column",
    gap: 42,
    marginBottom: 48,
    "@media (min-width: 768px)": {
      flexDirection: "row",
      gap: 30,
      marginBottom: 0,
    },
  };

  const instructionCss = {
    display: "flex",
    flexDirection: "column",

    "& .heading": {
      flexGrow: 1,
      display: "flex",
      gap: 18,
      marginBottom: 18,
    },

    "& span": {
      ...theme.__new.typography.Headline2ExtraBold,
      fontSize: 18,
      color: "white",
      display: "block",
      lineHeight: 1,
      borderRadius: 99,
      minWidth: 40,
      height: 40,
      backgroundColor: theme.__new.colors.grape60,
      padding: "12px 0 10px",
      textAlign: "center",
    },

    "& p": {
      ...theme.__new.typography.Display5ExtraBold,
    },

    "& .image": {
      borderRadius: 24,
      border: `5px solid ${theme.__new.colors.cloud10}`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <>
      <Container>
        <h2 css={headingCss}>
          <Translate path={props.heading} />
        </h2>
        <p css={textCss}>
          <Translate path={props.description} />
        </p>
        <div css={flexCss}>
          {props.instructions.map(({ text, image, url }, index) => {
            return (
              <a href={url} css={instructionCss} key={index}>
                <div className="heading">
                  <span>{index + 1}</span>
                  <p>
                    <Translate path={text} />
                  </p>
                </div>
                <img src={image} className="image" alt="" />
              </a>
            );
          })}
        </div>
      </Container>
      <img style={{ width: "100vw" }} src={props.image} alt="explorers" />
    </>
  );
};

export default InstructionsSection;
