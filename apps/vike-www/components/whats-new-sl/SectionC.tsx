import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import React from "react";
import { Flex } from "../Boxes";
import Translate from "@src/components/translation/Translate";
import { useWhatsNewSL } from "./context";
import { Panel, FlexContainer, PanelHeading, PanelParagraph, TryItOut } from "./styles";
import { GImage } from "../GImage";

const PanelLeft = styled(Panel)`
  background: ${(props) => props.theme.__new.colors.ocean10};
`;

const PanelRight = styled(Panel)`
  background: ${(props) => props.theme.__new.colors.frog10};
  ${mediaQueries[0]} {
    margin-top: 80px;
  }
`;

export const SectionC = () => {
  const {
    images: { schoolSwitcher },
  } = useWhatsNewSL();
  return (
    <FlexContainer>
      <PanelLeft flex={1} css={{ paddingBottom: "0 !important" }}>
        <PanelHeading>
          <Translate path="directus.page_whats_new_2024_sl.hero_d_panel_left_title" />
        </PanelHeading>
        <PanelParagraph>
          <Translate path="directus.page_whats_new_2024_sl.hero_d_panel_left_text" />
        </PanelParagraph>
        <TryItOut href="https://teach.classdojo.com/" color="#1A192D" />
        <img
          src="https://static.classdojo.com/uploads/7a630447-61af-49d5-86c2-555889d6492d.png"
          alt=""
          css={{ width: "100%", maxWidth: "380px", marginInline: "auto" }}
        />
      </PanelLeft>
      <PanelRight flex={1}>
        <PanelHeading>
          <Translate path="directus.page_whats_new_2024_sl.hero_d_panel_right_title" />
        </PanelHeading>
        <PanelParagraph>
          <Translate path="directus.page_whats_new_2024_sl.hero_d_panel_right_text" />
        </PanelParagraph>
        <GImage img={schoolSwitcher} alt="banner" css={{ width: 316, marginInline: "auto" }} />
      </PanelRight>
    </FlexContainer>
  );
};
