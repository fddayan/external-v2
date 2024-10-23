import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { theme, Button } from "@src/components/nessie-web";

export const CardContainer = styled("div")`
  display: flex;
  position: relative;
  flex-direction: row;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-behavior: smooth;
  white-space: nowrap;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 20px;
  ${mediaQueries[0]} {
    gap: 30px;
  }
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: ${theme.space.xxl}px;
`;

export const LeftScrollButton = styled("div")`
  position: sticky;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  &.active {
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    padding-inline: 30px;
    margin-inline: -30px;
    transform: translateX(-30px);
  }
`;

export const RightScrollButton = styled("div")`
  position: sticky;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  &.active {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    padding-inline: 30px;
    margin-inline: -30px;
    transform: translateX(30px);
  }
`;

export const VideoCard = styled("div")`
  width: 280px;
  flex-shrink: 0;
  border: ${theme.borders.dt_border_card};
  border-radius: ${theme.radii.dt_radius_xs};
  overflow: hidden;
  box-shadow: ${theme.shadows.dt_shadow_shadezies};
  ${mediaQueries[0]} {
    width: 372px;
    min-height: 372px;
  }
`;

export const VideoCardThumbContainer = styled("div")`
  position: relative;
`;

export const VideoCardThumb = styled("img")`
  width: 100%;
  height: 209px;
  object-fit: cover;
  cursor: pointer;
`;

export const VideoCardContent = styled("div")`
  padding: ${theme.space.m}px;
  display: flex;
  cursor: pointer;
`;

export const VideoCardDetails = styled("div")`
  padding-right: 18px;
`;

export const VideoCardPlayButton = styled(Button)`
  width: 40px;
  height: 40px;
  flex-grow: 0;
`;

export const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${theme.space.xl}px;
`;
