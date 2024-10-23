import styled from "@emotion/styled";
import { Title, Button, theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro50, dt_taro90, dt_aqua50 },
  radii: { dt_radius_m },
} = theme;

export const HeroContainer = styled.div`
  padding: 48px 0;

  ${mediaQueries[0]} {
    text-align: center;
  }
`;

export const TextContainer = styled.div`
  max-width: 775px;
  margin: auto;
`;

export const HeroTitle = styled(Title)`
  font-size: 30px;
  color: ${dt_taro50};

  ${mediaQueries[0]} {
    font-size: 60px;
    max-width: 775px;
    margin: auto;
  }
`;

export const HeroVideoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  position: relative;
  margin-top: 43px;

  ${mediaQueries[0]} {
    margin-top: 96px;
  }
`;

export const HeroVideoCover = styled.video`
  aspect-ratio: 2 / 1;
  width: 100%;
  background-color: ${dt_taro90};
  border-radius: ${dt_radius_m};
`;

export const SpaceDogImage = styled.div<{ bg: string }>`
  @keyframes move {
    0% {
      offset-rotate: 15deg;
    }

    4% {
      offset-rotate: 30deg;
    }

    8% {
      offset-rotate: 15deg;
    }

    12% {
      offset-rotate: 0deg;
    }

    16% {
      offset-rotate: -15deg;
    }

    20% {
      offset-rotate: -30deg;
    }

    24% {
      offset-rotate: -15deg;
    }

    28% {
      offset-rotate: 0deg;
    }

    32% {
      motion-offset: -100%;
      offset-distance: -100%;
      offset-rotate: 15deg;
    }

    100% {
      motion-offset: -100%;
      offset-distance: -100%;
      offset-rotate: 15deg;
    }
  }

  position: absolute;
  background: url("${(props) => props.bg}");
  background-repeat: no-repeat;
  background-size: contain;
  width: 210px;
  height: 105px;
  top: -50px;
  right: -120px;
  offset-path: path(
    "M39.4546 17L27.0973 4.56125C24.255 1.77419 20.8385 1 17.0201 1C8.17246 1 1 8.16344 1 17C1 25.8366 8.17246 33 17.0201 33C20.8385 33 24.255 32.2258 27.0973 29.4387L39.4546 17ZM39.4546 17L51.9027 4.56125C55.0034 1.51613 58.1615 1 61.9799 1C70.8275 1 78 8.16344 78 17C78 25.8366 70.8275 33 61.9799 33C58.1615 33 54.4866 31.9677 51.9027 29.4387L39.4546 17Z"
  );
  animation: move 8s ease-in infinite;

  ${mediaQueries[1]} {
    width: 287px;
    height: 161px;
    top: -50px;
    right: -120px;
  }
`;

export const VideoPlayButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    padding: 0;
    width: 56px;
    height: 56px;
    background-color: ${dt_aqua50};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 26px;

    svg {
      ${mediaQueries[1]} {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
