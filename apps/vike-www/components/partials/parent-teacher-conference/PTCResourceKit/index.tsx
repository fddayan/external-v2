import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import React from "react";
import VimeoEmbed from "../../VimeoEmbed";
import styles from "./styles";

export interface PTCResourceKitProps {
  heading: string;
  tagline: string;
  cta: {
    label: string;
    url: string;
  };
  videoUrl: string;
}

const PTCResourceKit: React.FC<PTCResourceKitProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);

  const clickEvent = () => logEvent("web.external_page.parent_teacher_conference.try_signups_button.tap");

  return (
    <Container>
      <div css={css.flex}>
        <div>
          <h2 css={css.heading}>
            <Translate path={props.heading} />
          </h2>
          <p css={css.tagline}>
            <Translate path={props.tagline} />
          </p>
          <a css={css.cta} href={props.cta.url} onClick={clickEvent} target="_blank" rel="noreferrer">
            <Translate path={props.cta.label} />
          </a>
        </div>
        <div css={css.video}>
          <VimeoEmbed url={props.videoUrl} />
        </div>
      </div>
    </Container>
  );
};

export default PTCResourceKit;
