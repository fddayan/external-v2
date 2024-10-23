import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";

const Panel = styled(Flex)`
  border-radius: var(--24, 24px);
  background: var(--Palette-GRAPE-1O, #f6f2ff);
  padding: ${(p) => p.theme.__new.spacing[30]};
  padding-bottom: 0;
  position: relative;
`;

export const PanelsA_PanelLeft = () => {
  const {
    panels_a: { panel_left: values },
  } = useDojoGlow();
  return (
    <Flex flexDirection="column" gap={24} flex={1} css={{ gridArea: "a" }}>
      <Panel flexDirection="column" flex={1}>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" gap={24}>
          <Typography variant={["Display5ExtraBold", "Display4ExtraBold", "Display4ExtraBold"]}>
            {values.title}
          </Typography>
          <Typography variant={["Body3", "Body2", "Body2"]}>{values.text}</Typography>
          <GImage img={values.image} alt="" css={{}} />
        </Flex>
      </Panel>
    </Flex>
  );
};
