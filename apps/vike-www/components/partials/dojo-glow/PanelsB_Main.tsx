import React from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";

export const PanelsB_Main = () => {
  const {
    panels_b: { main: values },
  } = useDojoGlow();
  return <Typography variant="Body1">{values.cta_primary_text}</Typography>;
};
