import React from "react";
import { Flex } from "@src/components/Boxes";
import { AnchorScroll, scrollWithOffset } from "@src/components/AnchorScroll";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled/base";

const remoteLearningScrollOffset = 100;

const NoBulletLi = styled("li")`
  list-style-type: none;
`;

const NavSection: React.FC = () => {
  return (
    <Flex
      as="ul"
      flexDirection={["column", "row"]}
      justifyContent="center"
      alignItems="center"
      paddingTop={["10px", "20px"]}
      paddingBottom={["10px", "20px"]}
      marginBottom="0"
    >
      <NoBulletLi>
        <AnchorScroll href="#teachers" customOffset={remoteLearningScrollOffset}>
          <Translate path="directus.page_remotelearning.link_teachers" />
        </AnchorScroll>
      </NoBulletLi>
      <NoBulletLi>
        <AnchorScroll href="#leaders" customOffset={remoteLearningScrollOffset}>
          <Translate path="directus.page_remotelearning.link_schools" />
        </AnchorScroll>
      </NoBulletLi>
      <NoBulletLi>
        <AnchorScroll href="#parents" customOffset={remoteLearningScrollOffset}>
          <Translate path="directus.page_remotelearning.link_families" />
        </AnchorScroll>
      </NoBulletLi>
    </Flex>
  );
};

export default NavSection;
