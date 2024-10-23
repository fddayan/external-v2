import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React from "react";

export interface CertificationSectionProps {
  heading: string;
  description: string;
  badges: {
    coppa: {
      image: string;
      url: string;
    };
    cssl: {
      image: string;
      url: string;
    };
  };
}

const CertificationSection: React.FC<CertificationSectionProps> = (props) => {
  const theme = useTheme();

  const titleCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: theme.__new.spacing[18],
    textAlign: "center",
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: theme.__new.spacing[18],
    },
  };

  const descriptionCss = {
    ...theme.__new.typography.Headline2Medium,
    textAlign: "center",
    maxWidth: 720,
    margin: "auto",
    marginBottom: 30,
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Headline1Medium,
      marginBottom: 42,
      maxWidth: 720,
    },
  };

  const flexCss = {
    display: "flex",
    gap: 12,
    width: "fit-content",
    margin: "auto",
    "@media (min-width: 960px)": {
      gap: 24,
    },
  };

  const badgeCss = {
    width: 78,
    "@media (min-width: 960px)": {
      width: 135,
    },
  };

  return (
    <Container>
      <h1 css={titleCss}>
        <Translate path={props.heading} />
      </h1>
      <p css={descriptionCss}>
        <Translate path={props.description} />
      </p>
      <div css={flexCss}>
        <a href={props.badges.coppa.url}>
          <img css={badgeCss} src={props.badges.coppa.image} alt="coppa" />
        </a>
        <a href={props.badges.cssl.url}>
          <img css={badgeCss} src={props.badges.cssl.image} alt="cssl" />
        </a>
      </div>
    </Container>
  );
};

export default CertificationSection;
