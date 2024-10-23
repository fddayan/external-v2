import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import upcomingBg from "@src/assets/images/sl-resources/upcoming-bg.svg";
import recordingBg from "@src/assets/images/sl-resources/video-preview.svg";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { ChevronLeftIcon, ChevronRightIcon } from "@src/components/nessie-web";
import { generatingFor } from "@src/utils/routes";
import DownloadButton from "@src/components/DownloadButton";
import { logEvent } from "@src/utils/logClient";

export interface EventsSectionProps {
  id: string;
  heading: string;
  tagline: string;
  upcomingEvents: {
    avatar: string;
    date: string;
    title: string;
    description: string;
    url: string;
  }[];
  carouselHeading: string;
  pastEvents: {
    avatar: string;
    name: string;
    title: string;
    url: string;
  }[];
  isLoggedIn: boolean;
  openModal: (url: string, title: string) => void;
}

const EventsSection: React.FC<EventsSectionProps> = (props) => {
  const theme = useTheme();
  const css = styles(theme);
  const testimonialContainerRef = useRef(null);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const checkScrollButtons = () => {
    if (testimonialContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        testimonialContainerRef.current;
      setIsLeftButtonDisabled(scrollLeft <= 0);
      setIsRightButtonDisabled(scrollLeft >= scrollWidth - clientWidth);
    }
  };

  const isDST = (date: Date) => {
    const year = date.getFullYear();
    const secondSundayMarch = new Date(year, 2, 1);
    secondSundayMarch.setDate(1 + ((7 - secondSundayMarch.getDay()) % 7) + 7);
    const firstSundayNovember = new Date(year, 10, 1);
    firstSundayNovember.setDate(1 + ((7 - firstSundayNovember.getDay()) % 7));
    return date >= secondSundayMarch && date < firstSundayNovember;
  };

  function formatEventDate(eventDatetime, lang) {
    const eventDate = new Date(eventDatetime + "Z");
    const pacificOffset = isDST(eventDate) ? 7 : 8; // Adjust for DST
    const utcEventDate = new Date(
      eventDate.getTime() + pacificOffset * 3600 * 1000
    );
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = {
      timeZone: userTimezone,
      weekday: "short",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    } as const;
    return new Intl.DateTimeFormat(lang, options).format(utcEventDate);
  }

  const lang = generatingFor.locale;

  useEffect(() => {
    if (testimonialContainerRef.current) {
      checkScrollButtons();
      const container = testimonialContainerRef.current;
      container.addEventListener("scroll", checkScrollButtons, {
        passive: true,
      });
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
      };
    }
  }, []);

  const scrollTestimonials = (direction: string) => {
    if (testimonialContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      testimonialContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Container id={props.id} css={css.container}>
        <h2 css={css.heading}>
          <Translate path={props.heading} />
        </h2>
        <p css={css.tagline}>
          <Translate path={props.tagline} />
        </p>
        {props.upcomingEvents.length > 0 &&
          props.upcomingEvents.map(
            ({ avatar, date, title, description, url }, index) => (
              <div css={css.flex} key={index}>
                <div
                  css={css.card}
                  style={{ backgroundImage: `url(${upcomingBg})` }}
                >
                  <img css={css.avatar} src={avatar} alt="" />
                  <p css={css.cardTitle}>
                    <Translate path={props.heading} />
                  </p>
                </div>
                <div>
                  <h3 css={css.upcomingTitle}>
                    <Translate path={title} />
                  </h3>
                  <p css={css.upcomingDescription}>
                    <strong>{formatEventDate(date, lang)}</strong>
                    <br />
                    <Translate path={description} />
                  </p>
                  <div style={{ width: "fit-content" }}>
                    <a
                      href={url}
                      css={css.upcomingCta}
                      onClick={() =>
                        logEvent({
                          eventName:
                            "web.external_page.sl_resources.upcoming_event.tap",
                          eventValue: title,
                        })
                      }
                    >
                      RSVP
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        {props.pastEvents.length > 0 && (
          <>
            <h3 css={css.pastEvents}>
              <Translate path={props.carouselHeading} />
            </h3>
            <div css={css.slider} ref={testimonialContainerRef}>
              {props.pastEvents.map(({ avatar, name, title, url }, index) => (
                <DownloadButton
                  downloadUrl={url}
                  onClick={() => props.openModal(url, title)}
                  isLoggedIn={props.isLoggedIn}
                  css={css.carouselCard}
                  key={index}
                  logEvent={() =>
                    logEvent({
                      eventName:
                        "web.external_page.sl_resources.past_event.tap",
                      eventValue: title,
                    })
                  }
                >
                  <div
                    css={css.carouselThumb}
                    style={{ backgroundImage: `url(${recordingBg})` }}
                  >
                    <img css={css.carouselAvatar} alt="" src={avatar} />
                  </div>
                  <div css={css.carouselText}>
                    <h4>{name}</h4>
                    <p>
                      <Translate path={title} />
                    </p>
                  </div>
                </DownloadButton>
              ))}
            </div>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 16,
                marginBottom: 60,
              }}
            >
              <button
                css={css.navButtons}
                disabled={isLeftButtonDisabled}
                onClick={() => scrollTestimonials("left")}
              >
                <ChevronLeftIcon />
              </button>
              <button
                css={css.navButtons}
                disabled={isRightButtonDisabled}
                onClick={() => scrollTestimonials("right")}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default EventsSection;
