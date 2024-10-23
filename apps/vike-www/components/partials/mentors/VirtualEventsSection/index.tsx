import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Container from "@src/components/Container";
import { BodyText, Button, Heading, Space, Subheading, Title, theme, DetailText } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import { dt_aqua50 } from "../../wall-of-love/WallOfLoveGrid/styles";
import { generatingFor } from "@src/utils/routes";
import { CheckmarkIcon } from "@src/components/nessie-web";

type AnimationTwoProps = {
  virtual_events_animation2_bg_image: string;
  virtual_events_animation2_pencil_image: string;
};

const AnimationTwo: React.FC<AnimationTwoProps> = ({
  virtual_events_animation2_bg_image,
  virtual_events_animation2_pencil_image,
}) => {
  const [animatePencil, setAnimatePencil] = useState(false);
  const animationTwoRef = useRef(null);

  const intersectionObserverCallBack = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setAnimatePencil(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "80px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (animationTwoRef.current) observer.observe(animationTwoRef.current);
    return () => {
      if (animationTwoRef.current) observer.unobserve(animationTwoRef.current);
    };
  }, [animationTwoRef]);
  return (
    <S.AnimationTwoContainer ref={animationTwoRef}>
      <S.ImageWrapper>
        <img src={virtual_events_animation2_bg_image} alt={`mug`} />
        <S.PencilShadow animatePencil={animatePencil} />
        <S.PencilImage animatePencil={animatePencil} src={virtual_events_animation2_pencil_image} alt={`pencil`} />
      </S.ImageWrapper>
    </S.AnimationTwoContainer>
  );
};

type LegoAnimationProps = {
  virtual_events_animation1_lego_image: string;
};

const LegoAnimation: React.FC<LegoAnimationProps> = ({ virtual_events_animation1_lego_image }) => {
  const [animateLego, setAnimateLego] = useState(false);
  const LegoAnimationRef = useRef(null);

  const intersectionObserverCallBack = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setAnimateLego(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "80px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (LegoAnimationRef.current) observer.observe(LegoAnimationRef.current);
    return () => {
      if (LegoAnimationRef.current) observer.unobserve(LegoAnimationRef.current);
    };
  }, [LegoAnimationRef]);
  return (
    <S.LegoAnimationContainer ref={LegoAnimationRef}>
      <S.LegoShadowOne animateLego={animateLego} />
      <S.LegoImage animateLego={animateLego} src={virtual_events_animation1_lego_image} alt={`lego piece`} />
    </S.LegoAnimationContainer>
  );
};

type VirtualEventsSectionProps = {
  virtual_events: { title: string; topic: string; description: string; event_url: string; datetime: any }[];
  virtual_events_calendar_image: string;
  virtual_events_calendar_alt: string;
  virtual_events_animation1_bg_image: string;
  virtual_events_animation1_paperplane_image: string;
  virtual_events_animation1_lego_image: string;
  virtual_events_animation2_bg_image: string;
  virtual_events_animation2_pencil_image: string;
};

const isDST = (date) => {
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
  const utcEventDate = new Date(eventDate.getTime() + pacificOffset * 3600 * 1000);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options = {
    timeZone: userTimezone,
    weekday: "short",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat(lang, options).format(utcEventDate);
}

const VirtualEventsSection: React.FC<VirtualEventsSectionProps> = ({
  virtual_events,
  virtual_events_calendar_image,
  virtual_events_calendar_alt,
  virtual_events_animation1_bg_image,
  virtual_events_animation1_paperplane_image,
  virtual_events_animation1_lego_image,
  virtual_events_animation2_bg_image,
  virtual_events_animation2_pencil_image,
}) => {
  const [animatePhotos, setAnimatePhotos] = useState(false);
  const animatePhotosRef = useRef(null);
  const lang = generatingFor.locale;

  const intersectionObserverCallBack = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setAnimatePhotos(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (animatePhotosRef.current) observer.observe(animatePhotosRef.current);
    return () => {
      if (animatePhotosRef.current) observer.unobserve(animatePhotosRef.current);
    };
  }, [animatePhotosRef]);
  return (
    <S.VirtualEventsSectionContainer ref={animatePhotosRef} id="events">
      <Container>
        <S.AnimationWrapper>
          <S.AnimationOneContainer>
            <S.ImageWrapper>
              <img src={virtual_events_animation1_bg_image} alt={`toy box photography`} />
              <S.PaperPlaneImage
                animatePhotos={animatePhotos}
                src={virtual_events_animation1_paperplane_image}
                alt={`paper plane`}
              />
              <LegoAnimation virtual_events_animation1_lego_image={virtual_events_animation1_lego_image} />
            </S.ImageWrapper>
          </S.AnimationOneContainer>
          <S.VirtualEventsHeader>
            <Title size={1}>
              <Translate path={`directus.page_mentors.virtual_events_title`} />
            </Title>
            <Space size="m" />
            <Subheading size={1}>
              <Translate path={`directus.page_mentors.virtual_events_text`} />
            </Subheading>
          </S.VirtualEventsHeader>
          <Space size="l" />
          <S.VirtualEventsGrid>
            {virtual_events.map((event, idx) => (
              <S.EventCard key={`event_${idx + 1}`}>
                <S.CardHeader>
                  <img
                    src={virtual_events_calendar_image}
                    alt={`directus.page_mentors.${virtual_events_calendar_alt}`}
                  />
                  <Heading color={theme.colors.taro60}>{formatEventDate(event.datetime, lang)}</Heading>
                  <DetailText color={theme.colors.taro40}>
                    <Translate path="mentor_events.timezone" /> {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </DetailText>
                </S.CardHeader>

                <S.CardContent>
                  <Heading>{event.title}</Heading>
                  <BodyText color={"dt_taro50"}>{event.description}</BodyText>
                  <Button
                    href={event.event_url}
                    target="_blank"
                    onClick={() => {
                      logEvent("web.external_page.mentors.event_click");
                    }}
                    icon={<CheckmarkIcon />}
                  >
                    <Translate path={`directus.page_mentors.virtual_events_button_text`} />
                  </Button>
                </S.CardContent>
              </S.EventCard>
            ))}
          </S.VirtualEventsGrid>
          <AnimationTwo
            virtual_events_animation2_bg_image={virtual_events_animation2_bg_image}
            virtual_events_animation2_pencil_image={virtual_events_animation2_pencil_image}
          />
        </S.AnimationWrapper>
      </Container>
    </S.VirtualEventsSectionContainer>
  );
};

export default VirtualEventsSection;
