import styled, { StyledComponent } from "@emotion/styled";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import { ElementType, HTMLAttributes } from "react";

type TextProps = SpaceProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  TypographyProps & {
    as?: ElementType<any>;
  };

const Text: StyledComponent<
  HTMLAttributes<HTMLParagraphElement>,
  TextProps,
  Record<string, unknown>
> = styled("p")`
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: block;
  margin: 0 0 11px;

  ${space};
  ${color};
  ${layout};
  ${position};
  ${typography};
`;
Text.defaultProps = {};

const MutedText = styled(Text)<TextProps>`
  color: #adadad;
`;
MutedText.defaultProps = { fontSize: 2 };

type HeaderProps = Omit<
  SpaceProps & ColorProps & LayoutProps & PositionProps & TypographyProps,
  "as"
> & {
  as?: ElementType<any>;
  color?: string;
};

const HeaderStyles: StyledComponent<
  Omit<HTMLAttributes<HTMLHeadElement>, "color"> & {
    lineHeight?: string | number | number[];
    fontSize?: string | number | number[] | string[];
    fontWeight?: string | number;
  },
  HeaderProps,
  { lineHeight?: string | number | number[] }
> = styled("h3")`
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: block;
  margin-top: 22px;
  margin-bottom: 11px;

  ${space};
  ${color};
  ${layout};
  ${position};
  ${typography};
`;

const Heading1: StyledComponent<
  HTMLAttributes<HTMLParagraphElement>,
  TextProps,
  Record<string, unknown>
> = styled("h1")`
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: block;
  margin: 0 0 11px;

  ${space};
  ${color};
  ${layout};
  ${position};
  ${typography};
`;
Heading1.defaultProps = {};
const Heading2: StyledComponent<
  HTMLAttributes<HTMLParagraphElement>,
  TextProps,
  Record<string, unknown>
> = styled("h2")`
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: block;
  margin: 0 0 11px;

  ${space};
  ${color};
  ${layout};
  ${position};
  ${typography};
`;
Heading2.defaultProps = {};

const H1 = HeaderStyles.withComponent("h1");
H1.defaultProps = { lineHeight: 2, fontSize: [5, 6], fontWeight: 400 };

const H3 = HeaderStyles.withComponent("h3");
H3.defaultProps = { lineHeight: [1, 1], fontSize: [4, 4, 7], fontWeight: 800 };

const H4 = HeaderStyles.withComponent("h4");
H4.defaultProps = { lineHeight: [1, 1], fontSize: [3, 3, 4], fontWeight: 400 };

export { Text, HeaderStyles, MutedText, Heading1, Heading2, H1, H3, H4 };
