import React from "react";
import { useWhatsNewSL } from "./context";
import { Heading, SubText } from "./styles";
import { GImage } from "../GImage";
import Translate from "@src/components/translation/Translate";
import { Flex } from "../Boxes";
import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

const FlexContainer = styled(Flex)`
  flex-direction: column-reverse;
  align-items: center;
  text-align: center;
  gap: 18px;
  img {
    max-width: 200px;
    align-self: center;
  }
  ${mediaQueries[0]} {
    text-align: left;
    flex-direction: row;
    gap: 60px;
    img {
      max-width: 40%;
    }
  }
`;

export const HeroC = () => {
  const {
    images: { engagedFamilies },
  } = useWhatsNewSL();

  return (
    <FlexContainer>
      <Flex flexDirection="column" flex={1} css={{ gap: 18 }}>
        <Heading>
          <Translate path="directus.page_whats_new_2024_sl.hero_c_title" />
        </Heading>
        <SubText>
          <Translate path="directus.page_whats_new_2024_sl.hero_c_text" />
        </SubText>
      </Flex>
      <GImage img={engagedFamilies} alt="playing in card" css={{ flex: 1 }} />
    </FlexContainer>
  );
};
