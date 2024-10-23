import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import theme from "@src/styles/theme-v2";
import { Headline } from "./styles";

export const PanelsC_Main = () => {
  const {
    panels_c: { main: values },
  } = useDojoGlow();
  return (
    <Flex
      flexDirection="column"
      justifyContent={["center", "flex-start"]}
      textAlign={["center", "left", "left"]}
      css={{ color: theme.colors.cloud80, gap: theme.spacing[18] }}
    >
      <Headline variant={["Display4ExtraBold", "Display0ExtraBold", "Display0ExtraBold"]}>{values.title}</Headline>
      <Typography variant={["Body2", "Headline1Medium", "Headline1Medium"]} css={{ maxWidth: 700 }}>
        {values.text}
      </Typography>
    </Flex>
  );
};
