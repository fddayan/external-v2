import styled from "@emotion/styled";
import {
  border,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  display,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  zIndex,
  ZIndexProps,
} from "styled-system";
import React, { ElementType } from "react";
import { SpacingValues } from "../styles/theme-v2/spacing";
import { Theme } from "@emotion/react";
import { FacePaintResponsive, fpProp, mq } from "./FacePaintResponsive";

export type BoxProps = SpaceProps &
  BorderProps &
  ColorProps &
  LayoutProps &
  ZIndexProps &
  PositionProps &
  TypographyProps & {
    as?: string;
    id?: string;
    className?: string;
    href?: string;
    onClick?: () => void;
    style?: Record<string, string>;
  };

const Box: React.FC<BoxProps> = styled.div(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  border,
  space,
  color,
  layout,
  zIndex,
  position,
  typography,
  display,
);

export type FlexProps = SpaceProps &
  BorderProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  ZIndexProps &
  PositionProps &
  BoxShadowProps &
  TypographyProps & {
    as?: ElementType<any>;
    id?: string;
    className?: string;
  } & { gap?: FacePaintResponsive<SpacingValues> };

const gapFn = (props: { gap?: FacePaintResponsive<SpacingValues>; theme: Theme }) => {
  const { gap, theme } = props;
  return mq({
    gap: fpProp(gap, (g) => theme.__new.spacing[g]),
  });
};

const Flex = styled.div<FlexProps>`
  display: flex;
  ${border};
  ${space};
  ${color};
  ${layout};
  ${flexbox};
  ${zIndex};
  ${position};
  ${typography};
  ${boxShadow};
  ${gapFn}
`;

// ${gapFn}
const FlexList: React.FunctionComponent<FlexProps> = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  ${border};
  ${space};
  ${color};
  ${layout};
  ${flexbox};
  ${zIndex};
  ${position};
  ${typography};
  ${boxShadow};
`;

export const FlexDummy = () => {
  return <Flex gap={3} />;
};

export { Box, Flex, FlexList };
