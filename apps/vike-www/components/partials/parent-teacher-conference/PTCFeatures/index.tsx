import React, { useContext } from "react";
import curvedTop from "@src/assets/images/dojo-islands/curved-bg-top.svg";
import styles from "./styles";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { useTheme } from "@emotion/react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";

export interface PTCFeaturesProps {
  icon: string;
  heading: string;
  features: {
    image: string;
    text: string;
    cta: {
      label: string;
      url: string;
    };
  }[];
}

const PTCFeatures: React.FC<PTCFeaturesProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  const { translate } = useContext(TranslationContext);
  const clickEvent = (index: number) =>
    logEvent({
      eventName: "web.external_page.parent_teacher_conference.feature_tile_button.tap",
      eventValue: translate(props.features[index].cta.label).toString(),
    });
  return (
    <>
      <div css={css.bgTop} style={{ backgroundImage: `url(${curvedTop})` }} />
      <div css={css.bg}>
        <Container>
          <img css={css.icon} src={props.icon} alt="" />
          <h2 css={css.heading}>
            <Translate path={props.heading} />
          </h2>
          <div css={css.flex}>
            {props.features.map(({ image, text, cta }, index) => (
              <div css={css.card} key={index}>
                <div css={css.cardImage(image)} />
                <h3 css={css.cardText}>
                  <Translate path={text} />
                </h3>
                <a
                  css={css.cardCta(index === 0)}
                  href={cta.url}
                  onClick={() => clickEvent(index)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Translate path={cta.label} />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default PTCFeatures;
