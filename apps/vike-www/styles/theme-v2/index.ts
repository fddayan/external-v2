import { TypographyTheme } from "../../components/Typography";
import { colors, ColorsType } from "./colors";
import { spacing, Spacing } from "./spacing";
import { typography } from "./typography";

export interface NewTheme {
  colors: ColorsType;
  spacing: Spacing;
  typography: TypographyTheme;
}

const theme: NewTheme = {
  colors,
  spacing,
  typography,
};

export default theme;
