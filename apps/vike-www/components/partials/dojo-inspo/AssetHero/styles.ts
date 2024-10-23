import s from "@emotion/styled";
import { DetailText, theme } from "@src/components/nessie-web";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { mediaQueries } from "@src/styles/theme";

const containerWidth = "1170px";
export const ActivityHeaderContainer = s("div")`
  width: 100%;

  padding-block: ${theme.space.xl}px;

  ${mediaQueries[1]} {
    box-shadow: ${theme.shadows.dt_shadow_shadezies};
    position: sticky;
    top: 89px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    z-index: 1;
  }
`;

export const ActivityHeader = s("div")`
  margin: auto;
  display: flex;
  justify-content: space-between;
  max-width: ${containerWidth};
  flex-direction: column;
  align-items: flex-start;
  padding-inline: ${theme.space.l}px;
  ${mediaQueries[1]} {
    flex-direction: row;
    align-items: center;
  }
`;

export const ActivityTitle = s("div")`
  display: flex;
  margin-bottom: ${theme.space.xs}px;
  flex-direction: column-reverse;
  ${mediaQueries[1]} {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

export const HeaderCtas = s("div")`
  display:flex;
  gap: ${theme.space.s}px;
  width: 100%;
  & > a,
  & > button {
    flex-grow: 1;
  }
  ${mediaQueries[1]} {
    width: auto;
    & > a,
    & > button {
      flex-grow: none;
    }
  }
`;

export const ActivityPreview = s("div")`
  display: flex;
  flex-direction: column;
  max-width: ${containerWidth};
  padding-inline: ${theme.space.l}px;
  padding-bottom: ${theme.space.xxl}px;
  margin: auto;
  ${mediaQueries[1]} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: ${theme.space.l}px;
    padding-block: ${theme.space.xxl}px;
  }
`;

export const ActivityImage = s.img`
  border-radius: ${theme.radii.dt_radius_m};
  min-height: 450px;
  margin-bottom: ${theme.space.s}px;
  object-fit: cover;
  ${mediaQueries[1]} {
    margin-bottom: 0;
  }
`;

export const BackLink = s(Link)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${theme.space.xs}px;
`;

export const ActivityDescription = s("div")`
`;

export const ActivityTags = s("div")`
  display: flex;
  gap: ${theme.space.s}px;
  flex-wrap: wrap;
`;

export const ActivityInfo = s("div")`
  display: grid;
  grid-gap: ${theme.space.xs}px;
`;

export const TeacherInfo = s("div")`
  display:grid;
  grid-template-columns: ${theme.space.xxl}px auto;
  grid-gap: ${theme.space.xxs}px ${theme.space.s}px;
  span {
    grid-column-start: 2;
  }
`;

export const TeacherInfoText = s(DetailText)`
  color: ${theme.colors.dt_taro60};
`;

export const TeacherAvatar = s.img`
  border-radius: ${theme.radii.dt_radius_round};
  max-height: ${theme.space.xxl}px;
  grid-row: 1 / 4;
`;
