import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import { theme } from "@src/components/nessie-web";
import { NessieSpaceSizes } from "@classdojo/web/nessie/components/theme";
import { Flex } from "./Boxes";

const gridSize = 12;

type GridProps = {
  children: ReactNode;
  gapSize?: NessieSpaceSizes | NessieSpaceSizes[];
  columns?: number;
};

export const Grid: React.FC<GridProps> = ({ children, gapSize = "s", columns = gridSize }) => {
  const { space } = theme;

  return (
    <div
      css={css`
        width: 100%;
        display: grid;
        gap: ${typeof gapSize === "string" ? space[gapSize] + "px" : `${space[gapSize[0]]}px ${space[gapSize[1]]}px`};
        grid-template-columns: repeat(${columns}, 1fr);
      `}
    >
      {children}
    </div>
  );
};

type GridItemProps = {
  children: ReactNode;
  colSpan: number[];
};

export const GridItem: React.FC<GridItemProps> = ({ children, colSpan }) => {
  return (
    <Flex
      css={css`
        grid-column: span ${colSpan[0]};
        ${mediaQueries[0]} {
          grid-column: span ${colSpan[1]};
        }
        ${mediaQueries[1]} {
          grid-column: span ${colSpan[2]};
        }
      `}
    >
      {children}
    </Flex>
  );
};
