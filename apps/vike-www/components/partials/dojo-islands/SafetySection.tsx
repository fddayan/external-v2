import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React from "react";

export interface SafetySectionProps {
  heading: string;
  description: string;
  image: string;
  safety: {
    title: string;
    image: string;
  }[];
}
const SafetySection: React.FC<SafetySectionProps> = (props) => {
  const theme = useTheme();

  const flexCss = {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    "@media (min-width: 960px)": {
      flexDirection: "row",
      justifyContent: "spaceBetween",
    },
  };

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: theme.__new.spacing[18],
    maxWidth: 690,
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: theme.__new.spacing[18],
    },
  };

  const descriptionCss = {
    ...theme.__new.typography.Headline2Medium,
    marginBottom: 30,
    maxWidth: 670,
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Headline1Medium,
      marginBottom: 42,
    },
  };

  const imageCss = {
    width: 250,
    "@media (min-width: 960px)": {
      width: 528,
      marginRight: -160,
    },
  };

  const cardContainerCss = {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    "@media (min-width: 960px)": {
      flexDirection: "row",
      gap: 24,
      alignItems: "end",
      marginTop: -42,
    },
  };

  const cardCss = (index) => {
    const backgroundColors = [theme.__new.colors.frog10, theme.__new.colors.cloud10];
    const margins = [0, -35];
    return {
      backgroundColor: backgroundColors[index],
      padding: 30,
      display: "grid",
      borderRadius: 18,
      "&>p": {
        ...theme.__new.typography.Display5ExtraBold,
      },

      "&>img": {
        borderRadius: 12,
      },
      "@media (min-width: 960px)": {
        maxWidth: "calc(50% - 12px)",
        marginBottom: margins[index],
        padding: 36,
        borderRadius: 24,
        height: "min-content",
        "&>p": {
          ...theme.__new.typography.Display4ExtraBold,
        },
      },
    };
  };

  return (
    <Container>
      <div css={flexCss}>
        <div>
          <h1 css={headingCss}>
            <Translate path={props.heading} />
          </h1>
          <p css={descriptionCss}>
            <Translate path={props.description} />
          </p>
        </div>
        <img css={imageCss} src={props.image} alt="monsters" />
      </div>
      <div css={cardContainerCss}>
        {props.safety.map(({ title, image }, index) => (
          <div css={cardCss(index)} key={index}>
            <p>
              <Translate path={title} />
            </p>
            <img src={image} alt="screenshot" />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SafetySection;
