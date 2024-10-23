/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React, { useState } from "react";
import { CloseIcon } from "@src/components/nessie-web";
import { alignItems, justifyContent } from "styled-system";
import { logEvent } from "@src/utils/logClient";

interface IModalContent {
  avatar: string;
  quote: string;
  name: string;
  position: string;
  title: string;
  testimonial: string;
  hasTestimonial: boolean;
}

export interface ParentsLoveSectionProps {
  images: {
    bgTop: string;
    bgBottom: string;
    blueCube: string;
    puzzle: string;
    yellowCube: string;
  };
  heading: string;
  testimonials: IModalContent[];
  ctaLabel: string;
}

const ParentsLoveSection: React.FC<ParentsLoveSectionProps> = (props) => {
  const theme = useTheme();
  const [modalContent, setModalContent] = useState<IModalContent>(
    props.testimonials[0]
  );
  const [showModal, setShowModal] = useState(false);

  const openModal = (content: IModalContent) => {
    setModalContent(content);
    setShowModal(true);
    logEvent({
      eventName:
        "web.external_page.dojo_islands.teachers_parents_testimonial.read_story.tap",
      metaData: { name: modalContent.name },
    });
  };
  const closeModal = () => {
    setShowModal(false);
    logEvent({
      eventName:
        "web.external_page.dojo_islands.teachers_parents_testimonial.modal.close_button.tap",
      metaData: { name: modalContent.name },
    });
  };

  const bgTopCss = {
    height: 140,
    backgroundPosition: "center",
    backgroundSize: "cover",
    "@media (min-width: 960px)": {
      height: 200,
    },
  };

  const bgCss = {
    position: "relative",
    backgroundColor: theme.__new.colors.grape60,
  } as const;

  const bgBottomCss = {
    height: 83,
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginBottom: 100,
    "@media (min-width: 960px)": {
      height: 135,
      marginBottom: 180,
    },
  };

  const blueCubeCss = {
    position: "absolute",
    width: 150,
    top: -140,
    left: 14,
    "@media (min-width: 960px)": {
      width: 250,
      top: -284,
      left: -120,
    },
  } as const;

  const puzzleCss = {
    position: "absolute",
    width: 207,
    bottom: 466,
    left: -109,
    "@media (min-width: 960px)": {
      width: 385,
      bottom: 0,
      left: -113,
    },
  } as const;

  const yellowCubeCss = {
    position: "absolute",
    width: 150,
    bottom: -160,
    right: 12,
    "@media (min-width: 960px)": {
      width: 349,
      bottom: -285,
      right: 85,
    },
  } as const;

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    marginBottom: 30,
    color: theme.__new.colors.contentLight,
    textAlign: "center",
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Display2ExtraBold,
      color: "white",
      marginBottom: 60,
    },
  } as const;

  const flexCss = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    "@media (min-width: 960px)": {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "48px 36px",
      justifyContent: "center",
    },
  } as const;

  const testimonialCss = (index: number) => {
    const bgColors = [
      theme.__new.colors.ocean10,
      theme.__new.colors.sun10,
      theme.__new.colors.fox10,
    ];
    const colors = [
      theme.__new.colors.ocean90,
      theme.__new.colors.sun90,
      theme.__new.colors.fox90,
    ];
    return {
      backgroundColor: bgColors[index],
      padding: "30px 24px",
      borderRadius: 18,
      display: "grid",
      gap: 12,
      zIndex: 9,
      maxWidth: 500,
      margin: "auto",

      "& .avatar": {
        width: 88,
        height: 88,
        borderRadius: 999,
        backgroundPosition: "center",
        backgroundSize: "cover",
      },

      "& .quote": {
        ...theme.__new.typography.Headline2ExtraBold,
        color: colors[index],
        marginBottom: 0,
        textIndent: -8,
      },

      "& .infoBox": {
        display: "flex",
        flexDirection: "column",
        gap: 18,
      },

      "& .name": {
        ...theme.__new.typography.Headline2ExtraBold,
        color: colors[index],
        marginBottom: 0,
      },

      "& .position": {
        ...theme.__new.typography.overline,
        color: colors[index],
        marginBottom: 0,
      },

      "& .readMore": {
        ...theme.__new.typography.Headline3Bold,
        fontSize: 16,
        backgroundColor: "transparent",
        color: theme.__new.colors.cloud80,
        border: `3px solid ${theme.__new.colors.cloud80}`,
        padding: 18,
        borderRadius: 99,
        width: "fit-content",
        cursor: "pointer",
        transition: "all ease 0.2s",
      },

      "& .readMore:hover": {
        color: bgColors[index],
        backgroundColor: theme.__new.colors.cloud80,
      },

      "@media (min-width: 960px)": {
        padding: "50px 44px",
        gap: 18,
        borderRadius: 30,
        width: "calc(50% - 18px)",
        maxWidth: 482,

        "& .avatar": {
          width: 120,
          height: 120,
        },

        "& .quote": {
          ...theme.__new.typography.Headline1ExtraBold,
          color: colors[index],
        },

        "& .infoBox": {
          flexDirection: "row",
          justifyContent: "space-between",
        },

        "& .name": {
          ...theme.__new.typography.Headline1ExtraBold,
          color: colors[index],
        },
      },
    } as const;
  };

  const backdropCss = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflowY: "scroll",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 99,
  } as const;

  const modalCss = {
    padding: 30,
    paddingRight: 60,
    width: "calc(100% - 30px)",
    maxWidth: 720,
    borderRadius: 9,
    background: "white",
    position: "relative",
    margin: "140px auto",
    "@media (min-width: 960px)": {
      padding: 120,
      borderRadius: 20,
    },
  } as const;

  const closeButtonCss = {
    width: 30,
    height: 30,
    top: 0,
    right: 12,
    borderRadius: 99,
    position: "sticky",
    backgroundColor: theme.__new.colors.grape60,
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "@media (min-width: 960px)": {
      width: 50,
      height: 50,
      top: 30,
      right: 30,
    },
  } as const;

  const modalHeaderCss = {
    display: "flex",
    alignItems: "center",
    gap: 24,

    "& .avatar": {
      minWidth: 50,
      width: 50,
      height: 50,
      borderRadius: 999,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },

    "& .name": {
      ...theme.__new.typography.Headline2ExtraBold,
      marginBottom: 0,
    },

    "& .position": {
      ...theme.__new.typography.overline,
      marginBottom: 0,
    },

    "@media (min-width: 960px)": {
      gap: 48,

      "& .avatar": {
        width: 124,
        height: 124,
      },
    },
  } as const;

  const closeButtonWrapper = {
    display: "flex",
    justifyContent: "flex-end",
    position: "sticky",
    top: "100px",
    marginRight: "-40px",
    "@media (min-width: 960px)": {
      top: "200px",
      marginRight: "-70px",
      marginTop: "-70px",
    },
  } as const;

  const modalTitleCss = {
    ...theme.__new.typography.Display5ExtraBold,
    marginBottom: 30,
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Display3ExtraBold,
      marginBottom: 42,
    },
  } as const;

  const modalContentCss = {
    ...theme.__new.typography.Body3,
    "& blockquote": {
      ...theme.__new.typography.Display6ExtraBold,
      textIndent: -8,
      padding: 0,
      border: "none",
      margin: "30px 0",
    },
    "@media (min-width: 960px)": {
      ...theme.__new.typography.Body2,
      "& blockquote": {
        ...theme.__new.typography.Display3ExtraBold,
        textIndent: -20,
        margin: "42px 0",
      },
    },
  } as const;

  return (
    <>
      <div
        css={bgTopCss}
        style={{ backgroundImage: `url(${props.images.bgTop})` }}
      />
      <div css={bgCss}>
        {showModal && (
          <div css={backdropCss}>
            <div css={modalCss}>
              <div css={closeButtonWrapper}>
                <button css={closeButtonCss} onClick={closeModal}>
                  <CloseIcon size="m" color="white" />
                </button>
              </div>
              <div css={modalHeaderCss}>
                <div
                  style={{ backgroundImage: `url(${modalContent.avatar})` }}
                  className="avatar"
                />
                <div>
                  <p className="name">
                    <Translate path={modalContent.name} />
                  </p>
                  <p className="position">
                    <Translate path={modalContent.position} />
                  </p>
                </div>
              </div>
              <h2 css={modalTitleCss}>
                <Translate path={modalContent.title} />
              </h2>
              <div css={modalContentCss}>
                <Translate path={modalContent.testimonial} />
              </div>
            </div>
          </div>
        )}
        <Container>
          <img css={blueCubeCss} src={props.images.blueCube} alt="blue cube" />
          <img css={puzzleCss} src={props.images.puzzle} alt="puzzle" />
          <img
            css={yellowCubeCss}
            src={props.images.yellowCube}
            alt="yellow cube"
          />
          <h1 css={headingCss}>
            <Translate path={props.heading} />
          </h1>
          <div css={flexCss}>
            {props.testimonials.map(
              ({ avatar, quote, name, position, hasTestimonial }, index) => {
                return (
                  <div css={testimonialCss(index)} key={index}>
                    <div
                      style={{ backgroundImage: `url(${avatar})` }}
                      className="avatar"
                    />
                    <p className="quote">
                      "<Translate path={quote} />"
                    </p>
                    <div className="infoBox">
                      <div>
                        <p className="name">
                          <Translate path={name} />
                        </p>
                        <p className="position">
                          <Translate path={position} />
                        </p>
                      </div>
                      {hasTestimonial && (
                        <button
                          className="readMore"
                          onClick={() => openModal(props.testimonials[index])}
                        >
                          <Translate path={props.ctaLabel} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Container>
      </div>
      <div
        css={bgBottomCss}
        style={{ backgroundImage: `url(${props.images.bgBottom})` }}
      />
    </>
  );
};

export default ParentsLoveSection;
