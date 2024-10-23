import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Text } from "@src/components/Text";
import { mediaQueries } from "@src/styles/theme";
import Modal from "react-modal";
import {
  LessonSS,
  LessonSSBody,
  LessonSSContainer,
  BruceDiscuss,
  BruceDiscussBalloon,
  discussion,
  IsHtml,
  IsVideo,
  KatieDiscuss,
  KatieDiscussBalloon,
  LessonSSHeader,
  LessonSSHeaderContainer,
  LessonSSHtmlSlideContent,
  LessonSSNav,
  LessonSSTitle,
  MaterialIconArrowBack,
  MaterialIconArrowForward,
  MaterialIconClose,
  video,
  isVideo16per9,
  isPrev,
  isNext,
  LessonSSCrumbs,
} from "@src/components/ideas/LessonSlideShowStyles";
import { css } from "@emotion/react";
import * as modalData from "@src/components/partials/mindfulmoment/ModalData";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      stream: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const IconArrowLeft = () => <MaterialIconArrowBack />;
const IconArrowRight = () => <MaterialIconArrowForward />;
const IconClose = () => <MaterialIconClose />;
const IconDiscussKatie = () => <KatieDiscuss />;
const IconDiscussKatieBalloon = () => <KatieDiscussBalloon />;
const IconDiscussBruce = () => <BruceDiscuss />;
const IconDiscussBruceBalloon = () => <BruceDiscussBalloon />;

const navPrevClassName = [isPrev];
const navNextClassName = [isNext];

const BaseModal = styled(Modal)`
  position: relative;
  margin: 30px 15px;
  ${mediaQueries[0]} {
    max-width: 620px;
    margin: 30px auto;
  }
  z-index: 9999;
  max-width: 100vw !important;
  margin: 0 !important;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: 0;
`;

const SlideNavContainer = styled.ul`
  margin: 10px 0 0;
  display: flex;
  ${mediaQueries[0]} {
    margin: 20px 0 0;
  }
`;

const SlideNav = styled.li<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#423e5d" : "white")};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 64px;
  margin: 0 5.2px;
  border-radius: 4px;
  border: 1px solid #fff;
  opacity: ${(props) => (props.active ? "1" : ".5")};
  cursor: pointer;
  > button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 0;
    color: inherit;
  }
`;

const SlideDotsContainer = styled.ul`
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  list-style: none;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  ${mediaQueries[0]} {
    bottom: -50px;
  }
`;

const SlideDot = styled.li<{ active: boolean }>`
  cursor: pointer;
  border: 1px solid white;
  border-radius: 100%;
  margin: 5px;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  height: ${(props) => (props.active ? "12px" : "10px")};
  width: ${(props) => (props.active ? "12px" : "10px")};
