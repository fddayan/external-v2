import React, { ReactNode } from "react";
import { Flex } from "@src/components/Boxes";

export const PanelsB = ({ children }: { children: ReactNode }) => {
  return (
    <Flex flexDirection={["column", "row", "row"]} gap={60}>
      {children}
    </Flex>
  );
};
