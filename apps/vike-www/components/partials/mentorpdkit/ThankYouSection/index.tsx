import React from "react";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { ChevronRightIcon } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { Link } from "gatsby";

interface ThankyouSectionProps {
  title: string;
  description: string;
  tiles: {
    title: string;
    image: string;
    url: string;
  }[];
}

const ThankYouSection: React.FC<ThankyouSectionProps> = (props) => {
  const theme = useTheme();

  const backgroundCss = {
    backgroundColor: theme.__new.colors.grape50,
    paddingBottom: 120,
    backgroundImage:
      "url(https://static.classdojo.com/uploads/c426ba99-41f9-4e05-acba-952b50b2e43f.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  };

  const containerCss = {
    maxWidth: 700,
  };

  const starCss = {
    backgroundColor: theme.__new.colors.cloud30,
    borderRadius: theme.__new.spacing[24],
    margin: "auto",
    width: 250,
    height: 250,
    marginBottom: theme.__new.spacing[60],
  };

  const titleCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: theme.__new.spacing[30],
    color: theme.__new.colors.bwWhite,
    textAlign: "center",
  } as const;

  const descriptionCss = {
    ...theme.__new.typography.Body1,
    marginBottom: theme.__new.spacing[60],
    color: theme.__new.colors.bwWhite,
  } as const;

  const flexCss = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  } as const;

  const cardCss = {
    backgroundColor: theme.__new.colors.bwWhite,
    display: "block",
    minWidth: 200,
    borderRadius: theme.__new.spacing[18],
    width: "calc(33% - 15px)",
    position: "relative",
    overflow: "hidden",
  } as const;

  const chevronCss = {
    backgroundColor: theme.__new.colors.bwWhite,
    width: 36,
    height: 36,
    borderRadius: 99,
    position: "absolute",
    top: 12,
    right: 8,
    display: "grid",
    placeContent: "center",
  } as const;

  const cardImageCss = {
    backgroundColor: theme.__new.colors.cloud30,
    height: 160,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const cardDescriptionCss = {
    display: "block",
    margin: 16,
    ...theme.__new.typography.Body1,
    fontSize: 15,
    fontWeight: 700,
    color: theme.__new.colors.cloud90,
    "@media(max-width: 959px)": {
      padding: "0 4px",
    },
  };

  return (
    <div css={backgroundCss}>
      <Container css={containerCss}>
        <img
          src="https://static.classdojo.com/uploads/1193718c-f60a-492b-9a63-d0584c768469.gif"
          loading="lazy"
          alt=""
        />
        <h2 css={titleCss}>
          <Translate path={props.title} />
        </h2>
        <p css={descriptionCss}>
          <Translate path={props.description} />
        </p>
        <div css={flexCss}>
          {props.tiles.map(({ title, image, url }, index) => {
            return url.indexOf("http") === 0 ? (
              <a href={url} css={cardCss} key={index}>
                <div css={chevronCss}>
                  <ChevronRightIcon
                    size="s"
                    css={{ marginBottom: -3, marginRight: -3 }}
                  />
                </div>
                <div
                  css={{
                    ...cardImageCss,
                    backgroundImage: `url(${image})`,
                  }}
                />
                <span css={cardDescriptionCss}>
                  <Translate path={title} />
                </span>
              </a>
            ) : (
              <Link to={url} css={cardCss} key={index}>
                <div css={chevronCss}>
                  <ChevronRightIcon
                    size="s"
                    css={{ marginBottom: -3, marginRight: -3 }}
                  />
                </div>
                <div
                  css={{
                    ...cardImageCss,
                    backgroundImage: `url(${image})`,
                  }}
                />
                <span css={cardDescriptionCss}>
                  <Translate path={title} />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ThankYouSection;
