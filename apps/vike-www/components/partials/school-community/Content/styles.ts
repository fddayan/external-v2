import s from "@emotion/styled";
import { theme } from "@src/components/nessie-web";

export const Background = s("div")`
  padding: ${theme.space.xxl}px; 0;
  background-color: ${theme.colors.mango10};
  &>div>h1,
  &>div>p,
  &>div>span {
    text-align: center;
  }
`;

export const VideoContainer = s("div")`
  max-width: 720px;
  margin: auto;
  padding: ${theme.space.m}px;
  border-radius: ${theme.radii.dt_radius_s};
  background-color: ${theme.colors.mango60};
  display: grid;
  place-content: center;
  video {
    border-radius: 12px;
  }

`;
export const CTAContainer = s("div")`
  display: grid;
  gap: ${theme.space.s}px;
  justify-content: center;
`;
