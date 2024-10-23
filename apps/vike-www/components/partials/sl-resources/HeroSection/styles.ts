import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    banner: {
      height: 456,
      backgroundPosition: "center",
      backgroundSize: "cover",
      paddingTop: 130,
      marginBottom: 38,
      [mediaQueries[1]]: {
        marginBottom: 100,
      },
    },
    container: {
      padding: "0 30px",
    },
    heading: {
      ...typography.Display4ExtraBold,
      color: colors.contentLight,
      marginBottom: 24,
      [mediaQueries[1]]: {
        ...typography.Display0ExtraBold,
        color: colors.contentLight,
        marginBottom: 36,
      },
    },
    flex: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      [mediaQueries[1]]: {
        gap: 18,
      },
    },
    pill: {
      display: "block",
      padding: "14px 18px",
      backgroundColor: colors.contentLight,
      ...typography.label,
      borderRadius: 99,
      width: "fit-content",
    },
  } as const;
}
