import createTextStyles from "./createTextStyles";
import createColorStyles from "./createColorStyles";
import { ColorsType } from "./theme-v2/colors";
import themeV2, { NewTheme } from "./theme-v2";

const createMediaQuery = (n: any) => `@media screen and (min-width:${n}px)`;
const createMediaQueryMax = (n: any) => `@media screen and (max-width:${n - 1}px)`;

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i];
      },
    }),
  );

const addNamedBreakpoints = (arr, named, f) => {
  for (const [key, value] of Object.entries(named)) {
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return f(value);
      },
    });
  }
};

const breakpointsNum = [768, 992, 1200, 1920];
const namedBreakpoints = { lesson: 720, lessonSSmobile: 950 };
export const breakpoints = breakpointsNum.map((n) => `${n}px`);

export const mediaQueries: any = breakpointsNum.map(createMediaQuery);
export const mediaQueriesMax: any = breakpointsNum.map(createMediaQueryMax);
export const mediaQueryLessonSSmobileHeight = `@media screen and (max-height: 650px)`;

const aliases = ["sm", "md", "lg"];

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);
addAliases(mediaQueriesMax, aliases);

addNamedBreakpoints(mediaQueries, namedBreakpoints, createMediaQuery);
addNamedBreakpoints(mediaQueriesMax, namedBreakpoints, createMediaQueryMax);

export const space = [0, 4, 8, 16, 32, 64, 128];

export const font = `proxima-nova, 'Helvetica Neue', Helvetica, Arial, sans-serif;`;

export const fontSizes = [12, 14, 16, 18, 20, 24, 32, 36, 40, 56, 72];

export const medium = 500;
export const bold = 700;
// alias
export const regular = medium;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = {
  medium,
  bold,
  // alias
  regular,
};

export const lineHeights = [1, 1.125, 1.25, 1.4, 1.5, 1.6, 1.75, 2];

const letterSpacings = {
  normal: "normal",
  caps: "0.025em",
};

// color palette
const black = "#000";
const white = "#fff";
const text = "#363636";
const lightBlue = "#e8f2ff";
const blue = "#007aff";
const darkBlue = "#049";
const lightGray = "#f4f6f8";
const buttonGray = "#edf0f3";
const borderGray = "#eee";
const gray = "#4f6f8f";
const darkGray = "#364049";
const lightGreen = "#ecf7ec";
const green = "#0a0";
const darkGreen = "#060";
const lightRed = "#fbebeb";
const red = "#c00";
const darkRed = "#800";
const orange = "#f68013";
const darkOrange = "#f06f20";
const lightOrange = "#fef2e7";
const lightPurple = "#f5ebfa";
const purple = "#70b";
const yellow = "#fedc2a";
const lightYellow = "#fff3c0";
const pink = "#fe3e81";

// deprecated aliases
const darkPurple = purple;

const colors = {
  black,
  white,
  text,
  blue,
  lightBlue,
  darkBlue,
  gray,
  lightGray,
  buttonGray,
  borderGray,
  darkGray,
  green,
  lightGreen,
  darkGreen,
  red,
  lightRed,
  darkRed,
  orange,
  darkOrange,
  lightOrange,
  purple,
  lightPurple,
  yellow,
  lightYellow,
  pink,
  // deprecated
  darkPurple,
};

export { colors };

// styled-system's `borderRadius` function can hook into the `radii` object/array
export const radii = [0, 2, 6];
export const radius = "2px";

export const maxContainerWidth = "1280px";

// boxShadows
export const boxShadows = [
  `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`,
];

// animation duration
export const duration = {
  fast: `150ms`,
  normal: `300ms`,
  slow: `450ms`,
  slowest: `600ms`,
};

// animation easing curves
const easeInOut = "cubic-bezier(0.5, 0, 0.25, 1)";
const easeOut = "cubic-bezier(0, 0, 0.25, 1)";
const easeIn = "cubic-bezier(0.5, 0, 1, 1)";

const timingFunctions = {
  easeInOut,
  easeOut,
  easeIn,
};

// animation delay
const transitionDelays = {
  small: `60ms`,
  medium: `160ms`,
  large: `260ms`,
  xLarge: `360ms`,
};

export const textStyles = createTextStyles({
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
});

export const colorStyles = createColorStyles({ colors });

const theme = {
  breakpoints,
  mediaQueries,
  space,
  font,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  regular,
  bold,
  textStyles,
  colors,
  colorStyles,
  radii,
  radius,
  boxShadows,
  maxContainerWidth,
  duration,
  timingFunctions,
  transitionDelays,
  __new: themeV2,
};

type CurrentTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends CurrentTheme {
    __new: NewTheme;
  }
}
export default theme;
