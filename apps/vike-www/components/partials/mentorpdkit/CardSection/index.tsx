import React from "react";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { DownloadIcon } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import DownloadButton from "../DownloadButton";

interface CardSectionProps {
  heading: string;
  subheading: string;
  cards: {
    image: string;
    title: string;
    description: string;
    downloadUrl: string;
    eventId: string;
  }[];
  downloadAction: (eventId: string) => void;
  setEmailAction: (url: string, eventId: string) => void;
  isLoggedIn: boolean;
}

const CardSection: React.FC<CardSectionProps> = (props) => {
  const theme = useTheme();

  const backgroundCss = {
    backgroundColor: theme.__new.colors.grape50,
    paddingTop: theme.__new.spacing[30],
    paddingBottom: 120,
  };

  const headingCss = {
    ...theme.__new.typography.Display3ExtraBold,
    color: theme.__new.colors.bwWhite,
    marginBottom: theme.__new.spacing[20],
    textAlign: "center",
  };

  const subheadingCss = {
    ...theme.__new.typography.Headline2Medium,
    color: theme.__new.colors.bwWhite,
    marginBottom: theme.__new.spacing[60],
    textAlign: "center",
  };

  const flexCss = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const cardCss = {
    display: "flex",
    flexDirection: "column",
    minWidth: 320,
    padding: 24,
    borderRadius: theme.__new.spacing[24],
    backgroundColor: theme.__new.colors.bwWhite,
    boxShadow: theme.boxShadows[1],
    margin: theme.__new.spacing[18],
    width: "calc(33% - 36px)",
    overflow: "hidden",
  };

  const imageContainerCss = {
    margin: "-24px -24px 0",
    padding: "24px 24px 0",
    width: "calc(100% + 48px)",
    height: 188,
    marginBottom: theme.__new.spacing[24],
    backgroundColor: theme.__new.colors.grape30,
    overflow: "hidden",
  };

  const cardIconCss = {
    margin: "auto",
    marginBottom: -6,
  };

  const cardTitleCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: theme.__new.spacing[30],
    fontSize: 24,
  };

  const cardDescriptionCss = {
    ...theme.__new.typography.Body1,
    flexGrow: 1,
    marginBottom: theme.__new.spacing[30],
  };

  const buttonCss = {
    width: "100%",
  };

  return (
    <div css={backgroundCss}>
      <Container>
        <h2 css={headingCss}>
          <Translate path={props.heading} />
        </h2>
        <p css={subheadingCss}>
          <Translate path={props.subheading} />
        </p>
        <div css={flexCss}>
          {props.cards.map(({ title, description, downloadUrl, image, eventId }, index) => (
            <div key={index} css={cardCss}>
              <div css={imageContainerCss}>{image && <img src={image} css={cardIconCss} alt="" />}</div>
              <h3 css={cardTitleCss}>{title}</h3>
              <p css={cardDescriptionCss}>{description}</p>
              <DownloadButton
                css={buttonCss}
                downloadUrl={downloadUrl}
                openModal={() => props.setEmailAction(downloadUrl, eventId)}
                isLoggedIn={props.isLoggedIn}
                logDownloadEvent={() => props.downloadAction(eventId)}
              >
                <DownloadIcon css={{ color: theme.__new.colors.bwWhite }} /> Download
              </DownloadButton>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CardSection;
