import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";

export const SectionContainer = s(Container)`
  padding: 80px 24px;
  // grid-template-areas:
  //     "-"
  //     "heading"
  //     "void"
  //     "features features features"
  //   ;
    grid-template-columns: 1fr;
  & > h2 {
    grid-area: heading;
  }
  ${mediaQueries[1]} {
    display: grid;
    grid-template-areas:
      "- heading void"
      "features features features"
    ;
    grid-template-columns: 5fr 4fr 1fr;
  }
`;

export const BlobImage = s("img")`
  width: 260px;
  margin-left: -100px;
  ${mediaQueries[1]} {
    position: absolute;
    margin-left: 0;
    z-index: 10;
    top: -50px;
    left: -260px;
    width: 650px;
  }
`;

export const Features = s("div")`
  grid-area: features;
  margin-top: 80px;
`;

export const Feature = s("div")`
  margin: 30px 0;
  border-radius: 24px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  ${mediaQueries[1]} {
    height: 660px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "image text";
    &:nth-of-type(even) {
      grid-template-areas: "text image";
    }
  }

  span {
    margin-left: -12px;
  }
  &:nth-of-type(1) {
    & > div:nth-of-type(1) {
      background-color: #E0FFF5;
      padding: 24px;
      display: grid;
      place-content: center;
    }
    & > div:nth-of-type(2) {
      background-color: #9CF2CE;
      & > h2,
      & > p {
        color: #0B3308 !important;
      }
      & > span svg path {
        fill: #0B3308 !important;
      }
      & > a {
        background-color: #0B3308 !important;
        :hover {
          background-color: #07430B !important;
        }
      }
    }
  }
  &:nth-of-type(2) {
    & > div:nth-of-type(2) {
      background-color: #FFBDE1;
      & > h2,
      & > p {
        color: #460935 !important;
      }
      & > span svg path {
        fill: #460935 !important;
      }
      & > a {
        background-color: #460935 !important;
        :hover {
          background-color: #64104A !important;
        }
      }
    }
  }
  &:nth-of-type(3) {
    & > div:nth-of-type(1) {
      background-color: #EBF9FF;
    }
    & > div:nth-of-type(2) {
      background-color: #ADEDFF;
      & > h2,
      & > p {
        color: #0B4247 !important;
      }
      & > span svg path {
        fill: #0B4247 !important;
      }
      & > a {
        background-color: #0B4247 !important;
        :hover {
          background-color: #0E5A67 !important;
        }
      }
    }
  }
`;

export const FeatureImageContainer = s("div")`
  position: relative;
  grid-area: image;
`;

export const FeatureContent = s("div")`
  grid-area: text;
  padding: 24px;
  display: grid;
  place-content: center;
  ${mediaQueries[1]} {
    padding: 80px;
  }
`;
