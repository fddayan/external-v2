import s from "@emotion/styled";
import Container from "@src/components/Container";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";
import { BodyText } from "@src/components/new-nessie";
import { mediaQueries } from "@src/styles/theme";

export const VideoContainer = s("div")`
  margin-bottom: 36px;
  width: 100vw;
  height: 60vh;
  position: relative;
  overflow: hidden;
  & > video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 105%;
    min-width: 105%;
  }
`;

export const Logo = s(GatsbyImageWrapper)`
  margin-top: -100px;
  width: 340px;
  * {
    transition: none !important;
    background: transparent !important;
  }
  ${mediaQueries[1]} {
    margin-top: -160px;
    width: 480px;
  }
`;

export const CubeImage = s("img")`
  display: none;
  ${mediaQueries[1]} {
    display: block;
    position: absolute;
    width: 140px;
    right: 70px;
    top: -120px;
  }
`;

export const StyledContainer = s(Container)`
  text-align: center;
  position: relative;
  margin-bottom: 32px;
  ${mediaQueries[1]} {
    margin-bottom: 80px;
  }
`;

export const Tagline = s(BodyText)`
  color: #403F6C;
  margin-bottom: 24px;
  max-width: 500px;
  margin: auto;
  margin-bottom: 36px;
`;

export const FeaturesContainer = s("div")`
  position: relative;
  display: flex;
  gap: 24px;
  flex-direction: column;
  z-index: 9;
  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;

export const Feature = s("div")`
  border-radius: 24px;
  width: 100%;
  padding: 24px;
  position: relative;
  text-align: left;
  ${mediaQueries[1]} {
    min-width: 320px;
    padding: 32px;
  }
  &:nth-of-type(1) {
    background: #C7FFEA;
    transform: rotate(1.5deg);
    h2, p {
      color: #0B3308 !important;
    }
  }
  &:nth-of-type(2) {
    background: #FFF7B2;
    transform: rotate(-1.5deg);
    h2, p {
      color: #472109 !important;
    }
    ${mediaQueries[1]} {
      top: 12px;
    }
  }
  &:nth-of-type(3) {
    background: #CCF4FF;
    transform: rotate(1.5deg);
    h2, p {
      color: #0B4247 !important;
    }
    ${mediaQueries[1]} {
      top: -12px;
    }
  }
`;

export const Cta = s(BodyText)`
  margin-top: 60px;
  a {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0 8px;
    align-items: center;
    color: #1A192D;
    svg path {
      fill: #1A192D;
    }
    :hover {
      color: #6835D6;
      svg path {
        fill: #6835D6;
      }
    }
  }
`;

export const PalmImageOne = s("img")`
  display: none;
  ${mediaQueries[1]} {
    display: block;
    position: absolute;
    top: -170px;
    left: -145px;
  }
`;

export const PalmImageTwo = s("img")`
  display: none;
  ${mediaQueries[1]} {
    display: block;
    position: absolute;
    right: -195px;
    bottom: -235px;
    width: 450px;
  }
`;
