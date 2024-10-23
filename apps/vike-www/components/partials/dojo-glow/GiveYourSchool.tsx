import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import theme from "@src/styles/theme-v2";
import { Headline } from "./styles";

export const GiveYourSchool = () => {
  const { giveYourSchool: values } = useDojoGlow();
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={12}
      css={{ textAlign: "center", color: theme.colors.cloud80 }}
    >
      <GImage img={values.image} alt="xxx" css={{ maxHeight: 506 }} />
      <Headline variant={["Display4ExtraBold", "Display0ExtraBold", "Display0ExtraBold"]}>{values.title}</Headline>
      <Typography variant={["Body1", "Headline1Medium", "Headline1Medium"]} css={{ maxWidth: 700, margin: "auto" }}>
        {values.text}
      </Typography>
    </Flex>
  );
};
