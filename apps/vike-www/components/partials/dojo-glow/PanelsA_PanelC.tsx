import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { buildEventLog, ButtonPrimary } from "./styles";
import { ShareButton } from "./ShareButton";

const Panel = styled(Flex)`
  border-radius: var(--24, 24px);
  background: var(--Palette-GRAPE-1O, #f6f2ff);
  padding: ${(p) => p.theme.__new.spacing[30]};
  padding-bottom: 0;
  position: relative;
`;

interface PanelsA_PanelCProps {
  language: string;
  slug: string;
}

export const PanelsA_PanelC = ({ language, slug }: PanelsA_PanelCProps) => {
  const {
    panels_a: { panel_left: values },
  } = useDojoGlow();
  return (
    <Flex flexDirection="column" gap={12} justifyContent="center" alignItems="center" css={{ gridArea: "c" }}>
      <Typography variant="Body1">{values.helper_text}</Typography>
      <ShareButton
        label={values.cta_primary_text}
        language={language}
        slug={slug}
        url={values.share_url}
        eventName="new_ways_to_reach"
      />
    </Flex>
  );
};
