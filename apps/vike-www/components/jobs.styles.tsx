import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
const {
  space: { dt_l, dt_xxl },
  colors: { dt_white, dt_taro40, dt_taro50 },
  radii: { dt_radius_m },
} = theme;

export { dt_l, dt_taro40, dt_white };

export const SpaceBackground = styled.div`
  background: url("https://static.classdojo.com/img/careers/backgrounds/deep-space.png");
`;
export const Hero = styled.div`
  background: url("https://static.classdojo.com/img/careers/backgrounds/mojo-in-space.svg") bottom right no-repeat,
    url("https://static.classdojo.com/img/careers/backgrounds/space-clouds.svg") top left no-repeat;
  background-size: 50%, contain;
  padding: 0 15px;

  ${mediaQueries[0]} {
    background-size: 25%, contain;
  }
`;
export const HeroTitle = styled.h1`
  color: ${dt_white};
  font-weight: 800;
  font-size: 50px;
  line-height: 1;

  ${mediaQueries[0]} {
    font-size: 96px;
    line-height: 90px;
  }
`;
export const GlobalSection = styled.section`
  position: relative;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0%;
  background-size: cover;

  #one,
  #two,
  #three {
    position: relative;
    z-index: 2;
  }

  #one {
    height: calc(100vh - 88px);
  }

  #two {
    margin-top: -100vh;
  }

  #two,
  #three {
    height: 100vh;
  }

  .inner-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
    text-align: center;
  }

  #globe {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
    overflow: hidden;
  }

  #one .inner-content {
    justify-content: center;
    align-items: center;
    position: relative;
    height: calc(100vh - 88px);
  }

  #two .inner-content,
  #three .inner-content {
    padding-top: 148px;
    text-shadow: 2px 2px 4px black;
  }
`;
export const SpaceHeroContent = styled.div`
  padding: 0 15px;
  max-width: 540px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const WorldContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 0;
  color: #fff;

  .world {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform: scale(0.5) translateY(25%);

    ${mediaQueries[0]} {
      transform: scale(0.65) translateY(15%);
    }

    ${mediaQueries[2]} {
      transform: scale(0.8) translateY(15%);
    }
  }

  .world-globe {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
  }

  .world-globe-pole {
    position: absolute;
    width: 530px;
    height: 530px;
    left: -265px;
    top: -265px;
    border-radius: 50% 50%;
    background-color: #224170;
  }

  .world-globe-doms-container {
    position: absolute;
    left: 50%;
    top: 80%;
    width: 0;
    height: 0;
  }

  .world-globe-halo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 730px;
    height: 715px;
    margin-left: -368px;
    margin-top: -350px;
  }
`;
export const AnimationShadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;
export const BrandLoveSection = styled.section`
  background: url("https://static.classdojo.com/img/careers/backgrounds/brandlove-bg.svg") center no-repeat;
  background-size: 200%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  margin-top: 120px;

  ${mediaQueries[0]} {
    padding: 120px 0;
    background-size: contain;
  }
`;
export const BrandLoveHeader = styled.div`
  text-align: center;
  // max-width: 360px;
  margin-bottom: 60px;

  ${mediaQueries[0]} {
    margin-bottom: 120px;
  }
`;
export const BrandLoveGrid = styled.div`
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
      background-color: green;
      z-index: 10;
    }

    &:after {
      right: 0;
      top: 0;
      background: linear-gradient(270deg, #0a162a 0%, rgba(255, 255, 255, 0) 100%);
    }

    &:before {
      background: linear-gradient(90deg, #0a162a 0%, rgba(255, 255, 255, 0) 100%);
    }
  }
`;
export const BrandLoveGridRow = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100vw;
`;
export const SliderTrackOne = styled.div`
  animation: trackSlide 16s linear infinite;
  display: flex;
  width: fit-content;
  align-self: flex-end;

  @keyframes trackSlide {
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
export const SliderTrackTwo = styled.div`
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
export const SliderTrackThree = styled.div`
  animation: trackSlide 20s linear infinite;
  display: flex;
  width: fit-content;
  align-self: flex-end;

  @keyframes trackSlide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;
export const TweetTile = styled.div<{ width?: number }>`
  height: 260px;
  width: ${(props) => (props.width > 2 ? "450px" : props.width > 1 ? "350px" : "260px")};
  border: solid 2px ${dt_taro50};
  border-radius: ${dt_radius_m};
  padding: ${dt_xxl}px ${dt_l}px;
  margin: 0 10px;
  color: ${dt_taro40};
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
  border: solid 2px ${dt_taro50};
  border-radius: ${dt_radius_m};
  object-fit: cover;
  object-position: top center;
`;
export const CultureSection = styled.section`
  text-align: center;
  padding: 60px 0;

  ${mediaQueries[0]} {
    padding: 120px 0;
  }
`;
export const CultureGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr;
  }
`;
export const CultureItem = styled.div`
  display: flex;
  border-radius: 36px;
  border: 2px solid ${dt_taro50};
  padding: 24px;
  width: 100%;
  flex-grow: 1;
  align-items: center;
  flex-direction: column;

  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;
export const CultureItemIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 24px;

  ${mediaQueries[1]} {
    margin-right: 36px;
  }
`;
export const CultureItemContent = styled.div`
  width: 100%;
  text-align: center;

  ${mediaQueries[1]} {
    text-align: left;
  }
`;
export const CultureText = styled.div`
  max-width: 475px;
  margin: auto;
`;
export const RolesSection = styled.section`
  width: 100%;
  padding: 60px 0;

  ${mediaQueries[0]} {
    padding: 120px 0;
  }
`;
export const ScrollMessage = styled.div`
  position: absolute;
  bottom: 50px;
  z-index: 10;
  color: white;
  display: flex;
  flex-direction: column;
  animation-name: bounce;
  animation-timing-function: ease;
  animation-duration: 3s;
  animation-iteration-count: infinite;

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(-30px);
    }
    15% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
export const RolesContentWrapper = styled.div`
  max-width: 760px;
  margin: auto;
  text-align: center;
`;
export const UpAwaySection = styled.section`
  padding-top: 48px;
  padding-bottom: 160px;
  text-align: center;
  font-size: 32px;
  color: #fff;
  // font-weight: 900;
  line-height: 100%;
`;
export const UpAwayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: auto;
`;
export const UpAwayText = styled.div`
  padding-top: 48px;
  font-size: 48px;
  font-weight: 800;
  line-height: 100%;
`;
export const UpAwayImageWrapper = styled.div`
  min-width: 260px;
`;
