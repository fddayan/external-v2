import styled from "@emotion/styled";
import { uniq } from "lodash";
import React, { CSSProperties } from "react";
import { FacePaintResponsive, mq } from "./FacePaintResponsive";

type DisplayExtraBoldNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type DisplayMediumNumbers = 2 | 3 | 4 | 5;
type DisplayTypography =
  | "OversizeDisplay"
  | `Display${DisplayExtraBoldNumbers}ExtraBold`
  | `Display${DisplayMediumNumbers}Medium`;
type HeadlineExtraBoldNumbers = 1 | 2;
type HeadlineBoldNumbers = 3;
type HeadlineMediumNumbers = 1 | 2 | 3;
type HeadlineTypography =
  | `Headline${HeadlineExtraBoldNumbers}ExtraBold`
  | `Headline${HeadlineBoldNumbers}Bold`
  | `Headline${HeadlineMediumNumbers}Medium`;
type BodyNumbers = 1 | 2 | 3;
type BodyTypography = `Body${BodyNumbers}`;
type TypographyVariants =
  | DisplayTypography
  | HeadlineTypography
  | BodyTypography
  | "label"
  | "overline"
  | "minutia";

export interface TypographyStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  lineHeight?: number | string;
  letterSpacing?: number;
  textTransform?: CSSProperties["textTransform"];
  fontFeatureSettings?: string;
}

export type TypographyTheme = Record<TypographyVariants, TypographyStyle>;

export interface TypographyProps {
  variant: FacePaintResponsive<TypographyVariants>;
}

export const Typography = styled("p")<TypographyProps>(({ variant, theme }) => {
  const variantArr = Array.isArray(variant) ? variant : [variant];
  const keys = uniq(
    variantArr.map((v) => Object.keys(theme.__new.typography[v])).flat()
  );
  const styles = keys.reduce((acc, key) => {
    const values = variantArr.map((v) => theme.__new.typography[v][key]);
    return { ...acc, [key]: values };
  }, {});

  return mq({
    margin: 0,
    padding: 0,
    textWrap: "balance",
    ...styles,
  });
});
