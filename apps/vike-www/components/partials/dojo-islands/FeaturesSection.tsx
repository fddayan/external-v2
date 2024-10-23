import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { mediaQueriesMax } from "@src/styles/theme";
import React from "react";
import VimeoEmbed from "../VimeoEmbed";

export interface FeaturesSectionProps {
  heading: string;
  description: string;
  image: string;
  features: {
    title: string;
    text: string;
    video: string;
  }[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = (props) => {
  const theme = useTheme();

  const containerCss = {
    position: "relative",
    padding: "0 30px",
  };

  const flexCss = {
    marginBottom: 48,
    "@media (min-width: 992px)": {
      display: "flex",
      gap: 36,
      alignItems: "center",
      marginBottom: 60,
    },
  };

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginTop: 0,
    marginBottom: 18,
    "@media (min-width: 768px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: 24,
    },
  };

  const textCss = {
    ...theme.__new.typography.Headline2Medium,
    "@media (min-width: 768px)": {
      ...theme.__new.typography.Headline1Medium,
    },
  };

  const imageCss = {
    position: "absolute",
    top: -75,
    right: -35,
    width: 180,
    "@media (min-width: 992px)": {
      position: "static",
      width: 400,
    },
  };

  const cardsContainerCss = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    "@media (min-width: 992px)": {
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
    },
  };

  const cardCss = {
    height: 322,
    borderRadius: 24,
    position: "relative",
    overflow: "hidden",
    transition: "all ease 0.3s",

    "& .videoWrapper": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      overflow: "hidden",
      [mediaQueriesMax[1]]: {
        position: "relative",
        height: "560px",
      },
    },

    "& .videoContainer": {
      marginTop: "-57%",
      padding: "126.25% 0 0 0",
      width: "100%",
      position: "relative",
    },

    "& .cardContent": {
      padding: 30,
      backgroundImage: "linear-gradient(180deg, rgba(78, 62, 114, .9) 15%, rgba(78, 62, 114, 0)  100%)",
      height: "100%",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99,
    },
    iframe: {
      position: "absolute",
      top: "50% !important",
      left: "50% !important",
      width: "120% !important",
      height: "110% !important",
      transform: "translate(-50%, -50%) !important",
    },

    "&:hover .cardContent p": {
      display: "block",
    },

    "& h3": {
      ...theme.__new.typography.Headline1ExtraBold,
      color: "white",
      marginBottom: 12,
    },

    "& p": {
      ...theme.__new.typography.Body3,
      color: "white",
    },

    "@media (min-width: 992px)": {
      height: 360,
      width: 350,
      borderRadius: 30,

      "& .videoContainer": {
        marginTop: 0,
      },

      "& .cardContent": {
        padding: 36,
        p: {
          display: "none",
        },
      },

      "&:hover .cardContent": {
        p: {
          display: "block",
        },
      },

      "&:hover": {
        transform: "scale(1.2)",
        margin: "0 36px",
      },
    },

    "@media (min-width: 1200px)": {
      height: 420,
      width: 400,

      "& .videoContainer": {
        marginTop: 0,
        padding: "126.25% 0 0 0",
      },
    },
  };

  return (
    <Container css={containerCss}>
      <div css={flexCss}>
        <div>
          <h2 css={headingCss}>
            <Translate path={props.heading} />
          </h2>
          <p css={textCss}>
            <Translate path={props.description} />
          </p>
        </div>
        <img css={imageCss} src={props.image} alt="Unicorn" />
      </div>
      <div css={cardsContainerCss}>
        {props.features.map(({ title, text, video }, index) => {
          return (
            <div css={cardCss} key={index}>
              <div className="videoWrapper">
                <div className="videoContainer">
                  <VimeoEmbed url={video} />
                </div>
              </div>
              <div className="cardContent">
                <h3>
                  <Translate path={title} />
                </h3>
                <p>
                  <Translate path={text} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default FeaturesSection;
