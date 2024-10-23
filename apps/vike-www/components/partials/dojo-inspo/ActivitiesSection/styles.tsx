import s from "@emotion/styled";
import { theme, Button } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { ResponsiveMasonry } from "react-responsive-masonry";
import newStars from "@src/assets/images/activity-corner/new-badge.svg";

interface ActivitiesSectionProps {
  backgroundColor: string;
}

export const ActivityCard = s("div")<ActivitiesSectionProps>`
position: relative;
  display: flex;
  flex-direction: column;
  break-inside: avoid-column;
  overflow: hidden;
  border: ${theme.borders.dt_border_card};
  border-radius: 24px;
  background-color: ${(props) => (props.backgroundColor ? theme.colors[props.backgroundColor] : theme.colors.dt_white)};
  transition: all 0.1s;
  &:hover {
    border-color: ${theme.colors.dt_taro40};
    box-shadow: ${theme.shadows.dt_shadow_shadezies};
    .description {
      color: ${theme.colors.dt_taro90};
    }
  }
`;

export const ActivityCardInner = s("div")`
  padding: ${theme.space.l}px;
`;

export const FilterContainer = s("div")`
  display: flex;
  position: relative;
  flexDirection: row;
  gap: 12px;
  scrollbar-width: none;
  max-width: 1170px;
  padding: ${theme.space.dt_l}px;
  margin: auto;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  ${mediaQueries[1]} {
    margin-bottom: ${theme.space.s}px;
  }
`;

export const NewTagBadge = s("div")`
  padding: 18px;
  position: absolute;
  top: -7px;
  right: -12px;
  background-image: url("${newStars}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const LeftScrollButton = s("div")`
  position: sticky;
  left: 0;
  z-index: 10;
  &.active {
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    padding-inline: 30px;
    margin-inline: -30px;
    transform: translateX(-30px);
  }
`;

export const RightScrollButton = s("div")`
  position: sticky;
  right: 0;
  z-index: 10;
  &.active {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    padding-inline: 30px;
    margin-inline: -30px;
    transform: translateX(30px);
  }
`;

export const ActivityColumns = s(ResponsiveMasonry)`
  max-width: 1170px;
  margin: auto;
  padding-inline: ${theme.space.l}px;
  padding-block: ${theme.space.xl}px;
`;

export const BadgesContainer = s("div")`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: ${theme.space.xs}px;
`;

export const NewActivityBadge = s(Button)`
  display: block;
  cursor: normal;
  pointer-events: none;
`;

export const SearchInput = s("input")`
  font-family: ProximaNova,'Helvetica Neue',Helvetica,Arial,sans-serif;
  height: 44px;
  padding-left: 36px;
  padding-right: 18px;
  font-size: 15px;
  outline: none;
  width: 100%;
  max-width: 358px;
  line-height: 22px;
  letter-spacing: -0.25px;
  font-weight: 600;
  color: rgb(44, 42, 80);
  border-radius: 18px;
  border: 2px solid #D3D7EC;
  caret-color: rgb(0, 146, 229);
  &:focus {
    border: 3px solid rgb(0, 146, 229);
    color: rgb(44, 42, 80);
`;
