import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import { css } from "@emotion/react";
import { display } from "styled-system";
import { mediaQueriesMax } from "@src/styles/theme";
import theme from "@src/styles/theme-v2";
import { Headline } from "./styles";

const imageStyle = {
  display: "block",
  flex: 1,
  [mediaQueriesMax[1]]: {
    display: "none",
  },
};

export const BrighterWays = () => {
  const { brighterWays: values } = useDojoGlow();
  return (
    <Flex flexDirection={["column", "row", "row"]} gap={30}>
      <Flex
        flexDirection="column"
        flex={1}
        gap={12}
        textAlign={["center", "left", "left"]}
        css={{ color: theme.colors.cloud80 }}
      >
        <Headline variant={["Display4ExtraBold", "Display0ExtraBold", "Display0ExtraBold"]}>{values.title}</Headline>
        <Typography variant={["Body2", "Headline1Medium", "Headline1Medium"]}>{values.text}</Typography>
      </Flex>
      <GImage img={values.image_b} alt="" css={imageStyle} />
    </Flex>
  );
};
