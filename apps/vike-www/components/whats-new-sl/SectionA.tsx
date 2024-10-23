import React from "react";
import { useWhatsNewSL } from "./context";
import { Panel, FlexContainer, PanelHeading, PanelParagraph } from "./styles";
import { GImage } from "../GImage";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const PanelLeft = styled(Panel)`
  background: ${(props) => props.theme.__new.colors.grape10};
`;

const PanelRight = styled(Panel)`
  background: ${(props) => props.theme.__new.colors.ocean10};
  ${mediaQueries[0]} {
    margin-top: 80px;
  }
`;

export const SectionA = () => {
  const {
    images: { trending, points },
  } = useWhatsNewSL();
  return (
    <FlexContainer>
      <PanelLeft flex={1}>
        <PanelHeading>
          <Translate path="directus.page_whats_new_2024_sl.panel_left_title" />
        </PanelHeading>
        <PanelParagraph>
          <Translate path="directus.page_whats_new_2024_sl.pnale_left_text" />
        </PanelParagraph>
        <GImage img={trending} alt="banner" css={{ width: 387, margin: "auto" }} />
      </PanelLeft>
      <PanelRight flex={1}>
        <PanelHeading>
          <Translate path="directus.page_whats_new_2024_sl.panel_right_title" />
        </PanelHeading>
        <PanelParagraph>
          <Translate path="directus.page_whats_new_2024_sl.panel_right_text" />
        </PanelParagraph>
        <GImage img={points} alt="banner" css={{ width: 216, margin: "auto" }} />
      </PanelRight>
    </FlexContainer>
  );
};
