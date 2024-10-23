import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React from "react";
import styles from "./styles";

export interface PTCHeroProps {
  heading: string;
  tagline: string;
  image: string;
}

const PTCHero: React.FC<PTCHeroProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  return (
    <Container>
      <div css={css.flex}>
        <div>
          <h1 css={css.heading}>
            <Translate path={props.heading} />
          </h1>
          <p css={css.tagline}>
            <Translate path={props.tagline} />
          </p>
        </div>
        <img css={css.image} src={props.image} alt="" />
      </div>
    </Container>
  );
};

export default PTCHero;
