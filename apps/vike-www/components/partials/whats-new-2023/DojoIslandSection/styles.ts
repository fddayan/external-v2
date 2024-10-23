import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";

export const SectionContainer = s(Container)`
  position: relative;
  display: grid;
  grid-template-areas:
    "video"
    "heading"
    "features"
    "button"
  ;
  align-items: center;
  gap: 18px 0;
  & > a {
    grid-area: button;
    justify-self: strech;
    width: 100%;
  }
  & > h2 {
    grid-area: heading;
    text-align: center;
  }
  ${mediaQueries[0]} {
    gap: 24px 0;
    grid-template-areas:
      "video video"
      "heading button"
      "features features"
    ;
    grid-template-columns: auto auto;
    & > h2 {
      text-align: left;
    }
    & > a {
      justify-self: end;
      width: fit-content;
    }
  }
`;

export const VideoContainer = s("div")`
  position: relative;
  grid-area: video;
`;

export const Video = s("video")`
  max-width: 100%;
  border-radius: 24px;
`;

export const VideoControls = s("div")`
  position: absolute;
  bottom: 24px;
  right: 24px;
  & > button {
    border: solid white 4px;
    border-radius: 99px;
    height: 66px;
    width: 66px;
    display: grid;
    place-content: center;
    background: transparent;
  }
`;

export const FeaturesContainer = s("div")`
  display: flex;
  gap: 24px;
  flex-direction: column;
  grid-area: features;
  ${mediaQueries[2]} {
    flex-direction: row;
  }
`;

export const Feature = s("div")`
  border-radius: 24px;
  width: 100%;
  padding: 32px 42px;
  position: relative;
  ${mediaQueries[1]} {
    min-width: 320px;
  }
  &:nth-of-type(1) {
    background: #C7FFEA;
    transform: rotate(1.5deg);
  }
  &:nth-of-type(2) {
    background: #FFF7B2;
    transform: rotate(-1.5deg);
    ${mediaQueries[1]} {
      top: 12px;
    }
  }
  &:nth-of-type(3) {
    background: #CCF4FF;
    transform: rotate(1.5deg);
    ${mediaQueries[1]} {
      top: -12px;
    }
  }
`;

export const FeatureImage = s("img")`
  max-width: 160px;
  margin-left: auto;
  display: block;
  ${mediaQueries[0]} {
    margin: auto;
  }
`;
