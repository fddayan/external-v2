import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro10 },
  radii: { dt_radius_m },
} = theme;

export const VIPResourcesSectionContainer = styled.section`
  width: 100%;
  padding: 150px 0 60px;
  overflow-x: clip;

  ${mediaQueries[1]} {
    padding: 100px 0;
  }
`;

export const VIPResourcesHeader = styled.div`
  text-align: center;
  width: 100%;

  ${mediaQueries[0]} {
    max-width: 500px;
    margin: auto;
  }
`;

export const AnimationsContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const VIPResourcesGridOne = styled.div`
  width: fit-content;
  display: grid;
  grid-template-rows: 1fr;
  margin: auto;
  grid-gap: 24px;
  padding-bottom: 24px;
`;

export const VIPResourcesGridTwo = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  margin: auto;
  grid-gap: 24px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const VIPResourcesCard = styled.div`
  max-width: 346px;
  border-radius: ${dt_radius_m};
  background-color: ${dt_taro10};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const CardIcon = styled.img`
  width: 90px;
  height: 90px;
`;

export const AnimationTwoMobileContainer = styled.div`
  width: 100%;
  background-color: ${dt_taro10};
  display: flex;
  justify-content: center;
  padding: 0 0 48px;

  ${mediaQueries[1]} {
    pointer-events: none;
    opacity: 0;
    position: absolute;
  }
`;

export const AnimationOneContainer = styled.div`
  position: absolute;
  max-width: 250px;
  right: -35px;
  top: 5px;
  opacity: 0;
  pointer-events: none;

  ${mediaQueries[1]} {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const AnimationTwoContainer = styled.div`
  position: absolute;
  left: 50%;
  top: -430px;
  transform: translateX(-50%);
  pointer-events: none;
  opacity: 0;

  ${mediaQueries[1]} {
    opacity: 1;
    left: 30px;
    top: -5px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const DonutImage = styled.img<{ animatePhotos: boolean }>`
  @keyframes animateDonut {
    0% {
      animation-timing-function: ease-in;
      transform: translateX(0px) translateY(0px) scale(0.65);
    }

    44% {
      animation-timing-function: ease-in;
      transform: translateX(0px) translateY(0px) scale(0.65);
    }

    50% {
      animation-timing-function: ease-out;
      transform: translateX(30px) translateY(-45px) scale(0.65);
    }

    72% {
      animation-timing-function: ease-out;
      transform: translateX(30px) translateY(228px) scale(0.65);
    }

    84% {
      animation-timing-function: ease-in;
      transform: translateX(30px) translateY(240px) scale(0.65);
    }

    68%,
    78%,
    88% {
      animation-timing-function: ease-out;
      transform: translateX(30px) translateY(250px) scale(0.65);
      z-index: 9999;
    }

    100% {
      animation-timing-function: ease-out;
      transform: translateX(30px) translateY(250px) scale(0.65);
    }
  }

  position: absolute;
  bottom: 28%;
  left: 36%;
  transform: scale(0.65);

  ${mediaQueries[1]} {
    opacity: 1;
    animation: ${(props) => (props.animatePhotos ? "animateDonut 2.3s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
    animation-fill-mode: forwards;
    animation-delay: 1.2s;
  }
`;

export const DonutShadow = styled.div<{ animatePhotos: boolean }>`
  width: 48px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: -65%;
  right: 26%;
  filter: blur(3px);
  transform: scale(0.95);
  opacity: 0;

  @keyframes animateDonutShadow {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    60% {
      opacity: 0;
      transform: scale(0);
    }

    72% {
      opacity: 0.4;
      transform: scale(0.7);
    }

    84% {
      opacity: 0.6;
      transform: scale(0.8);
    }

    66%,
    78%,
    88% {
      opacity: 0.9;
      transform: scale(0.95);
    }

    100% {
      opacity: 1;
      transform: scale(0.95);
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animateDonutShadow 2.3s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 1.2s;
`;

export const BoxFrontImage = styled.img`
  position: absolute;
  bottom: 16%;
  left: -1%;
  transform: scale(0.7);
`;

export const CoffeeMachineImage = styled.img`
  width: 280px;
`;

export const CoffeeMugImage = styled.img<{ animatePhotos: boolean }>`
  @keyframes animateCoffeeMug {
    0% {
      animation-timing-function: ease-in;
      transform: translateY(0px) scale(0.65);
    }

    44% {
      animation-timing-function: ease-in;
      transform: translateY(0px) scale(0.65);
    }

    50% {
      animation-timing-function: ease-out;
      transform: translateY(-20px) scale(0.65);
    }

    72% {
      animation-timing-function: ease-out;
      transform: translateY(168px) scale(0.65);
    }

    84% {
      animation-timing-function: ease-in;
      transform: translateY(176px) scale(0.65);
    }

    66%,
    78%,
    88% {
      animation-timing-function: ease-out;
      transform: translateY(180px) scale(0.65);
      z-index: 9999;
    }

    100% {
      animation-timing-function: ease-out;
      transform: translateY(180px) scale(0.65);
    }
  }

  position: absolute;
  bottom: 18%;
  right: 14%;
  transform: scale(0.65);
  opacity: 1;
  animation: ${(props) => (props.animatePhotos ? "animateCoffeeMug 2.3s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 0.6s;
`;

export const CoffeeShadow = styled.div<{ animatePhotos: boolean }>`
  width: 37px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: -41%;
  right: 24%;
  filter: blur(3px);
  transform: scale(0.95);
  opacity: 0;

  @keyframes animateCoffeeShadow {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    60% {
      opacity: 0;
      transform: scale(0);
    }

    72% {
      opacity: 0.4;
      transform: scale(0.7);
    }

    84% {
      opacity: 0.6;
      transform: scale(0.8);
    }

    66%,
    78%,
    88% {
      opacity: 0.9;
      transform: scale(0.95);
    }

    100% {
      opacity: 1;
      transform: scale(0.95);
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animateCoffeeShadow 2.3s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 0.6s;
`;
