import s from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

export const Background = s("div")`
  background-color: ${theme.colors.dt_taro20};
`;

interface ContainerProps {
  splitView: boolean;
}
export const Container = s("div")<ContainerProps>`
  max-width: 912px;
  margin: auto;
  grid-gap: ${theme.space.l}px;
  grid-template-columns: 1fr 1fr;
  positon: relative;
  padding: ${theme.space.xxl}px ${theme.space.l}px 0;
  ${mediaQueries[1]} {
    ${(p) =>
      p.splitView
        ? {
            display: "grid",
          }
        : `
            text-align: center;
            max-width: 600px;
          `}
  }
`;

export const ShareContent = s("div")`
  display: grid;
  grid-gap: ${theme.space.m}px;
  position: sticky;
  padding-bottom: ${theme.space.l}px;
  top: 90px;
  border-bottom: ${theme.borders.dt_border_card},
  margin-bottom: ${theme.space.xxl}px;
  text-align: center;
  .show-desktop {
    display: none;
  }
  ${mediaQueries[1]} {
    padding-bottom: ${theme.space.xxl}px;
    text-align: left;
    .show-desktop {
      display: flex;
    }
  }
`;

export const MobileShareCta = s("div")`
  background-color: ${theme.colors.aqua50};
  padding: ${theme.space.xxl}px ${theme.space.l}px;
  margin: 0 -${theme.space.l}px;
  text-align: center;
  ${mediaQueries[1]} {
    display: none;
  }
`;

export const ShareSocialMedia = s("div")`
  margin-top: ${theme.space.xs}px;
  padding-top: ${theme.space.l}px;
  border-top: solid 1px ${theme.colors.taro30};
  ${mediaQueriesMax[1]} {
    display: none;
  }
`;

export const ShareSocialMediaMobile = s("div")`
  text-align: center;
  margin: ${theme.space.l}px 0;
  ${mediaQueries[1]} {
    display: none;
  }
`;

interface ShareButtonsProps {
  center: boolean;
}
export const ShareButtons = s("div")<ShareButtonsProps>`
  display: flex;
  gap: ${theme.space.s}px;
  margin-top: ${theme.space.m}px;
  ${(p) => p.center && "justify-content: center;"}
  ${mediaQueriesMax[1]} {
    justify-content: center;
  }
`;

export const TeacherCardsContainer = s("div")`
  grid-column-start: 2;
  ${mediaQueriesMax[1]} {
    display: flex;
    overflow-x: scroll;
  }
`;

export const TeacherCard = s("div")`
  margin: ${theme.space.s}px;
  border: ${theme.borders.dt_border_card};
  border-radius: ${theme.radii.dt_radius_m};
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.dt_shadow_shadezies};
  min-width: 90%;
  ${mediaQueries[1]} {
    margin: ${theme.space.m}px;
  }
`;

export const TeacherCardHeader = s("div")`
  display: grid;
  grid-template-columns: 54px auto;
  grid-column-gap: ${theme.space.m}px;
  grid-auto-flow: column;
  padding: ${theme.space.l}px;
`;

export const TeacherAvatar = s.img`
  border-radius: ${theme.radii.dt_radius_round};
  object-fit: cover;
  height: ${theme.space.xxl}px;
  width: ${theme.space.xxl}px;
  grid-row: 1 / 3;
`;

export const CardImage = s.img`
  height: 240px;
  width: 100%;
  object-fit: cover;

  ${mediaQueries[1]} {
    height: 320px;
  }
`;
