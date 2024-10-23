import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { theme } from "@src/components/nessie-web";

const {
  colors: { dt_white, dt_taro30 },
  shadows: { dt_shadow_shadezies },
} = theme;

export const VideoSliderContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const SliderContainer = styled.div`
  max-width: 360px;
  margin-left: -7px;

  ${mediaQueries[0]} {
    padding: 0 0 20px 0;
    max-width: 690px;
    margin: auto;
  }

  ${mediaQueries[2]} {
    max-width: 1080px;
  }

  .carousel__slider--horizontal {
    overflow: visible;

    ${mediaQueries[0]} {
      overflow: hidden;
    }
  }

  .carousel__slide--visible {
    opacity: 1;
  }
  .carousel__back-button,
  .carousel__next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    border: 2px solid ${dt_taro30};
    border-radius: 30px;
    box-shadow: ${dt_shadow_shadezies};
    background-color: ${dt_white};
    padding: 0;
    opacity: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;

    ${mediaQueries[0]} {
      opacity: 1;
      pointer-events: auto;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  .carousel__back-button {
    left: -4px;

    img {
      transform: rotate(180deg);
    }

    ${mediaQueries[0]} {
      left: -30px;
    }
  }

  .carousel__next-button {
    right: -4px;

    ${mediaQueries[0]} {
      right: -30px;
    }
  }
`;

export const SliderButtonsReference = styled.div`
  position: relative;
`;

export const ButtonContainer = styled.div`
  width: 1005;
  display: flex;
  justify-content: center;
`;
