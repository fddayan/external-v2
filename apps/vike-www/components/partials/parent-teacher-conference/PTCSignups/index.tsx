import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import React from "react";
import styles from "./styles";

export interface PTCSignupProps {
  icon: string;
  heading: string;
  description: string;
  cta: {
    label: string;
    url: string;
  };
  video: {
    firstLine: string;
    secondLine: string;
    thirdLine: string;
    icon: string;
    image: string;
    openModal: () => void;
  };
  image: string;
}

const PTCSignup: React.FC<PTCSignupProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  const ctaClickEvent = () => logEvent("web.external_page.parent_teacher_conference.try_signups_button.tap");
  const handleVideoModalTrigger = () => {
    props.video.openModal();
    logEvent("web.external_page.parent_teacher_conference.signups_video_modal_trigger.tap");
  };
  return (
    <Container css={css.container}>
      <div>
        <img css={css.icon} src={props.icon} alt="" />
        <h2 css={css.heading}>
          <Translate path={props.heading} />
        </h2>
        <p css={css.tagline}>
          <Translate path={props.description} />
        </p>
        {/*
        <a css={css.cta} href={props.cta.url} onClick={ctaClickEvent} target="_blank" rel="noreferrer">
          <Translate path={props.cta.label} />
        </a>
        */}
        <button css={css.videoCta} onClick={handleVideoModalTrigger}>
          <div>
            <span className="first-line">
              <Translate path={props.video.firstLine} />
            </span>
            <span className="second-line">
              <Translate path={props.video.secondLine} />
            </span>
            <span className="third-line">
              <Translate path={props.video.thirdLine} />
            </span>
            <img className="icon" src={props.video.icon} alt="" />
          </div>
          <div css={css.videoThumb(props.video.image)} />
        </button>
      </div>
      <img css={css.image} src={props.image} alt="" />
    </Container>
  );
};

export default PTCSignup;
