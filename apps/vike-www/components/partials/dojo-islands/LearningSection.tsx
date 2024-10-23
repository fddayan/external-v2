/* eslint-disable jsx-a11y/media-has-caption */
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import Translate from "@src/components/translation/Translate";
import React from "react";
import VimeoEmbed from "../VimeoEmbed";

export interface LearningSectionProps {
  heading: string;
  description: string;
  video: string;
}

const LearningSection: React.FC<LearningSectionProps> = (props) => {
  const theme = useTheme();

  const containerCss = {
    marginTop: 100,
    "@media (max-width: 719px)": {
      padding: "0 30px",
    },
  };

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: theme.__new.spacing[18],
    maxWidth: 690,
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Display0ExtraBold,
    },
  };

  const descriptionCss = {
    ...theme.__new.typography.Headline2Medium,
    marginBottom: 24,
    maxWidth: 690,
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Headline1Medium,
      marginBottom: 48,
    },
  };

  const videoCss = {
    position: "relative",
    overflow: "hidden",
    padding: "56.25% 0 0 0",
    borderRadius: 24,
    width: "100%",
    marginBottom: 60,
    // "@media (min-width: 960px)": {
    //   height: 500,
    //   marginBottom: 100,
    // },
  };

  return (
    <Container css={containerCss}>
      <h1 css={headingCss}>
        <Translate path={props.heading} />
      </h1>
      <p css={descriptionCss}>
        <Translate path={props.description} />
      </p>
      <div css={videoCss}>
        <VimeoEmbed url={props.video} />
      </div>
    </Container>
  );
};

export default LearningSection;
