import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import theme from "@src/styles/theme-v2";
import { alignSelf } from "styled-system";

const Panel = styled(Flex)`
  border-radius: var(--24, 24px);
  background: var(--Palette-BLUEBERRY-10, #e8f5ff);
  padding: ${(p) => p.theme.__new.spacing[30]};
  padding-bottom: 0;
  gap: 24px;
`;

export const PanelsA_PanelRight = () => {
  const {
    panels_a: { panel_right: values },
  } = useDojoGlow();
  return (
    <Flex flexDirection="column" flex={1} css={{ gridArea: "b", alignSelf: "center" }}>
      <Panel flexDirection="column" alignItems="center" css={{ color: theme.colors.contentPrimary }}>
        <Typography variant={["Display5ExtraBold", "Display4ExtraBold", "Display4ExtraBold"]}>
          {values.title}
        </Typography>
        <Typography variant={["Body3", "Body2", "Body2"]}>{values.text}</Typography>
        <GImage img={values.image} alt="" />
      </Panel>
    </Flex>
  );
};
