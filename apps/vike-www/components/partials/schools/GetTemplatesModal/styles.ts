import { Theme } from "@emotion/react";

export const styles = (theme: Theme) => {
  const { colors, typography } = theme.__new;
  return {
    hero: {
      margin: -30,
      padding: "50px 48px 30px",
      borderTopLeftRadius: 48,
      borderTopRightRadius: 48,
      backgroundColor: colors.sun20,
    },
    logo: {
      height: 40,
      marginBottom: 12,
    },
    flex: {
      display: "flex",
      alignItems: "center",
      "& > div": {
        flexGrow: 1,
      },
    },
    tagline: {
      ...typography.Headline3Bold,
      color: colors.grape60,
      fontSize: 23,
    },
    title: {
      ...typography.Headline1ExtraBold,
      fontSize: 35,
      marginTop: 0,
    },
    heroImage: {
      height: 186,
    },
    content: {
      padding: "60px 18px 30px",
    },
    description: {
      ...typography.Body1,
      maxWidth: 500,
      margin: "auto",
      textAlign: "center",
      marginBottom: 18,
    },
    cta: (isValid: boolean) =>
      ({
        display: "flex",
        boxSizing: "border-box",
        color: "white",
        backgroundColor: isValid ? colors.contentAccent : colors.cloud30,
        pointerEvents: isValid ? "auto" : "none",
        cursor: isValid ? "pointer" : "auto",
        textAlign: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        gap: 12,
        padding: "12px 28px",
        lineHeight: 1.3,
        fontWeight: 600,
        borderRadius: 99,
        fontSize: 20,
        height: 64,
        fontFamily: `DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif`,
        width: "100%",
        border: "none",
      }) as const,
    question: {
      "& label": {
        ...typography.label,
        fontSize: 18,
        display: "block",
        marginTop: 18,
        marginBottom: 6,
      },
      [`& select, & input[type="text"]`]: {
        backgroundColor: "white",
        display: "block",
        padding: 18,
        borderRadius: 18,
        border: `2px solid ${colors.bordersPrimary}`,
        width: "100%",
        marginBottom: 6,
        fontWeight: 500,
        fontSize: 18,
      },
      "& input:focus-visible": {
        outlineColor: colors.bordersActive,
      },
    },
    required: {
      margin: "18px 0",
      fontWeight: 500,
      fontSize: 15,
    },
  } as const;
};
