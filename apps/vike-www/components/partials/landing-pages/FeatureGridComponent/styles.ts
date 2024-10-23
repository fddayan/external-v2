import s from "@emotion/styled";
import Container from "@src/components/Container";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

export const FeatureGridContainer = s(Container)`
  margin-bottom: 60px;
  ${mediaQueries[0]} {
    display: flex;
    gap: ${theme.space.xxl}px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Feature = s("div")`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.s}px;
  max-width: 280px;
  margin: 0 auto ${theme.space.l}px;
  text-align: center;
  ${mediaQueries[0]} {
    width: calc(33% - 2 * ${theme.space.l}px / 3);
    margin: 0 0 ${theme.space.l}px;
  }
  &>span {
    flex-grow: 1;
  }
`;

export const FeatureImage = s("img")`
  width: 180px;
  margin: auto;
`;
