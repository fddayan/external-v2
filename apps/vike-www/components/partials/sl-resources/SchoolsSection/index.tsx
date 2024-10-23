import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import React from "react";
import styles from "./styles";

export interface SchoolsSectionProps {
  image: string;
  heading1: string;
  heading2: string;
  cta: {
    url: string;
    label: string;
  };
}

const SchoolsSection: React.FC<SchoolsSectionProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  return (
    <Container css={css.container}>
      <img css={css.image} src={props.image} alt="" />
      <h2 css={css.heading}>
        <Translate path={props.heading1} />
        <span css={css.highlight}>
          <Translate path={props.heading2} />
        </span>
      </h2>
      <a
        css={css.cta}
        href={props.cta.url}
        onClick={() => logEvent("web.external_page.sl_resources.schools_section.cta.tap")}
        target="_blank"
        rel="noreferrer"
      >
        <Translate path={props.cta.label} />
      </a>
    </Container>
  );
};

export default SchoolsSection;
