import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    background: {
      backgroundImage: "linear-gradient(180deg, #FFF 38.35%, #F0D9FF 107.35%)",
      padding: "80px 0",
      [mediaQueries[0]]: {
        padding: "130px 0",
      },
    },
    container: {
      padding: "0 30px",
      display: "flex",
      flexDirection: "column",
      gap: 24,
      [mediaQueries[0]]: {
        gap: 36,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    copy: {
      [mediaQueries[0]]: {
        maxWidth: 389,
      },
    },
    heading: {
      ...typography.Display4ExtraBold,
      [mediaQueries[2]]: {
        ...typography.Display2ExtraBold,
      },
    },
    description: {
      ...typography.Body1,
    },
    card: {
      position: "relative",
      padding: 24,
      backgroundColor: colors.ocean10,
      borderRadius: 24,
      boxShadow: "0px 4.138px 4.138px 0px rgba(0, 0, 0, 0.25)",
      overflow: "hidden",
      width: "100%",
      [mediaQueries[0]]: {
        maxWidth: 548,
      },

      "& .content": {
        maxWidth: 190,
        [mediaQueries[0]]: {
          maxWidth: 270,
        },
      },

      "& h3": {
        ...typography.Headline2ExtraBold,
        marginBottom: 12,
        [mediaQueries[1]]: {
          ...typography.Headline1ExtraBold,
        },
      },

      "& p": {
        ...typography.Body3,
        marginBottom: 12,
        [mediaQueries[1]]: {
          ...typography.Body2,
          marginBottom: 36,
        },
      },

      "& img": {
        minWidth: 105,
        width: "25%",
        maxWidth: 170,
        position: "absolute",
        bottom: 0,
        right: 12,
        [mediaQueries[1]]: {
          right: 35,
        },
      },
    },
    button: {
      ...theme.__new.typography.Headline3Bold,
      padding: 18,
      backgroundColor: theme.__new.colors.contentAccent,
      color: theme.__new.colors.contentLight,
      display: "block",
      textAlign: "center",
      borderRadius: 99,
      cursor: "pointer",
      border: "none",
    },
  } as const;
}
