import s from "@emotion/styled";
import { Subheading, theme } from "@src/components/nessie-web";

interface BackgroundProps {
  darkBackground?: boolean;
}
export const Background = s("div")<BackgroundProps>`
  background-color: ${(p) => theme.colors[p.darkBackground ? "dt_taro20" : "white"]};
  padding: ${theme.space.xxl}px 0;
`;

export const Container = s("div")`
  max-width: 600px;
  margin: auto;
  positon: relative;
  padding-inline: ${theme.space.l}px;
  text-align: center;
  & > a {
    margin: auto;
    width: fit-content;
  }
`;

export const Tagline = s(Subheading)`
  color: ${theme.colors.dt_taro50};
  margin-bottom: ${theme.space.s}px;
`;
