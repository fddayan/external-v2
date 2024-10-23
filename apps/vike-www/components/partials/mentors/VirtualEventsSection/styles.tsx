import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white, dt_taro10 },
  radii: { dt_radius_m },
} = theme;

export const VirtualEventsSectionContainer = styled.section`
  width: 100%;
  background-color: ${dt_taro10};
  padding: 48px 0;
  overflow-x: clip;

  ${mediaQueries[0]} {
    padding: 96px 0;
  }
`;

export const AnimationWrapper = styled.div`
  width: 100%;
`;

export const AnimationOneContainer = styled.div`
  position: absolute;
  left: -130px;
  top: -215px;
  opacity: 0;
  pointer-events: none;

  ${mediaQueries[2]} {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const AnimationTwoContainer = styled.div`
  margin: auto;
  max-width: 283px;
  padding-top: 48px;
  margin: auto;

  ${mediaQueries[2]} {
    position: absolute;
    right: -160px;
    bottom: 0;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const PaperPlaneImage = styled.img<{ animatePhotos: boolean }>`
  position: absolute;
  top: -140%;
  right: -6%;

  offset-path: path("M1 588C368.5 295.5 1369.5 18 1680.5 0.999939");
  offset-rotate: -10deg;

  @keyframes animatePaperPlane {
    0% {
      offset-distance: 0%;
      opacity: 1;
    }
    78% {
      opacity: 1;
    }
    100% {
      offset-distance: 100%;
      opacity: 0;
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animatePaperPlane 1.6s linear" : null)};
  animation-fill-mode: forwards;
`;

export const LegoAnimationContainer = styled.div`
  width: fit-content;
  height: 400px;
  position: absolute;
  bottom: -63%;
  left: 24%;
`;

export const LegoImage = styled.img<{ animateLego: boolean }>`
  @keyframes animateLego {
    0% {
      animation-timing-function: ease-in;
      transform: translateY(0%);
    }

    44% {
      animation-timing-function: ease-in;
      transform: translateY(0%);
    }

    50% {
      animation-timing-function: ease-out;
      transform: translateY(-55%);
    }

    72% {
      animation-timing-function: ease-out;
      transform: translateY(465%);
    }

    84% {
      animation-timing-function: ease-in;
      transform: translateY(485%);
    }

    66%,
    78%,
    88% {
      animation-timing-function: ease-out;
      transform: translateY(500%);
    }

    100% {
      animation-timing-function: ease-out;
      transform: translateY(500%);
    }
  }

  animation: ${(props) => (props.animateLego ? "animateLego 2.8s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
`;

export const LegoShadowOne = styled.div<{ animateLego: boolean }>`
  width: 74px;
  height: 34px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20%;
  position: absolute;
  bottom: -21.8%;
  left: 15%;
  transform: skewX(-45deg) rotate(16deg) scale(0.95);
  opacity: 0;
  filter: blur(3px);

  @keyframes animateShadow {
    0% {
      opacity: 0;
      transform: skewX(-45deg) rotate(16deg) scale(0);
    }

    60% {
      opacity: 0;
      transform: skewX(-45deg) rotate(16deg) scale(0);
    }

    72% {
      opacity: 0.4;
      transform: skewX(-45deg) rotate(16deg) scale(0.7);
    }

    84% {
      opacity: 0.6;
      transform: skewX(-45deg) rotate(16deg) scale(0.8);
    }

    66%,
    78%,
    88% {
      opacity: 1;
      transform: skewX(-45deg) rotate(16deg) scale(0.95);
    }

    100% {
      opacity: 1;
      transform: skewX(-45deg) rotate(16deg) scale(0.95);
    }
  }

  animation-fill-mode: forwards;
  animation-delay: 1.5s;
`;

//animation: ${(props) => (props.animateLego ? "animateShadow 2.8s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
export const PencilImage = styled.img<{ animatePencil: boolean }>`
  @keyframes animatePencil {
    0% {
      animation-timing-function: ease-in;
      transform: translateY(0%);
    }

    44% {
      animation-timing-function: ease-in;
      transform: translateY(0%);
    }

    50% {
      animation-timing-function: ease-out;
      transform: translateY(-44%);
    }

    72% {
      animation-timing-function: ease-out;
      transform: translateY(360%);
    }

    84% {
      animation-timing-function: ease-in;
      transform: translateY(380%);
    }

    66%,
    78%,
    88% {
      animation-timing-function: ease-out;
      transform: translateY(390%);
      z-index: 9999;
    }

    100% {
      animation-timing-function: ease-out;
      transform: translateY(390%);
    }
  }

  position: absolute;
  bottom: 17%;
  left: 16%;
  animation: ${(props) => (props.animatePencil ? "animatePencil 2.3s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
`;

export const PencilShadow = styled.div<{ animatePencil: boolean }>`
  width: 136px;
  height: 38px;
  position: absolute;
  border-radius: 15% 0 0 15%;
  background-color: rgba(0, 0, 0, 0.5);
  transform: rotate(8deg) skewX(-5deg) scale(0.95);
  filter: blur(3px);
  bottom: -62%;
  right: 32%;
  opacity: 0;

  &:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 19px solid transparent;
    border-bottom: 19px solid transparent;
    border-left: 30px solid rgba(0, 0, 0, 0.5);
    position: absolute;
    right: -30px;
  }

  @keyframes animatePencilShadow {
    0% {
      opacity: 0;
      transform: rotate(8deg) skewX(-5deg) scale(0);
    }

    60% {
      opacity: 0;
      transform: rotate(8deg) skewX(-5deg) scale(0);
    }

    72% {
      opacity: 0.4;
      transform: rotate(8deg) skewX(-5deg) scale(0.7);
    }

    84% {
      opacity: 0.6;
      transform: rotate(8deg) skewX(-5deg) scale(0.8);
    }

    66%,
    78%,
    88% {
      opacity: 0.9;
      transform: rotate(8deg) skewX(-5deg) scale(0.95);
    }

    100% {
      opacity: 1;
      transform: rotate(8deg) skewX(-5deg) scale(0.95);
    }
  }

  animation: ${(props) => (props.animatePencil ? "animatePencilShadow 2.3s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
`;

export const VirtualEventsHeader = styled.div`
  width: 100%;
  max-width: 475px;
  text-align: center;
  margin: auto;
`;

export const VirtualEventsGrid = styled.div`
  width: 100%;
  max-width: 894px;
  margin: auto;
  display: grid;
  row-gap: 24px;
`;

export const EventCard = styled.div`
  width: 100%;
  padding: 24px;
  background-color: ${dt_white};
  border-radius: ${dt_radius_m};
  border: 2px solid #d3d7ec;
  box-shadow: 0px 6px 0px rgba(45, 64, 150, 0.06);
  display: flex;
  flex-direction: column;
  gap: ${theme.space.dt_l}px;
  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

export const CardHeader = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.space.dt_s}px;
`;

export const CardContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.space.dt_m}px;
`;
