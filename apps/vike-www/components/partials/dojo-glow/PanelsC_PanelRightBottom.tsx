import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { mediaQueriesMax } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";

const Panel = styled(Flex)`
  border-radius: 20px;
  background: var(--Grape-10, #f1f3f8);
  flex-direction: column;
  padding: 38px;
  align-items: center;
  padding-bottom: 0;
  transform: translateY(60px);
  gap: 12px;
  ${mediaQueriesMax[1]} {
    padding: 24px;
    padding-bottom: 0px;
    transform: none;
  }
`;

export const PanelsC_PanelRightBottom = () => {
  const {
    panels_c: { panel_right_bottom: values },
  } = useDojoGlow();
  return (
    <Panel>
      <Typography variant={["Display6ExtraBold", "Display4ExtraBold"]} css={{ width: "100%" }}>
        {values.title}
      </Typography>
      <Typography variant={["Body3", "Body2"]} css={{ flexGrow: 1, width: "100%" }}>
        {values.text}
      </Typography>
      <GImage img={values.image} alt="" css={{ maxWidth: 330 }} />
    </Panel>
  );
};
