import React from "react";
import { useWhatsNewSL } from "./context";
import { Heading, SubText } from "./styles";
import { GImage } from "../GImage";
import Translate from "@src/components/translation/Translate";
import { Flex } from "../Boxes";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

const FlexContainer = styled(Flex)`
  flex-direction: column;
  img {
    align-self: center;
    max-width: 500px;
    ${mediaQueriesMax[1]} {
      width: 200px;
    }
  }
`;

export const HeroD = () => {
  const {
    images: { schoolWideConnections },
  } = useWhatsNewSL();

  return (
    <FlexContainer>
      <GImage img={schoolWideConnections} alt="playing in card" />
      <Flex
        flexDirection="column"
        alignItems="center"
        flex={1}
        css={{ gap: 10, maxWidth: 800, margin: "auto" }}
      >
        <Heading css={{ textAlign: "center" }}>
          <Translate path="directus.page_whats_new_2024_sl.hero_d_title" />
        </Heading>
        <SubText css={{ textAlign: "center" }}>
          <Translate path="directus.page_whats_new_2024_sl.hero_d_text" />
        </SubText>
      </Flex>
    </FlexContainer>
  );
};
