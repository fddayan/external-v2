import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React from "react";
import clockIcon from "@src/assets/images/dojo-islands/Clock.svg";
import castleIcon from "@src/assets/images/dojo-islands/castle.svg";
import { Helmet } from "react-helmet";
import { logEvent } from "@src/utils/logClient";

export interface ActivitiesSectionProps {
  heading: string;
  description: string;
  activities: {
    image: string;
    title: string;
    description: string;
    duration: string;
    grade: string;
    url: string;
  }[];
  cta: {
    label: string;
    url: string;
  };
  image: string;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = (props) => {
  const theme = useTheme();

  const containerCss = {
    display: "flex",
    flexDirection: "column",
  };

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    textAlign: "center",
    marginBottom: 12,
    "@media (min-width: 992px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: 0,
    },
  };

  const textCss = {
    ...theme.__new.typography.Headline2Medium,
    marginBottom: 18,
    textAlign: "center",
    "@media (min-width: 992px)": {
      ...theme.__new.typography.Headline1Medium,
      marginBottom: 54,
    },
  };

  const ctaCss = {
    ...theme.__new.typography.label,
    color: "white",
    backgroundColor: theme.__new.colors.contentAccent,
    borderRadius: 100,
    padding: 18,
    width: "fit-content",
    margin: "0 auto 48px",
    order: 3,
    zIndex: 9,
    "@media (min-width: 768px)": {
      margin: "0 auto -60px",
      order: 4,
    },
  };

  const flexCss = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    order: 4,
    marginBottom: 36,
    "@media (min-width: 768px)": {
      flexDirection: "row",
      order: 3,
    },
  };

  const cardCss = {
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0px -1px 1px 0px rgba(0, 0, 0, 0.10), 0px 1px 0px 0px #EBEBEB, 0px 3px 3px 0px rgba(83, 88, 135, 0.30)",
    display: "flex",
    flexDirection: "column",

    "& .image": {
      height: 200,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },

    "& .cardContent": {
      border: `2px solid ${theme.__new.colors.cloud10}`,
      borderTop: "none",
      backgroundColor: "white",
      padding: 18,
      gap: 12,
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },

    "& .title": {
      textTransform: "uppercase",
      fontSize: 23,
      margin: 0,
      "@media (min-width: 992px)": {
        fontSize: 18,
      },
    },

    "& .description": {
      ...theme.__new.typography.Headline3Medium,
      margin: 0,
      fontSize: 12,
      flexGrow: 1,
    },

    "& .infoBox": {
      ...theme.__new.typography.Body3,
      color: theme.__new.colors.contentTertiary,
      fontSize: 12,
      display: "flex",
      gap: 12,
    },

    "& .infoBox span": {
      display: "flex",
      gap: 3,
      alignItems: "center",
    },
  };

  const logCtaEvent = () => logEvent("web.external_page.dojo_islands.activity_library.tap");

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://static.classdojo.com/fonts/Grandstander/Grandstander.css"></link>
      </Helmet>
      <Container css={containerCss}>
        <h2 css={headingCss}>
          <Translate path={props.heading} />
        </h2>
        <p css={textCss}>
          <Translate path={props.description} />
        </p>
        <div css={flexCss}>
          {props.activities.map(({ image, title, description, duration, grade, url }, index) => {
            return (
              <a href={url} css={cardCss} key={index}>
                <div className="image" style={{ backgroundImage: `url(${image})` }} />
                <div className="cardContent">
                  <h3 className="title grandstander-text">
                    <Translate path={title} />
                  </h3>
                  <p className="description">
                    <Translate path={description} />
                  </p>
                  <div className="infoBox">
                    <span className="duration">
                      <img src={clockIcon} alt="clock" />
                      <Translate path={duration} />
                    </span>
                    <span className="grade">
                      <img src={castleIcon} alt="castle" />
                      <Translate path={grade} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <a onClick={logCtaEvent} css={ctaCss} href={props.cta.url}>
          <Translate path={props.cta.label} />
        </a>
      </Container>
      <img src={props.image} alt="islands" css={{ display: "block" }} />
    </>
  );
};

export default ActivitiesSection;
