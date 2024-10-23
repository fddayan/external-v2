import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    bgTop: {
      height: 140,
      marginBottom: -2,
      backgroundPosition: "center",
      backgroundSize: "cover",
      marginTop: 70,
      [mediaQueries[1]]: {
        height: 200,
        marginTop: 100,
      },
    },
    bg: {
      backgroundColor: colors.contentAccent,
      paddingBottom: 84,
      [mediaQueries[1]]: {
        paddingBottom: 150,
      },
    },
    icon: {
      height: 100,
      width: 100,
      display: "block",
      margin: "0 auto 14px",
      [mediaQueries[1]]: {
        height: 160,
        width: 160,
        marginBottom: 30,
      },
    },
    heading: {
      ...typography.Display5ExtraBold,
      color: "white",
      textAlign: "center",
      margin: 0,
      marginBottom: 24,
      [mediaQueries[1]]: {
        ...typography.Display0ExtraBold,
        color: "white",
        textAlign: "center",
        marginBottom: 54,
      },
    },
    flex: {
      display: "flex",
      flexWrap: "wrap",
      gap: 24,
      justifyContent: "center",
    },
    card: {
      width: 319,
      height: 393,
      display: "flex",
      flexDirection: "column",
      padding: 18,
      backgroundColor: "white",
      borderRadius: 18,
      overflow: "hidden",
      [mediaQueries[1]]: {
        height: 432,
        paddingBottom: 30,
      },
    },
    cardImage: (src: string) => ({
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: 229,
      margin: "-18px -18px 0",
    }),
    cardText: {
      ...typography.Body2,
      fontWeight: 700,
      flexGrow: 1,
      marginBottom: 24,
    },
    cardCta: (disabled: boolean) =>
      ({
        ...theme.__new.typography.Headline3Bold,
        border: "none",
        cursor: disabled ? "auto" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
        padding: 18,
        backgroundColor: disabled
          ? colors.contentDisabled
          : colors.contentAccent,
        color: colors.contentLight,
        display: "block",
        textAlign: "center",
        borderRadius: 99,
        width: "fit-content",
      }) as const,
  } as const;
}
