import { Theme } from "@emotion/react";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    container: {
      padding: "0 30px",
    },
    heading: {
      ...typography.Display4ExtraBold,
      marginBottom: 18,
      [mediaQueries[1]]: {
        ...typography.Display0ExtraBold,
        marginBottom: 12,
      },
    },
    tagline: {
      ...typography.Headline2Medium,
      marginBottom: 24,
      maxWidth: 700,
      [mediaQueries[1]]: {
        ...typography.Headline1Medium,
        marginBottom: 48,
      },
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      [mediaQueries[1]]: {
        flexDirection: "row",
        gap: 60,
      },
    },
    card: {
      display: "block",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      maxWidth: 384,
      padding: 24,
      borderRadius: 18,
      [mediaQueries[0]]: {
        padding: 32,
        borderRadius: 24,
      },
    },
    avatar: {
      display: "block",
      height: 140,
      width: 140,
      borderRadius: 99,
      margin: "auto",
      marginBottom: 32,
      [mediaQueries[0]]: {
        height: 180,
        width: 180,
        marginBottom: 40,
      },
    },
    cardTitle: {
      ...typography.Display4ExtraBold,
      color: colors.contentLight,
      textAlign: "center",
      lineHeight: 1,
      [mediaQueries[1]]: {
        ...typography.Display3ExtraBold,
        color: colors.contentLight,
        lineHeight: 1,
      },
    },
    pastEvents: {
      ...typography.Display4ExtraBold,
      marginTop: 24,
      marginBottom: 18,
      [mediaQueries[1]]: {
        ...typography.Display2ExtraBold,
        marginBottom: 24,
        marginTop: 100,
      },
    },
    upcomingTitle: {
      ...typography.Display5ExtraBold,
      marginBottom: 24,
      [mediaQueries[1]]: {
        ...typography.Display4ExtraBold,
      },
    },
    upcomingDescription: {
      ...typography.Body1,
      marginBottom: 24,
    },
    upcomingCta: {
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
    },
    carouselTitle: {
      ...typography.Display4ExtraBold,
      marginBottom: 24,
      [mediaQueries[1]]: {
        ...typography.Display2ExtraBold,
        marginBottom: 48,
      },
    },
    carouselCard: {
      cursor: "pointer",
      padding: 0,
      border: "none",
      display: "block",
      minWidth: 320,
      width: 320,
      borderRadius: 18,
      overflow: "hidden",
      scrollSnapAlign: "start",
      boxShadow:
        "0px -0.758px 0.758px 0px rgba(0, 0, 0, 0.10), 0px 0.758px 0px 0px #EBEBEB, 0px 2.275px 2.275px 0px rgba(83, 88, 135, 0.30)",
    },
    carouselThumb: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      height: 180,
      padding: 12,

      "& span": {
        position: "absolute",
        bottom: 16,
        left: 20,
      },
    },
    carouselAvatar: {
      width: 140,
      height: 140,
      borderRadius: 99,
      margin: "auto",
      display: "block",
    },
    carouselText: {
      textAlign: "left",
      background: colors.contentLight,
      padding: 18,
      ...typography.Headline3Medium,
      "& > *": {
        margin: 0,
      },
      "& h4": {
        fontWeight: 700,
        marginBottom: 12,
      },
    },
    slider: {
      display: "flex",
      overflowX: "scroll",
      flexDirection: "row",
      gap: 34,
      scrollSnapType: "x mandatory",
      scrollSnapAlign: "start",
      maxWidth: "100vw",
      width: "100%",
      margin: "0 auto",
      paddingBottom: 12,
      marginBottom: 40,
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    navButtons: {
      width: 50,
      height: 50,
      border: "solid 1px #8047ff",
      boxShadow: "0px -1px 1px 0px rgba(0, 0, 0, 0.1) inset",
      filter:
        "drop-shadow(0px 3px 3px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1px 0px #ebebeb)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      borderRadius: 50,
      cursor: "pointer",
      "& svg": {
        fill: "#8047ff",
      },
      "&:disabled": {
        border: "solid 1px #d3d7ec",
        "& svg": {
          fill: "#d3d7ec",
        },
      },
    },
    marginBottom: 115,
    [mediaQueries[1]]: {
      marginBottom: 225,
    },
  } as const;
}
