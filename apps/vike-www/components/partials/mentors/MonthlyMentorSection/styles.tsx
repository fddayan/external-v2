import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

export const MonthlyMentorSectionContainer = styled.section`
  width: 100%;
  padding: 48px 0;

  ${mediaQueries[0]} {
    padding: 96px 0;
  }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const MonthlyMentorHeader = styled.div`
  width: 100%;
  max-width: 475px;
  text-align: center;
  margin: auto;
`;

export const SuperMentorImage = styled.img`
  max-width: 100%;
  display: block;
  margin: auto;
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const AnimationMojoContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateMojo {
    0% {
      left: -200px;
      opacity: 0;
    }
    40% {
      left: -200px;
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      left: 100px;
    }
  }

  position: absolute;
  max-width: 250px;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);

  ${mediaQueries[2]} {
    opacity: ${(props) => (props.animatePhotos ? "1" : "0")};
    animation: ${(props) => (props.animatePhotos ? "animateMojo 1.6s ease-in-out" : null)};
    animation-fill-mode: forwards;
  }
`;

export const AnimationFriendOneContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateFriendOne {
    0% {
      left: -380px;
      opacity: 0;
    }
    48% {
      left: -380px;
      opacity: 0;
    }
    85% {
      opacity: 1;
    }
    100% {
      left: -100px;
    }
  }

  position: absolute;
  max-width: 250px;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);

  ${mediaQueries[2]} {
    opacity: ${(props) => (props.animatePhotos ? "1" : "0")};
    animation: ${(props) => (props.animatePhotos ? "animateFriendOne 1.9s ease-in-out" : null)};
    animation-fill-mode: forwards;
  }
`;

export const AnimationFriendTwoContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateFriendTwo {
    0% {
      right: -160px;
      opacity: 0;
    }
    46% {
      right: -160px;
      opacity: 0;
    }
    85% {
      opacity: 1;
    }
    100% {
      right: 140px;
    }
  }

  position: absolute;
  max-width: 250px;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);

  ${mediaQueries[2]} {
    opacity: ${(props) => (props.animatePhotos ? "1" : "0")};
    animation: ${(props) => (props.animatePhotos ? "animateFriendTwo 1.85s ease-in-out" : null)};
    animation-fill-mode: forwards;
  }
`;

export const AnimationFriendThreeContainer = styled.div<{ animatePhotos: boolean }>`
  @keyframes animateFriendThree {
    0% {
      right: -380px;
      opacity: 0;
    }
    54% {
      right: -380px;
      opacity: 0;
    }
    91% {
      opacity: 1;
    }
    100% {
      right: -100px;
    }
  }

  position: absolute;
  max-width: 250px;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);

  ${mediaQueries[2]} {
    opacity: ${(props) => (props.animatePhotos ? "1" : "0")};
    animation: ${(props) => (props.animatePhotos ? "animateFriendThree 2.2s ease-in-out" : null)};
    animation-fill-mode: forwards;
  }
`;
