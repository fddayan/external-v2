import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    container: {
      padding: "0 30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20,
      [mediaQueries[1]]: {
        marginBottom: 140,
      },
    },
    image: {
      width: "calc(100% + 60px)",
      maxWidth: 600,
      margin: "0 -30px 24px",
      [mediaQueries[1]]: {
        margin: 0,
        marginBottom: 36,
      },
    },
    heading: {
      ...typography.Display4ExtraBold,
      textAlign: "center",
      marginBottom: 24,

      maxWidth: 916,
      [mediaQueries[1]]: {
        ...typography.Display0ExtraBold,
        marginBottom: 36,
      },
    },
    highlight: {
      display: "inline-block",
      color: colors.contentAccent,
    },
    cta: {
      ...theme.__new.typography.Headline3Bold,
      padding: 18,
      backgroundColor: theme.__new.colors.contentAccent,
      color: theme.__new.colors.contentLight,
      display: "block",
      textAlign: "center",
      borderRadius: 99,
    },
  } as const;
}
