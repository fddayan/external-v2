import React, { useContext } from "react";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { Button } from "@src/components/new-nessie";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { PlayIcon } from "@src/components/nessie-web";
import { mediaQueriesMax } from "@src/styles/theme";
import { navigateTo } from "@src/utils/location";
import Translate from "@src/components/translation/Translate";

interface ShareSectionProps {
  heading: string;
  cards: {
    heading: string;
    text: string;
    youtubeId: string;
    href?: string;
  }[];
}

const ShareSection: React.FC<ShareSectionProps> = (props) => {
  const theme = useTheme();
  const modalContext = useContext(ModalContext);
  const openModal = (youtubeId: string) => {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: youtubeId });
  };

  const containerCss = {
    margin: "120px auto",
  };

  const flexCss = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.__new.spacing[60],
    [mediaQueriesMax[1]]: {
      flexDirection: "column",
      gap: theme.__new.spacing[30],
    },
  };

  const headingCss = {
    ...theme.__new.typography.Display3ExtraBold,
    textAlign: "center",
    maxWidth: 700,
    margin: "auto",
    marginBottom: theme.__new.spacing[60],
  };

  const cardColors = {
    bg: [theme.__new.colors.grape10, theme.__new.colors.ocean10],
    fg: [theme.__new.colors.grape90, theme.__new.colors.ocean90],
  };

  const cardCss = (index: number) => ({
    padding: 36,
    display: "flex",
    flexDirection: "column",
    gap: theme.__new.spacing[30],
    borderRadius: theme.__new.spacing[24],
    backgroundColor: cardColors.bg[index],
    marginBottom: theme.__new.spacing[18],
    "@media (min-width: 960px)": {
      width: "calc(50% - 30px)",
    },
  });

  const cardTitleCss = (index: number) => ({
    ...theme.__new.typography.Display4ExtraBold,
    margin: 0,
    color: cardColors.fg[index],
  });

  const cardDescriptionCss = (index: number) => ({
    ...theme.__new.typography.Body1,
    margin: 0,
    color: cardColors.fg[index],
  });

  const cardButtonCss = (index: number) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: theme.__new.spacing[12],
    marginBottom: theme.__new.spacing[30],
    padding: "12px 42px",
    borderRadius: 99,
    backgroundColor: cardColors.fg[index],
    color: theme.__new.colors.bwWhite,
    fontWeight: 700,
  });

  const cardImageCss = {
    backgroundColor: theme.__new.colors.cloud30,
    borderRadius: theme.__new.spacing[24],
    width: "100%",
    height: 235,
    border: "none",
    background: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Container css={containerCss}>
      <h2 css={headingCss}>
        <Translate path={props.heading} />
      </h2>
      <div css={flexCss}>
        {props.cards.map(({ heading, text, youtubeId, href }, index) => (
          <div key={index} css={cardCss(index)}>
            <h3 css={cardTitleCss(index)}>
              <Translate path={heading} />
            </h3>
            <button
              css={{
                ...cardImageCss,
                backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`,
              }}
              onClick={() => openModal(youtubeId)}
            >
              <PlayIcon color="white" />
            </button>
            <p css={cardDescriptionCss(index)}>
              <Translate path={text} />
            </p>
            {href && (
              <Button onClick={() => navigateTo(href)}>
                <span>
                  <Translate path="layouts.main.learnmore" />
                </span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShareSection;
