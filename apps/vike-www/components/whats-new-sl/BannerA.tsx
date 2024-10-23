import React from "react";
import { useWhatsNewSL } from "./context";
import { GImage } from "../GImage";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled";
import { Flex } from "../Boxes";
import { mediaQueriesMax } from "@src/styles/theme";

const Banner = styled(Flex)`
  border-radius: 24px;
  background: #2c2a50;
  flex-direction: row;
  position: relative;
  ${mediaQueriesMax[1]} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const Heading = styled.h3`
  color: #fff;
  font-family: DojoDisplay !important;
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 50px; /* 104.167% */
  letter-spacing: -0.48px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    /* Marketing/Display/Display 4 Extrabold */
    font-size: 35px;
    font-style: normal;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

const SubText = styled.p`
  color: #fff;
  font-family: "DojoText";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
  margin: 0;
`;

export const BannerA = () => {
  const {
    images: { mobile: mobileImg },
  } = useWhatsNewSL();
  return (
    <Banner>
      <Flex
        flexDirection="column"
        padding={[30, 30, 42]}
        flex={1}
        justifyContent="center"
        maxWidth={600}
        css={{ gap: 24 }}
      >
        <Heading>
          <Translate path="directus.page_whats_new_2024_sl.banner_headline" />
        </Heading>
        <SubText>
          <Translate path="directus.page_whats_new_2024_sl.banner_text" />
        </SubText>
      </Flex>
      <GImage
        img={mobileImg}
        alt="banner"
        css={{ width: 385, flex: 1, display: "block" }}
      />
    </Banner>
  );
};
