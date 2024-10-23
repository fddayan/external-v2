import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import React from "react";
import styles from "./styles";

export interface HeroSectionProps {
  image: string;
  heading: string;
  links: {
    label: string;
    href: string;
    eventName: string;
  }[];
}

const HeroSection: React.FC<HeroSectionProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  return (
    <div css={css.banner} style={{ backgroundImage: `url(${props.image})` }}>
      <Container css={css.container}>
        <h1 css={css.heading}>
          <Translate path={props.heading} />
        </h1>
        <div css={css.flex}>
          {props.links.map(({ label, href, eventName }, index) => (
            <a href={href} onClick={() => logEvent(eventName)} css={css.pill} key={index}>
              <Translate path={label} />
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
