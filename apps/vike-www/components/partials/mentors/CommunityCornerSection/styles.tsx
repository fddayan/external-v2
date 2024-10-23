import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  space: { dt_l, dt_xxl },
  colors: { dt_aqua50, dt_white, dt_taro10, dt_taro30, dt_taro50 },
  radii: { dt_radius_m },
} = theme;

export const CommunityCornerSectionContainer = styled.section<{ bgColor: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  background-color: ${(props) => (props.bgColor ? dt_taro10 : dt_white)};

  ${mediaQueries[0]} {
    margin-top: 0px;
    background-size: contain;
  }
`;

export const CommunityCornerHeader = styled.div`
  text-align: center;
  width: 100%;

  ${mediaQueries[0]} {
    max-width: 500px;
    margin: auto;
  }
`;

export const CommunityTextLink = styled.a`
  color: ${dt_aqua50};
`;

export const CommunityCornerGrid = styled.div<{ bgColor: boolean }>`
  max-width: 1920px;
  margin: auto;
  overflow: hidden;
  position: relative;

  @media (min-width: 1920px) {
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 200px;
      height: 100%;
      z-index: 10;
    }

    &:after {
      right: 0;
      top: 0;
      background: ${(props) =>
        props.bgColor
          ? `linear-gradient(270deg, ${dt_taro10} 0%, rgba(255, 255, 255, 0) 100%)`
          : `linear-gradient(270deg, ${dt_white} 0%, rgba(255, 255, 255, 0) 100%);`};
    }

    &:before {
      background: ${(props) =>
        props.bgColor
          ? `linear-gradient(90deg, ${dt_taro10} 0%, rgba(255, 255, 255, 0) 100%)`
          : `linear-gradient(270deg, ${dt_white} 0%, rgba(255, 255, 255, 0) 100%);`};
    }
  }
`;

export const CommunityCornerGridRow = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100vw;
`;

export const SliderTrackOne = styled.div`
  animation: trackSlideReverse 12s linear infinite;
  display: flex;
  width: fit-content;
  align-self: flex-start;

  @keyframes trackSlideReverse {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

export const TweetTile = styled.div<{ width?: number }>`
  height: 260px;
  width: ${(props) => (props.width ? (props.width > 2 && "450px") || (props.width > 1 && "350px") : "260px")};
  border: solid 2px ${dt_taro30};
  border-radius: ${dt_radius_m};
  padding: ${dt_xxl}px ${dt_l}px;
  margin: 0 10px;
  color: ${dt_taro50};
`;

export const TweetUser = styled.div`
  width: fit-content;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  transition: height 0.2s ease-in;
  margin-bottom: 12px;
`;

export const TweetUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TweetUserAvatar = styled.div<{ avatar?: string }>`
  width: 66px;
  height: 66px;
  border-radius: 33px;
  margin-right: 12px;
  background: url("${(props) => props.avatar}") center/cover no-repeat;
`;

export const ImageSquareTile = styled.img`
  max-width: unset;
  width: 260px;
  height: 260px;
  margin: 0 10px;
  border: solid 2px ${dt_taro30};
  border-radius: ${dt_radius_m};
  object-fit: cover;
  object-position: top center;
`;
