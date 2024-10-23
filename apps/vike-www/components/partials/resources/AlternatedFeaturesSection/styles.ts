import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

export const FeatureSection = styled("section")`
  padding: 54px 0 0 0;
`;

export const FeatureWrapper = styled("div")`
  width: 100%;
  max-width: 870px;
  margin: 0 auto;
`;

export const FeaturePairBlock = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
  grid-template-areas: "img" "text";

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    grid-template-areas: "img text";
    padding-bottom: 128px;

    &:nth-child(even) {
      grid-template-areas: "text img";
    }
  }
`;

export const FeatureTextBlock = styled("div")`
  width: 100%;
  padding: 0 15px;
  text-align: center;
  margin-bottom: 54px;
  margin-top: 30px;
  grid-area: text;

  ${mediaQueries[0]} {
    margin-bottom: 0;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FeatureImgBlock = styled("div")`
  grid-area: img;
  text-align: center;

  ${mediaQueries[0]} {
    width: 100%;
    margin-left: unset;
    transform: unset;
  }
`;

export const FeatureTextContent = styled("div")`
  ${mediaQueries[0]} {
    max-width: 360px;
  }
`;

export const FeatureButtonHolder = styled("div")`
  display: flex;
  justify-content: center;
`;

export const FeatureImage = styled("img")`
  border-radius: 0px;
  &.home-variation {
    width: 90%;
    display: block;
    margin: auto;
  }
  ${mediaQueries[0]} {
    border-radius: 24px;
  }
`;
