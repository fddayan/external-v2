import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

export const WhatsInsideSectionContainer = styled.section`
  width: 100%;
  padding: 54px 0;
  overflow-x: clip;

  ${mediaQueries[2]} {
    padding: 162px 0 54px;
  }
`;

export const WhatsInsideHeader = styled.div`
  width: 100%;
  max-width: 475px;
  text-align: center;
  margin: auto;
`;

export const AnimationOneContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateMentorPhoto {
    0% {
      animation-timing-function: ease-in;
      transform: translateY(0px);
    }

    25% {
      animation-timing-function: ease-in;
      transform: translateY(0px);
    }

    58% {
      animation-timing-function: ease-in;
      transform: translateY(220px);
    }

    70% {
      animation-timing-function: ease-in;
      transform: translateY(234px);
    }

    86% {
      animation-timing-function: ease-in;
      transform: translateY(240px);
    }

    46%,
    76%,
    90% {
      animation-timing-function: ease-out;
      transform: translateY(250px);
    }

    100% {
      animation-timing-function: ease-out;
      transform: translateY(250px);
    }
  }

  position: absolute;
  max-width: 250px;
  left: 0px;
  top: -300px;
  opacity: 0;
  pointer-events: none;

  ${mediaQueries[2]} {
    opacity: 1;
    animation: ${(props) => (props.animatePhotos ? "animateMentorPhoto 2s" : null)};
    animation-fill-mode: forwards;
  }
`;

export const AnimationTwoShelfContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateShelfPhoto {
    0% {
      top: -250px;
    }
    25% {
      top: -250px;
    }
    100% {
      top: -100px;
    }
  }

  position: absolute;
  max-width: 250px;
  right: -120px;
  top: -250px;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);

  ${mediaQueries[2]} {
    opacity: 1;
    animation: ${(props) => (props.animatePhotos ? "animateShelfPhoto 1.4s cubic-bezier(0.85, 0, 0.20, 1)" : null)};
    animation-fill-mode: forwards;
  }
`;

export const AnimationTwoLadderContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateLadderPhoto {
    0% {
      opacity: 0;
      right: -350px;
    }
    10% {
      right: -350px;
    }
    35% {
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      right: 0px;
    }
  }

  position: absolute;
  max-width: 250px;
  bottom: -90px;
  pointer-events: none;
  transform: scale(0.9);
  opacity: 0;
  pointer-events: none;

  ${mediaQueries[2]} {
    animation: ${(props) => (props.animatePhotos ? "animateLadderPhoto 2s cubic-bezier(0.85, 0, 0.20, 1)" : null)};
    animation-fill-mode: forwards;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
`;
