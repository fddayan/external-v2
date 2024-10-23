import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import { mediaQueriesMax } from "@src/styles/theme";
import { flexGrow } from "styled-system";

const Panel = styled(Flex)`
  border-radius: 20px;
  background: var(--Grape-10, #f5ebff);
  flex-direction: column;
  padding: 38px;
  padding-bottom: 0;
  position: relative;
  align-items: center;
  ${mediaQueriesMax[1]} {
    padding: 24px;
    padding-bottom: 0px;
  }
`;

export const PanelsC_PanelLeftTop = () => {
  const {
    panels_c: { panel_left_top: values },
  } = useDojoGlow();
  return (
    <Panel flex={1} gap={12}>
      <Typography variant={["Display6ExtraBold", "Display4ExtraBold"]}>{values.title}</Typography>
      <Typography variant={["Body3", "Body2"]} css={{ flexGrow: 1 }}>
        {values.text}
      </Typography>
      <GImage img={values.image} alt="" css={{ maxWidth: 300 }} />
    </Panel>
  );
};
