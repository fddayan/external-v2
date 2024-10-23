import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white },
} = theme;

export const PostHeroSectionContainer = styled.section`
  width: 100%;
  background-color: ${dt_white};
  padding: 48px 0;

  ${mediaQueries[1]} {
    padding: 120px 0;
  }
`;

export const PostHeroSectionFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  ${mediaQueries[1]} {
    flex-direction: row;
    align-items: center;
  }
`;

export const PostHeroSectionFlexChild = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  ${mediaQueries[1]} {
    width: 50%;
  }
`;

export const HeaderContentWrapper = styled.div`
  ${mediaQueries[1]} {
    max-width: 500px;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mediaQueries[0]} {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const AnimationBGContainer = styled.div<{ bgImage: string }>`
  width: 100%;
  max-width: 600px;
  margin: auto;
  aspect-ratio: 3 / 2;
  background: url("${(props) => props.bgImage}") center / contain no-repeat;
  position: relative;
  transform: translateX(-5%);
  transform-origin: center;
  margin-bottom: 48px;

  ${mediaQueries[0]} {
    transform: none;
  }

  ${mediaQueries[2]} {
    transform: translateX(0%);
    margin-bottom: 0px;
  }
`;

export const EnvelopeOne = styled.img<{ animatePhotos: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12%;

  @keyframes animateEnvOne {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    35% {
      opacity: 1;
    }

    50% {
      transform: translate(360%, -340%);
      opacity: 0;
    }

    100% {
      transform: translate(360%, -340%);
      opacity: 0;
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animateEnvOne 6s infinite cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
`;

export const EnvelopeTwo = styled.img<{ animatePhotos: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12%;

  @keyframes animateEnvTwo {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    32% {
      opacity: 1;
    }

    50% {
      transform: translate(380%, 350%);
      opacity: 0;
    }

    100% {
      transform: translate(380%, 350%);
      opacity: 0;
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animateEnvTwo 6s infinite cubic-bezier(0.85, 0, 0.05, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 4.5s;
`;

export const EnvelopeThree = styled.img<{ animatePhotos: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12%;

  @keyframes animateEnvThree {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    35% {
      opacity: 1;
    }

    50% {
      transform: translate(-350%, 330%);
      opacity: 0;
    }

    100% {
      transform: translate(-350%, 330%);
      opacity: 0;
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animateEnvThree 6s infinite cubic-bezier(0.85, 0, 0.05, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
`;

export const EnvelopeFour = styled.img<{ animatePhotos: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12%;

  @keyframes animateEnvFour {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    35% {
      opacity: 1;
    }

    50% {
      transform: translate(-370%, -370%);
      opacity: 0;
    }

    100% {
      transform: translate(-370%, -370%);
      opacity: 0;
    }
  }

  animation: ${(props) => (props.animatePhotos ? "animateEnvFour 6s infinite cubic-bezier(0.85, 0, 0.25, 1)" : null)};
  animation-fill-mode: forwards;
  animation-delay: 3s;
`;

export const MojoPic = styled.div<{ animatePhotos: boolean; bgImage: string }>`
  @keyframes animatePhoto {
    0% {
      bottom: 0px;
      left: 0px;
    }
    100% {
      bottom: -35%;
      left: -16%;
    }
  }

  position: absolute;
  bottom: 0px;
  left: 0px;
  background: url("${(props) => props.bgImage}") center / contain no-repeat;
  animation: ${(props) => (props.animatePhotos ? "animatePhoto 2s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  width: 50%;
  height: 55%;
`;

export const MojoImage = styled.img`
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 56%;
`;
