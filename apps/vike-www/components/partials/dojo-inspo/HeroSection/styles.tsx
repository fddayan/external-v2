import s from "@emotion/styled";
import { Heading, theme, Title } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import heroRadial from "@src/assets/images/dojo-inspo/optical.svg";

const heroClip =
  "data:image/svg+xml,%3Csvg%20width%3D%221512%22%20height%3D%2275%22%20viewBox%3D%220%200%201512%2075%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2031.5C0%2031.5%20275.5%200%20756%200C1236.5%200%201512%2034.5%201512%2034.5V74.6655H0V31.5Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";

export const HeroBackground = s("div")`
  padding: 44px 0;
  background-image: url("${heroRadial}");
  background-color: ${theme.colors.aqua30};
  background-size: 250%;
  background-position: center 15%;
  background-repeat: no-repeat;
  position: relative;
  &:after {
    background-image: url("${heroClip}");
    background-position: center top;
    background-size: cover;
    height: 34px;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: block;
    content: "";
  }
  ${mediaQueries[0]} {
    background-position: center 45%;
  }
  ${mediaQueries[1]} {
    background-position: calc(50% + 180px) center;
  }
`;

export const HeadingContainer = s("div")`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: ${theme.space.dt_l}px;
  ${mediaQueries[1]} {
    text-align: left;
  }

`;

export const HeroGrid = s("div")`
  display: flex;
  max-width: 1170px;
  padding-inline: ${theme.space.dt_l}px;
  gap: ${theme.space.dt_l}px;
  margin: 0 ${theme.space.dt_l}px;
  flex-direction: column;
  align-items: center;
  ${mediaQueries[1]} {
    margin: auto;
    flex-direction: row;
  }
`;

export const HeroTitle = s(Title)`
  line-height: 1;
`;

export const HeroHeading = s(Heading)`
  color: ${theme.colors.taro60};
`;

export const HeroImage = s("img")`
  margin: auto;
  ${mediaQueries[1]} {
    grid-row: 1/3;
  }
`;
