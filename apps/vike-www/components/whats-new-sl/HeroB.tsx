import React from "react";
import { useWhatsNewSL } from "./context";
import { HideMobile } from "./styles";
import { GImage } from "../GImage";
import Translate from "@src/components/translation/Translate";
import { Flex } from "../Boxes";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

const Heading = styled.h2`
  // color: ${(props) => props.theme.__new.colors.contentPrimary};
  color: #2c2a50;
  font-feature-settings: "clig" off, "liga" off;
  font-family: DojoDisplay !important;
  font-size: 72px;
  font-style: normal;
  font-weight: 800;
  line-height: 76px; /* 105.556% */
  letter-spacing: -1px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    /* Marketing/Display/Display 4 Extrabold */
    font-size: 35px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
    text-align: center;
  }
`;

const SubText = styled.div`
  //color: ${(props) => props.theme.__new.colors.contentPrimary};
  color: #2c2a50;
  font-family: "DojoText";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 32.137px; /* 123.605% */
  letter-spacing: -0.26px;
  ${mediaQueriesMax[1]} {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 21.6px */
    letter-spacing: -0.15px;
    text-align: center;
  }
`;

export const HeroB = () => {
  const {
    images: { playingInClass },
  } = useWhatsNewSL();

  return (
    <Flex flexDirection={["column", "column", "row"]} justifyContent="center" alignItems="center" css={{ gap: 60 }}>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems={["center", "flex-start", "flex-start"]}
        css={{ gap: 30, flex: "1 0 0" }}
      >
        <Heading>
          <Translate path="directus.page_whats_new_2024_sl.headline_2" />
        </Heading>
        <SubText>
          <Translate path="directus.page_whats_new_2024_sl.text" />
        </SubText>
      </Flex>
      <HideMobile>
        <GImage img={playingInClass} alt="playing in card" css={{ maxWidth: 500, borderRadius: 14, flex: "1 0 0" }} />
      </HideMobile>
    </Flex>
  );
};
