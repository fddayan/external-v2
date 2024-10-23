import React from "react";
import { Typography } from "../../Typography";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { buildEventLog, ButtonPrimary } from "./styles";
import { mediaQueriesMax } from "@src/styles/theme";
import { maxWidth } from "styled-system";
import { useTheme } from "@emotion/react";

const Banner = styled(Flex)`
  border-radius: 24px;
  background-image: url(https://static.classdojo.com/uploads/4fe70b2f-2acb-4f07-a570-a792f895d04c.png),
    url(https://static.classdojo.com/uploads/ee16335b-63bd-49d7-aa52-53f2c569d662.png),
    linear-gradient(180deg, #1f1451 0%, #350c52 100%);
  background-size: contain;
  background-position: top, bottom, center;
  background-repeat: no-repeat;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 200px;
  padding-inline: 24px;
  gap: 20px;
  ${mediaQueriesMax[1]} {
    padding-top: 50px;
    background-size: contain, auto 180px, contain;
    gap: 12px;
    padding-bottom: 140px;
  }
`;

export const YourNewSideKick = () => {
  const { yourNewSideKick: values } = useDojoGlow();
  return (
    <Flex gap={36} flexDirection="column">
      <Banner>
        <Typography
          as="h4"
          variant={["minutia", "Display4ExtraBold"]}
          css={{ color: "white !important", textAlign: "center" }}
        >
          {values.sub_title}
        </Typography>
        <Typography
          as="h2"
          variant={["Display5ExtraBold", "Display0ExtraBold"]}
          css={{ color: "white !important", textAlign: "center", maxWidth: 680 }}
        >
          {values.title}
        </Typography>
      </Banner>
      <Typography
        variant={["Body2", "Headline1Medium"]}
        css={{ color: "black", textAlign: "center", maxWidth: 750, margin: "auto" }}
      >
        {values.text}
      </Typography>
      <ButtonPrimary
        variant="primary"
        css={{ width: 200, margin: "auto" }}
        href="https://teach.classdojo.com/#/sidekick"
        eventLog={buildEventLog("your_new_side_kick.button")}
      >
        {values.cta_primary_button}
      </ButtonPrimary>
    </Flex>
  );
};
