import React from "react";
import { Box } from "@src/components/Boxes";

type SeparatorProps = {
  margin: string;
  background_color: string;
};
const Separator: React.FC<SeparatorProps> = ({ margin, background_color = "#ffffff" }) => {
  return <Box width="100%" marginTop={margin.split(",")} backgroundColor={background_color} />;
};

export default Separator;
