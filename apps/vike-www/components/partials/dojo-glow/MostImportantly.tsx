import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import theme from "@src/styles/theme-v2";
import { mediaQueriesMax } from "@src/styles/theme";

export const MostImportantly = () => {
  const { mostImportantly: values } = useDojoGlow();

  const Background = styled.div`
    background-image: url(${values.side_image_a.publicURL}), url(${values.side_image_b.publicURL});
    background-repeat: no-repeat;
    background-position: left bottom, right bottom;
    min-height: 600px;
    display: flex;
    margin-top: 100px;
    ${mediaQueriesMax[1]} {
      background-size: 120px auto, 120px auto;
      min-height: 230px;
      > div {
        max-width: 300px;
      }
    }
  `;
  return (
    <Background>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
        css={{ maxWidth: 600, margin: "auto" }}
      >
        <Typography
          variant={["Display5ExtraBold", "Display5ExtraBold", "Display0ExtraBold"]}
          css={{ textAlign: "center", color: theme.colors.cloud90 }}
          as="h2"
        >
          {values.title}
        </Typography>
      </Flex>
    </Background>
  );
};
