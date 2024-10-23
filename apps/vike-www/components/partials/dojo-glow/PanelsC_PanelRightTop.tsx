import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { mediaQueriesMax } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";

const Panel = styled(Flex)`
  border-radius: 20px;
  // background: var(--Grape-10, yellow);
  flex-direction: column;
  padding: 38px;
  padding-bottom: 0;
  height: 600px;
  transform: translateY(60px);
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  gap: 12px;
  ${mediaQueriesMax[1]} {
    padding: 24px;
    transform: none;
  }
`;

export const PanelsC_PanelRightTop = () => {
  const {
    panels_c: { panel_right_top: values },
  } = useDojoGlow();
  return (
    <Panel css={{ backgroundImage: `url(${values.image.publicURL})` }}>
      <Typography variant={["Display6ExtraBold", "Display4ExtraBold"]}>{values.title}</Typography>
      <Typography variant={["Body3", "Body2"]}>{values.text}</Typography>
      {/* <GImage img={values.image} alt="xxx" /> */}
    </Panel>
  );
};
