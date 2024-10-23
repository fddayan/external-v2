import React from "react";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { Button } from "@src/components/new-nessie";
import { mediaQueriesMax } from "@src/styles/theme";
import { display, textAlign } from "styled-system";
import Translate from "@src/components/translation/Translate";
import DownloadButton from "../DownloadButton";

interface HeroSectionProps {
  heading: string;
  tagline: string;
  downloadHeading: string;
  downloadDescription: string;
  downloadButtonText: string;
  downloadButtonUrl: string;
  images: {
    starDojo: string;
    mentorSeal: string;
    certificate: string;
    presentation: string;
    leftSide: string;
    bgCurve: string;
  };
  downloadAction: (eventId: string) => void;
  setEmailAction: (url: string, eventId: string) => void;
  isLoggedIn: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = (props) => {
  const theme = useTheme();

  const backgroundCss = {
    backgroundColor: theme.__new.colors.grape50,
    paddingTop: theme.__new.spacing[30],
    paddingBottom: 200,
    backgroundImage:
      "url(https://static.classdojo.com/uploads/c426ba99-41f9-4e05-acba-952b50b2e43f.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center 300px",
    [mediaQueriesMax[1]]: {
      paddingBottom: 60,
    },
  } as const;

  const sealContainerCss = {
    display: "grid",
    placeContent: "center",
    height: 75,
    margin: "auto",
    marginBottom: theme.__new.spacing[18],
  } as const;

  const flexCss = {
    display: "flex",
    alignItems: "center",
    maxWidth: 1000,
    marginTop: -50,
    marginInline: "auto",
    marginBottom: 50,
    [mediaQueriesMax[1]]: {
      flexDirection: "column",
      textAlign: "center",
      marginTop: 0,
    },
  } as const;

  const headingCss = {
    ...theme.__new.typography.Display2ExtraBold,
    color: theme.__new.colors.bwWhite,
    marginBottom: theme.__new.spacing[30],
  } as const;

  const taglineCss = {
    ...theme.__new.typography.Display4Medium,
    color: theme.__new.colors.bwWhite,
  } as const;

  const starCss = {
    width: 700,
    minWidth: "50%",
    transform: "scale(1.5) translateX(20px)",
    [mediaQueriesMax[1]]: {
      display: "none",
    },
  } as const;

  const cardCss = {
    padding: "60px 54px 42px",
    borderRadius: theme.__new.spacing[30],
    marginTop: -120,
    backgroundColor: theme.__new.colors.bwWhite,
    boxShadow: theme.boxShadows[2],
    position: "relative",
    zIndex: 999,
    margin: "auto",
  } as const;

  const cardHeadingCss = {
    ...theme.__new.typography.Display3ExtraBold,
    color: theme.__new.colors.grape90,
    textAlign: "center",
    marginBottom: theme.__new.spacing[12],
  } as const;

  const cardDescriptionCss = {
    ...theme.__new.typography.Body1,
    marginBottom: theme.__new.spacing[24],
    color: theme.__new.colors.grape90,
    textAlign: "center",
  } as const;

  const buttonCss = {
    margin: "auto",
  } as const;

  const presentationCss = {
    position: "absolute",
    right: -185,
    bottom: -134,
    [mediaQueriesMax[1]]: {
      display: "none",
    },
  } as const;

  const certificateCss = {
    position: "absolute",
    right: -153,
    bottom: 19,
    [mediaQueriesMax[1]]: {
      display: "none",
    },
  } as const;

  const leftSideCss = {
    position: "absolute",
    left: -180,
    bottom: -130,
    [mediaQueriesMax[1]]: {
      display: "none",
    },
  } as const;

  const inlineStarCss = {
    display: "none",
    [mediaQueriesMax[1]]: {
      display: "block",
      marginTop: -200,
      transform: "translateY(50px)",
    },
  } as const;

  return (
    <div css={backgroundCss}>
      <Container>
        <div css={sealContainerCss}>
          <img src={props.images.mentorSeal} alt="" />
        </div>
        <div css={flexCss}>
          <div>
            <h1 css={headingCss}>
              <Translate path={props.heading} />
            </h1>
            <p css={taglineCss}>
              <Translate path={props.tagline} />
            </p>
          </div>
          <img src={props.images.starDojo} css={starCss} alt="" />
        </div>
        <div css={{ position: "relative", maxWidth: 700, margin: "auto" }}>
          <div css={cardCss}>
            <img src={props.images.starDojo} css={inlineStarCss} alt="" />
            <h2 css={cardHeadingCss}>
              <Translate path={props.downloadHeading} />
            </h2>
            <p css={cardDescriptionCss}>
              <Translate path={props.downloadDescription} />
            </p>
            <DownloadButton
              css={buttonCss}
              downloadUrl={props.downloadButtonUrl}
              openModal={() =>
                props.setEmailAction(props.downloadButtonUrl, "main_zip")
              }
              isLoggedIn={props.isLoggedIn}
              logDownloadEvent={() => props.downloadAction("main_zip")}
            >
              <Translate path={props.downloadButtonText} />
            </DownloadButton>
            <img src={props.images.presentation} css={presentationCss} alt="" />
          </div>
          <img src={props.images.certificate} css={certificateCss} alt="" />
          <img src={props.images.leftSide} css={leftSideCss} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
