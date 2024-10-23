/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext } from "react";
import Translate from "@src/components/translation/Translate";
import { useTheme } from "@emotion/react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import VimeoEmbed from "../VimeoEmbed";
import Container from "@src/components/Container";
import { mediaQueriesMax } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";

export type pageMode = "teacher" | "parent";

export interface HeroSectionProps {
  videoUrl: string;
  heading: string;
  description: string;
  logo: string;
  toggle: {
    teachersLabel: string;
    parentsLabel: string;
    handleClick: () => void;
    activeMode: pageMode;
  };
  images: string[];
}

const HeroSection: React.FC<HeroSectionProps> = (props) => {
  const theme = useTheme();
  const { translate } = useContext(TranslationContext);

  const videoWrapperCss = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 580,
    overflow: "hidden",
    background: "#F1F3F8",
    [mediaQueriesMax[1]]: {
      height: 300,
    },
  };

  const videoContainerCSS = {
    padding: "56.25% 0 0 0",
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
    position: "relative",
  };

  const yellowCubeCss = {
    position: "absolute",
    width: 112,
    top: 130,
    left: -35,
    "@media (min-width: 768px)": {
      height: 300,
      width: 300,
      top: 333,
      left: -128,
    },
  };

  const numberCubesCss = {
    position: "absolute",
    width: 100,
    bottom: 0,
    left: -10,
    "@media (min-width: 768px)": {
      width: 267,
      top: 775,
      left: -51,
    },
  };

  const purpleCubeCss = {
    position: "absolute",
    width: 112,
    top: 288,
    right: -55,
    "@media (min-width: 768px)": {
      width: 380,
      top: 580,
      right: -131,
    },
  };

  const logoCss = {
    width: 186,
    margin: "auto",
    marginTop: -70,
    marginBottom: 18,
    display: "block",
    "@media (min-width: 768px)": {
      width: 335,
      marginTop: -120,
      marginBottom: 30,
    },
  };

  const titleCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: theme.__new.spacing[18],
    textAlign: "center",
    "@media (min-width: 768px)": {
      ...theme.__new.typography.OversizeDisplay,
      margin: "auto",
      marginBottom: theme.__new.spacing[18],
      maxWidth: 992,
    },
  };

  const descriptionCss = {
    ...theme.__new.typography.Headline2Medium,
    textAlign: "center",
    "@media (min-width: 768px)": {
      ...theme.__new.typography.Headline1Medium,
      maxWidth: 760,
      margin: "auto",
      marginBottom: 42,
    },
  };

  const toggleCss = {
    background: theme.__new.colors.bwWhite,
    border: "none",
    boxShadow: theme.boxShadows[2],
    position: "relative",
    top: "50%",
    width: 250,
    height: 72,
    borderRadius: 99,
    margin: "30px auto 90px auto",
    overflow: "hidden",
    display: "block",
    padding: 0,
    "@media (min-width: 768px)": {
      width: 370,
      height: 96,
      marginBottom: 90,
    },

    "&:focus-visible": {
      outlineColor: theme.__new.colors.contentAccent,
    },

    "& .knobs": {
      position: "relative",
      zIndex: 2,
      height: "100%",
      display: "grid",
      alignItems: "center",
      textAlign: "left",
      transition: "0.3s ease all",
    },

    "& .knobs:before, & .knobs:after, & .knobs span": {
      ...theme.__new.typography.Headline3Bold,
      display: "grid",
      placeContent: "center",
      position: "absolute",
      top: "6px",
      width: "120px",
      height: "60px",
      textAlign: "center",
      lineHeight: 1,
      borderRadius: "99px",
      transition: "0.3s ease all",
      "@media (min-width: 768px)": {
        ...theme.__new.typography.Headline1Medium,
        fontWeight: 700,
        width: 185,
        height: 85,
      },
    },

    "& .knobs:before": {
      content: `""`,
      right: props.toggle.activeMode === "parent" ? 6 : 124,
      backgroundColor: theme.__new.colors.contentAccent,
      "@media (min-width: 768px)": {
        right: props.toggle.activeMode === "parent" ? 6 : 179,
      },
    },

    "& .knobs:after": {
      content: `"${translate(props.toggle.parentsLabel)}"`,
      right: "6px",
      color: props.toggle.activeMode === "parent" ? "#fff" : theme.__new.colors.contentAccent,
    },

    "& .knobs span": {
      left: "6px",
      color: props.toggle.activeMode === "parent" ? theme.__new.colors.contentAccent : "#fff",
      zIndex: 1,
    },
  };

  const handleToggleClick = () => {
    props.toggle.handleClick(),
      logEvent({
        eventName: "web.external_page.dojo_islands.teachers_parents_toggle.tap",
        metaData: { mode: props.toggle.activeMode },
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div css={videoWrapperCss}>
        <div css={videoContainerCSS}>
          <VimeoEmbed url={props.videoUrl} noControls />
        </div>
      </div>
      <img css={yellowCubeCss} src={props.images[0]} alt="float cube" />
      <img css={numberCubesCss} src={props.images[1]} alt="float cube" />
      <img css={purpleCubeCss} src={props.images[2]} alt="float cube" />
      <Container>
        <img css={logoCss} src={props.logo} alt="Dojo Islands logo" />
        <h1 css={titleCss}>
          <Translate path={props.heading} />
        </h1>
        <p css={descriptionCss}>
          <Translate path={props.description} />
        </p>
        <button css={toggleCss} onClick={handleToggleClick} className="toggle-button">
          <div className="knobs">
            <span>
              <Translate path={props.toggle.teachersLabel} />
            </span>
          </div>
        </button>
      </Container>
    </div>
  );
};

export default HeroSection;
