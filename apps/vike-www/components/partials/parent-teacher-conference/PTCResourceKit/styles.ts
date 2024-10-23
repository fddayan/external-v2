import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { typography } = theme.__new;
  return {
    flex: {
      margin: "24px 0 50px",
      [mediaQueries[1]]: {
        display: "flex",
        gap: 36,
        margin: "100px 0",
      },
    },
    heading: {
      ...typography.Display6ExtraBold,
      margin: 0,
      marginBottom: 12,
      [mediaQueries[1]]: {
        ...typography.Display2ExtraBold,
        marginBottomn: 15,
      },
    },
    tagline: {
      ...typography.Body2,
      margin: 0,
      marginBottom: 24,
      [mediaQueries[1]]: {
        ...typography.Body1,
        marginBottom: 50,
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
      marginBottom: 24,
    },
    video: {
      width: "100%",
      position: "relative",
      overflow: "hidden",
      height: 228,
      // borderRadius: 14,
      // backgroundColor: "rgba(0,0,0,0.2)",
      [mediaQueries[1]]: {
        maxWidth: 600,
        height: 389,
        // borderRadius: 24,
      },
    },
  } as const;
}