`;

const ModalText = (props: { children: React.ReactNode; marginBottom: number }) => (
  <Text fontSize={[18, 24]} {...props}>
    {props.children}
  </Text>
);

const Crumbs = ({
  goToVideoFunc,
  goToDiscussFunc,
  current,
}: {
  goToVideoFunc: () => void;
  goToDiscussFunc: () => void;
  current: number;
}) => {
  return (
    <SlideNavContainer>
      <SlideNav active={current == 0} onClick={() => goToVideoFunc()}>
        <button onClick={() => goToVideoFunc()} aria-label="Click to go to video" aria-pressed={current == 0}>
          <ModalText marginBottom={0}>Video</ModalText>
        </button>
      </SlideNav>
      <SlideNav active={current > 0} onClick={() => goToDiscussFunc()}>
        <button onClick={() => goToDiscussFunc()} aria-label="Click to go to discussion" aria-pressed={current > 0}>
          <ModalText marginBottom={0}>Discussion</ModalText>
        </button>
      </SlideNav>
    </SlideNavContainer>
  );
};
type ModalKeys = keyof typeof modalData;
type Slide<T extends ModalKeys> = (typeof modalData)[T]["slides"][number];
type SlideKey<T extends ModalKeys> = keyof Slide<T>;

type SlideProps<T extends ModalKeys> = {
  slide: Slide<T> & { html_content?: string };
  lang: SlideKey<T>;
};
const DiscussSlide = <T extends ModalKeys>({ slide, lang }: SlideProps<T>) => {
  let content = slide.html_content;
  if (content) {
    content = content.replace(/\\n/g, "");
    content = content.replace(/\\t/g, "");
  }
  return (
    <IsHtml>
      <LessonSSHtmlSlideContent css={discussion}>
        <ModalText>{slide[lang]}</ModalText>
      </LessonSSHtmlSlideContent>
      <IconDiscussKatie />
      <IconDiscussKatieBalloon />
      <IconDiscussBruce />
      <IconDiscussBruceBalloon />
    </IsHtml>
  );
};

const VideoSlide = <T extends ModalKeys>({ slide, lang }: SlideProps<T>) => {
  return (
    <IsVideo id={`mindful-video-${slide[lang]}`}>
      <VideoPlayer src={slide[lang] as string} />
    </IsVideo>
  );
};

function CloudflareStream(props: { videoId: string; videoToken?: string }) {
  React.useEffect(() => {
    loadScript("https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=" + props.videoId);
  }, [props.videoId]);

  const restProps: { videoId?: string; videoToken?: string } = { ...props };
  delete restProps.videoToken;
  delete restProps.videoId;

  return <stream is="x3d" controls src={props.videoToken || props.videoId} {...restProps} />;
}
function loadScript(src: string) {
  const tag = document.createElement("script");
  tag.async = false;
  tag.src = src;
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(tag);
}

const VideoPlayer = (props: { src: string }) => {
  return (
    <div className="is-video-inner">
      <div css={css(video, isVideo16per9)}>
        <CloudflareStream videoId={props.src} />
      </div>
    </div>
  );
};

const MindfulMomentModal = <T extends keyof typeof modalData>(props: {
  lesson: T;
  discussSlide: boolean;
  isOpen: boolean;
  closeFunction: () => void;
  lang: SlideKey<T>;
}) => {
  const currentLesson = modalData[props.lesson];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContent = currentLesson.slides[currentSlide];
  const nextSlide = () => {
    if (currentSlide + 1 < currentLesson.slides.length) setCurrentSlide(currentSlide + 1);
    console.log("next");
  };
  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    console.log("prev");
  };

  useEffect(() => {
    props.discussSlide && currentSlide != 1 && setCurrentSlide(1);
    !props.discussSlide && currentSlide != 0 && setCurrentSlide(0);
  }, [props.discussSlide]);

  return (
    <BaseModal style={{ overlay: { zIndex: 9999 } }} isOpen={props.isOpen}>
      <LessonSS>
        <LessonSSContainer>
          <CloseButton
            onClick={() => props.closeFunction()}
            data-test-name="lessonClose"
            aria-label="Click to close the slide show"
          >
            <IconClose />
          </CloseButton>
          <LessonSSHeader>
            <LessonSSHeaderContainer>
              <LessonSSTitle>{currentLesson.modalTitle}</LessonSSTitle>
              <LessonSSCrumbs>
                <Crumbs
                  goToVideoFunc={() => setCurrentSlide(0)}
                  goToDiscussFunc={() => setCurrentSlide(1)}
                  current={currentSlide}
                />
              </LessonSSCrumbs>
            </LessonSSHeaderContainer>
          </LessonSSHeader>
          <LessonSSBody>
            {slideContent.type == "discuss" ? (
              <DiscussSlide slide={slideContent} lang={props.lang} />
            ) : (
              <VideoSlide slide={slideContent} lang={props.lang} />
            )}
            <LessonSSNav>
              <button
                css={css(navPrevClassName)}
                onClick={() => prevSlide()}
                aria-label="Go back"
                onKeyDown={(e) => e.key === "Enter" && prevSlide()}
              >
                <IconArrowLeft />
              </button>
              <button
                css={css(navNextClassName)}
                onClick={() => nextSlide()}
                aria-label="Go forward"
                onKeyDown={(e) => e.key === "Enter" && nextSlide()}
              >
                <IconArrowRight />
              </button>
            </LessonSSNav>
            <SlideDotsContainer>
              {currentLesson.slides.map((_, i) => {
                return <SlideDot key={i} active={i == currentSlide} onClick={() => setCurrentSlide(i)} />;
              })}
            </SlideDotsContainer>
          </LessonSSBody>
        </LessonSSContainer>
      </LessonSS>
    </BaseModal>
  );
};

export default MindfulMomentModal;
