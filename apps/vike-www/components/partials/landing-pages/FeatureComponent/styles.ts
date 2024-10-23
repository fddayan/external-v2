import s from "@emotion/styled";
import Container from "@src/components/Container";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

export const Feature = s(Container)`
  display: grid;
  gap: ${theme.space.xl}px;
  margin-bottom: 80px;
  align-items: center;
  justify-items: center;
  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'image text';
    justify-items: start;
    &:nth-of-type(odd) {
      grid-template-areas: 'text image';
      justify-items: end;
    }
  }
`;

export const FeatureText = s("div")`
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${theme.space.s}px;
  text-align: center;
  align-items: center;
  ${mediaQueries[0]} {
    text-align: left;
    align-items: start;
    grid-area: text;
  }
`;

export const FeatureImage = s(GatsbyImage)`
  ${mediaQueries[0]} {
    grid-area: image;
  }
  max-height: 420px;
  width: 90%;
`;
