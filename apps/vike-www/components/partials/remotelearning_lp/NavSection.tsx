import React from "react";
import { Flex } from "@src/components/Boxes";
import { AnchorScroll, scrollWithOffset } from "@src/components/AnchorScroll";
import Translate from "@src/components/translation/Translate";

const remoteLearningScrollOffset = 100;

const NavSection: React.FC = () => {
  return (
    <Flex
      as="section"
      flexDirection={["column", "row"]}
      justifyContent="center"
      alignItems="center"
      paddingTop={["10px", "20px"]}
      paddingBottom={["10px", "20px"]}
    >
      <AnchorScroll href="#teachers" customOffset={remoteLearningScrollOffset}>
        <Translate path="directus.page_remotelearning.link_teachers" />
      </AnchorScroll>
      <AnchorScroll href="#leaders" customOffset={remoteLearningScrollOffset}>
        <Translate path="directus.page_remotelearning.link_schools" />
      </AnchorScroll>
      <AnchorScroll href="#parents" customOffset={remoteLearningScrollOffset}>
        <Translate path="directus.page_remotelearning.link_families" />
      </AnchorScroll>
    </Flex>
  );
};

export default NavSection;
