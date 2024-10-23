import { Theme } from "@emotion/react";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;

  return {
    bgBottomCss: {
      height: 83,
      marginTop: -2,
      backgroundPosition: "center",
      backgroundSize: "cover",
      marginBottom: 100,
      [mediaQueries[1]]: {
        height: 135,
        marginBottom: 180,
      },
    },
    background: {
      backgroundColor: colors.contentAccent,
      paddingBottom: 60,
    },
    bgTopCss: {
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
    heading: {
      ...typography.Display4ExtraBold,
      marginTop: 0,
      marginBottom: 18,
      color: colors.contentLight,
      [mediaQueries[1]]: {
        ...typography.Display2ExtraBold,
        marginBottom: 24,
        color: colors.contentLight,
      },
    },
    tagline: {
      ...typography.Body1,
      color: "white",
      marginBottom: 24,
      [mediaQueries[1]]: {
        marginBottom: 48,
      },
    },
    carouselCard: {
      display: "grid",
      gridTemplateRows: "180px auto",
      width: 320,
      minHeight: 380,
      borderRadius: 18,
      overflow: "hidden",
      margin: "auto",
      boxShadow:
        "0px -0.758px 0.758px 0px rgba(0, 0, 0, 0.10), 0px 0.758px 0px 0px #EBEBEB, 0px 2.275px 2.275px 0px rgba(83, 88, 135, 0.30)",
    },
    carouselThumb: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
    },
    carouselContent: {
      display: "grid",
      gridTemplateRows: "min-height auto",
      backgroundColor: "white",
      padding: 18,
    },
    carouselText: {
      ...typography.Headline3Bold,
      margin: 0,
      marginBottom: 12,
    },
    carouselCta: {
      ...theme.__new.typography.Headline3Bold,
      padding: 18,
      backgroundColor: theme.__new.colors.contentAccent,
      color: theme.__new.colors.contentLight,
      display: "block",
      textAlign: "center",
      borderRadius: 99,
      width: "fit-content",
      alignSelf: "end",
      border: "none",
      cursor: "pointer",
    },

    slider: {
      display: "flex",
      overflowX: "scroll",
      flexDirection: "row",
      gap: 34,
      scrollSnapType: "x mandatory",
      maxWidth: "100vw",
      width: "100%",
      margin: "0 auto",
      paddingInline: "calc((100vw / 2) - (1170px / 2) + 15px)",
      marginBottom: 40,
      "&::-webkit-scrollbar": {
        display: "none",
      },
      [mediaQueriesMax[1]]: {
        paddingLeft: 15,
        "& > div:last-child": {
          marginRight: 15,
        },
      },
      [mediaQueriesMax[2]]: {
        paddingLeft: 30,
        "& > div:last-child": {
          marginRight: 30,
        },
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
  } as const;
}
