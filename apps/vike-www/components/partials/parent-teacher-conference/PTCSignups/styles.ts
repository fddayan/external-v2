import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import BettUK2024 from "@src/www/bett-uk-2024";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    container: {
      marginBottom: 30,
      [mediaQueries[1]]: {
        display: "flex",
        gap: 36,
        marginBottom: 100,
      },
    },
    icon: {
      width: 75,
      height: 75,
      marginBottom: 12,
      [mediaQueries[1]]: {
        width: 170,
        height: 170,
        marginBottom: 24,
      },
    },
    heading: {
      ...typography.Display6ExtraBold,
      margin: 0,
      marginBottom: 12,
      [mediaQueries[1]]: {
        ...typography.Display2ExtraBold,
        marginBottom: 24,
      },
    },
    tagline: {
      ...typography.Body2,
      margin: 0,
      marginBottom: 18,
      [mediaQueries[1]]: {
        ...typography.Body1,
        marginBottom: 24,
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
      marginBottom: 18,
      [mediaQueries[1]]: {
        marginBottom: 24,
      },
    },
    videoCta: {
      border: "none",
      backgroundColor: colors.cloud80,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 12px",
      borderRadius: 20,
      width: "100%",
      maxWidth: 270,
      textAlign: "left",
      "& .first-line": {
        display: "block",
        ...typography.overline,
        color: "white",
        opacity: 0.5,
        fontWeight: 600,
      },
      "& .second-line": {
        display: "block",
        ...typography.label,
        color: "white",
      },
      "& .third-line": {
        display: "block",
        ...typography.label,
        color: colors.grape30,
        marginBottom: 6,
      },
      "& .icon": {
        width: 25,
        height: 25,
      },
    },
    videoThumb: (src: string) => ({
      backgroundImage: `url(${src})`,
      width: 99,
      height: 75,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 8,
    }),
    image: {
      width: "100%",
      maxHeight: 500,
      [mediaQueries[1]]: {
        maxWidth: 630,
        maxHeight: "unset",
      },
    },
  } as const;
}
