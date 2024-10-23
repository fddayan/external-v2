import s from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

export const SectionContainer = s(Container)`
  display: grid;
  margin: 80px auto;
  padding: 0 24px;
  grid-template-areas:
    "image"
    "heading"
    "features"
    "button"
  ;
  & > h2 {
    grid-area: heading;
    margin: 12px 0;
  }
  & > a {
    grid-area: button;
    width: 100%;
    align-self: start;
  }
  ${mediaQueries[0]} {
    grid-template-areas:
      "image   image image"
      "heading void  features"
      "button void  features"
    ;
    grid-template-columns: 3fr 2fr 5fr;
    & > h2 {
      margin: 0;
    }
    & > a {
      justify-self: start;
      width: fit-content;
    }
  }
`;

export const Image = s("img")`
  margin: 0 0 24px;
  grid-area: image;
  border-radius: 24px;
  object-fit: cover;
  height: 320px;
  width: auto;
  ${mediaQueries[0]} {
    height: 660px;
    margin-inline: -24px;
    width: calc(100% + 48px);
    max-width: inherit;
  }
`;

export const Features = s("div")`
  grid-area: features;
`;

export const Feature = s("div")`
`;
