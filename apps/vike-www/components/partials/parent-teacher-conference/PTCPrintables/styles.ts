import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      [mediaQueries[1]]: {
        flexDirection: "row",
        gap: 36,
      },
    },
    item: {
      borderRadius: 30,
      padding: 30,
      "&:first-child": {
        marginTop: -50,
        backgroundColor: colors.ocean10,
      },
      "&:last-child": {
        marginBottom: -50,
        backgroundColor: colors.grape10,
      },
      [mediaQueries[1]]: {
        maxWidth: "calc(50% - 18px)",
      },
    },
    heading: {
      ...typography.Display6ExtraBold,
      margin: 0,
      marginBottom: 12,
      [mediaQueries[1]]: {
        ...typography.Display4ExtraBold,
        marginBottom: 24,
      },
    },
    description: {
      ...typography.Body3,
      margin: 0,
      marginBottom: 24,
      [mediaQueries[1]]: {
        ...typography.Body2,
        marginBottom: 18,
      },
    },
    image: {
      borderRadius: 8,
      width: "100%",
      [mediaQueries[1]]: {
        borderRadius: 12,
      },
    },
    cta: {
      ...theme.__new.typography.Headline3Bold,
      border: "none",
      cursor: "pointer",
      padding: 18,
      backgroundColor: theme.__new.colors.contentAccent,
      color: theme.__new.colors.contentLight,
      display: "block",
      textAlign: "center",
      borderRadius: 99,
      width: "fit-content",
      marginTop: 24,
    },
  } as const;
}
