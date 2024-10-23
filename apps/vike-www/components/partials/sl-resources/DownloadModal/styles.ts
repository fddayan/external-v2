import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { colors, typography } = theme.__new;
  return {
    backdrop: {
      display: "grid",
      placeContent: "center",
      background: "rgba(0,0,0,0.6)",
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    modal: {
      position: "relative",
      backgroundColor: colors.contentLight,
      maxWidth: 555,
      borderRadius: 48,
      padding: 30,
    },
    logo: {
      display: "block",
      margin: "0 auto 18px",
      height: 60,
      width: 60,
      [mediaQueries[0]]: {
        height: 84,
        width: 84,
      },
    },
    title: {
      ...typography.Body1,
      textAlign: "center",
      fontWeight: 700,
      marginBottom: 6,
    },
    description: {
      ...typography.Body2,
      textAlign: "center",
      marginBottom: 18,
    },
    question: {
      "& label": {
        ...typography.Body2,
        fontWeight: 700,
        marginBottom: 6,
        display: "block",
      },
      marginBottom: 18,
      [`& input[type="text"],& input[type="email"]`]: {
        backgroundColor: "white",
        display: "block",
        padding: 18,
        borderRadius: 18,
        border: `2px solid ${colors.bordersPrimary}`,
        width: "100%",
        marginBottom: 6,
        fontWeight: 500,
        fontSize: 18,
        borderColor: colors.cloud50,
      },
    },
    radio: {
      "& > div": {
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginBottom: 6,
      },
      "& > div label": {
        ...typography.Body2,
      },
      "& > label": {
        ...typography.Body2,
        fontWeight: 700,
        marginBottom: 6,
        display: "block",
      },
      marginBottom: 18,
      "& input": {
        boxSizing: "border-box",
        width: "20px",
        height: "20px",
        padding: "0",
        border: `2px solid ${colors.cloud50}`,
        borderRadius: "50%",
        appearance: "none",
        backgroundColor: "transparent",
        outline: "none",
      },
      "& input:checked": {
        borderColor: colors.cloud60,
        backgroundClip: "content-box",
        padding: "2px",
        backgroundImage: `radial-gradient(circle, ${colors.contentAccent} 0%, ${colors.contentAccent} 50%, transparent 60%, transparent 100%)`,
      },
    },
    button: (isValid: boolean) =>
      ({
        ...theme.__new.typography.Headline3Bold,
        padding: 18,
        backgroundColor: isValid ? colors.contentAccent : colors.cloud30,
        pointerEvents: isValid ? "auto" : "none",
        cursor: isValid ? "pointer" : "auto",
        color: colors.contentLight,
        display: "block",
        textAlign: "center",
        borderRadius: 99,
        maxWidth: 384,
        width: "100%",
        margin: "auto",
        alignSelf: "end",
      }) as const,
    success: {
      ...typography.Display3ExtraBold,
      color: colors.frog50,
      textAlign: "center",
    },
  } as const;
}
