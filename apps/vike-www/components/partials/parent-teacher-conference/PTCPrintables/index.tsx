import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import React, { useContext } from "react";
import styles from "./styles";

export interface PTCPrintablesProps {
  printables: {
    heading: string;
    description: string;
    image: string;
    caption?: string;
    cta: {
      label: string;
      url: string;
    };
  }[];
}

const PTCPrintables: React.FC<PTCPrintablesProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  const { translate } = useContext(TranslationContext);
  const clickEvent = (index: number) =>
    logEvent({
      eventName: "web.external_page.parent_teacher_conference.printable_tile_button.tap",
      eventValue: translate(props.printables[index].cta.label).toString(),
    });
  return (
    <Container css={css.container}>
      {props.printables.map(({ heading, description, image, caption, cta }, index) => (
        <div key={index} css={css.item}>
          <h2 css={css.heading}>
            <Translate path={heading} />
          </h2>
          <p css={css.description}>
            <Translate path={description} />
          </p>
          <img css={css.image} src={image} alt="" />
          {caption && (
            <p css={css.description}>
              <Translate path={caption} />
            </p>
          )}
          <a css={css.cta} href={cta.url} onClick={() => clickEvent(index)} target="_blank" rel="noreferrer">
            <Translate path={cta.label} />
          </a>
        </div>
      ))}
    </Container>
  );
};

export default PTCPrintables;
