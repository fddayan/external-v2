import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import DownloadButton from "@src/components/DownloadButton";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import React from "react";
import styles from "./styles";

export interface SchoolWideSectionProps {
  id: string;
  heading: string;
  description: string;
  card: {
    image: string;
    title: string;
    description: string;
    cta: {
      url: string;
      label: string;
    };
  };
  isLoggedIn: boolean;
  openModal: (url: string, title: string) => void;
}

const SchoolWideSection: React.FC<SchoolWideSectionProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);

  return (
    <div css={css.background}>
      <Container id={props.id} css={css.container}>
        <div css={css.copy}>
          <h2 css={css.heading}>
            <Translate path={props.heading} />
          </h2>
          <p css={css.description}>
            <Translate path={props.description} />
          </p>
        </div>
        <div css={css.card}>
          <div className="content">
            <h3>
              <Translate path={props.card.title} />
            </h3>
            <p>
              <Translate path={props.card.description} />
            </p>
            <DownloadButton
              css={css.button}
              downloadUrl={props.card.cta.url}
              onClick={() => props.openModal(props.card.cta.url, props.card.title)}
              isLoggedIn={props.isLoggedIn}
              target="_blank"
              rel="noreferrer"
              logEvent={() => logEvent("web.external_page.sl_resources.schoolwide.cta.tap")}
            >
              <Translate path={props.card.cta.label} />
            </DownloadButton>
          </div>
          <img src={props.card.image} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default SchoolWideSection;
