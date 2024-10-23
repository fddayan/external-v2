/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import curvedTop from "@src/assets/images/dojo-islands/curved-bg-top.svg";
import curvedBottom from "@src/assets/images/dojo-islands/curved-bg-bottom.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@src/components/nessie-web";
import DownloadButton from "@src/components/DownloadButton";
import { logEvent } from "@src/utils/logClient";

export interface SpotlightSectionProps {
  id: string;
  heading: string;
  tagline: string;
  spotlights: {
    image: string;
    title: string;
    cta: {
      url: string;
      label: string;
    };
  }[];
  isLoggedIn: boolean;
  openModal: (url: string, title: string) => void;
}

const SpotlightSection: React.FC<SpotlightSectionProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  const testimonialContainerRef = useRef(null);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const checkScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = testimonialContainerRef.current;
    setIsLeftButtonDisabled(scrollLeft <= 0);
    setIsRightButtonDisabled(scrollLeft >= scrollWidth - clientWidth);
  };

  useEffect(() => {
    checkScrollButtons();
    const container = testimonialContainerRef.current;
    container.addEventListener("scroll", checkScrollButtons, { passive: true });
    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
    };
  }, []);

  const scrollTestimonials = (direction: string) => {
    if (testimonialContainerRef.current) {
      const { clientWidth } = testimonialContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      testimonialContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <div css={css.bgTopCss} style={{ backgroundImage: `url(${curvedTop})` }} />
      <div css={css.background}>
        <Container id={props.id}>
          <h2 css={css.heading}>
            <Translate path={props.heading} />
          </h2>
          <p css={css.tagline}>
            <Translate path={props.tagline} />
          </p>
        </Container>
        <div css={css.slider} ref={testimonialContainerRef}>
          {props.spotlights.map(({ title, image, cta: { url, label } }, index) => (
            <div key={index}>
              <div css={css.carouselCard}>
                <div css={css.carouselThumb} style={{ backgroundImage: `url(${image})` }} />
                <div css={css.carouselContent}>
                  <p css={css.carouselText}>
                    <Translate path={title} />
                  </p>
                  <DownloadButton
                    css={css.carouselCta}
                    downloadUrl={url}
                    onClick={() => props.openModal(url, title)}
                    isLoggedIn={props.isLoggedIn}
                    target="_blank"
                    rel="noreferrer"
                    logEvent={() =>
                      logEvent({
                        eventName: "web.external_page.sl_resources.spotlight_button.tap",
                        metaData: { title: title },
                      })
                    }
                  >
                    <Translate path={label} />
                  </DownloadButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Container css={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 60 }}>
          <button css={css.navButtons} disabled={isLeftButtonDisabled} onClick={() => scrollTestimonials("left")}>
            <ChevronLeftIcon />
          </button>
          <button css={css.navButtons} disabled={isRightButtonDisabled} onClick={() => scrollTestimonials("right")}>
            <ChevronRightIcon />
          </button>
        </Container>
      </div>
      <div css={css.bgBottomCss} style={{ backgroundImage: `url(${curvedBottom})` }} />
    </>
  );
};

export default SpotlightSection;
