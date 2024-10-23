import { Theme } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";

export default function styles(theme: Theme) {
  const { typography } = theme.__new;
  return {
    flex: {
      margin: "24px 0",
      [mediaQueries[1]]: {
        display: "flex",
        margin: "100px 0",
      },
    },
    heading: {
      ...typography.Display5ExtraBold,
      margin: 0,
      marginBottom: 12,
      [mediaQueries[1]]: {
        ...typography.Display0ExtraBold,
        marginBottomn: 30,
      },
    },
    tagline: {
      ...typography.Body2,
      margin: 0,
      marginBottom: 30,
      [mediaQueries[1]]: {
        ...typography.Headline1Medium,
      },
    },
    image: {
      [mediaQueries[0]]: {
        maxWidth: 600,
      },
    },
  };
}
