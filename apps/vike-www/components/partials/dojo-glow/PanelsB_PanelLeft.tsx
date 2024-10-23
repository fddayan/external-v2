import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";

const Panel = styled(Flex)`
  flex: 1;
  flex-direction: column;
  border-radius: 20px;
  background: var(--Grape-10, #f5ebff);
  padding: ${(p) => p.theme.__new.spacing[30]};
  justify-content: center;
  align-items: center;
`;

export const PanelsB_PanelLeft = () => {
  const {
    panels_b: { panel_left: values },
  } = useDojoGlow();
  return (
    <Flex flex={1} alignSelf="center">
      <Panel>
        <Flex flexDirection="column" gap={24} pb={60}>
          <Typography variant={["Display5ExtraBold", "Display4ExtraBold", "Display4ExtraBold"]}>
            {values.title}
          </Typography>
          <Typography variant="Body2">{values.text}</Typography>
        </Flex>
        <GImage img={values.image} alt="" css={{ height: 410 }} />
      </Panel>
    </Flex>
  );
};
