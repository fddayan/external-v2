import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { buildEventLog, ButtonPrimary } from "./styles";

const Panel = styled(Flex)`
  flex: 1;
  flex-direction: column;
  border-radius: 20px;
  background: var(--Sky-10, #ebf9ff);
  padding: ${(p) => p.theme.__new.spacing[30]};
  justify-content: center;
  align-items: center;
`;

export const PanelsB_PanelRight = () => {
  const {
    panels_b: { panel_right: values },
  } = useDojoGlow();
  return (
    <Flex flex={1} flexDirection="column" gap={30}>
      <Panel>
        <Flex flex={1} flexDirection="column" alignItems="center" gap={24}>
          <Typography variant={["Display5ExtraBold", "Display4ExtraBold", "Display4ExtraBold"]}>
            {values.title}
          </Typography>
          <Typography variant="Body2">{values.text}</Typography>
          <GImage img={values.image} alt="" css={{ paddingBlock: 30 }} />
        </Flex>
      </Panel>
      <Flex alignSelf={["center", "flex-start"]}>
        <ButtonPrimary
          href="https://teach.classdojo.com/#/sidekick"
          variant="primary"
          eventLog={buildEventLog("sidekick.cta_secondary")}
        >
          Try it now
        </ButtonPrimary>
      </Flex>
    </Flex>
  );
};
