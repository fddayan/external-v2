import React from "react";
import { Flex } from "@src/components/Boxes";
import { theme } from "@src/components/nessie-web";

type Props = {
  size: "xs" | "s" | "m" | "l";
  className?: string;
  height?: string;
  children: React.ReactNode;
};

const tileSizes = {
  xs: {
    borderRadius: theme.space.dt_l,
    padding: theme.space.dt_l,
  },
  s: {
    borderRadius: theme.space.dt_xl,
    padding: theme.space.dt_xl,
  },
  m: {
    borderRadius: 42,
    padding: 50,
  },
  l: {
    borderRadius: theme.space.dt_xxl,
    padding: 70,
  },
};

const Tile: React.FC<Props> = ({ children, size, height, ...otherProps }) => {
  return (
    <Flex
      {...otherProps}
      marginBottom="6px"
      padding={[24, tileSizes[size].padding]}
      borderRadius={[24, tileSizes[size].borderRadius]}
      border={theme.borders.dt_border_card}
      backgroundColor={theme.colors.dt_white}
      boxShadow={theme.shadows.dt_shadow_shadezies}
      flexDirection="column"
      flexGrow={1}
      alignItems="center"
      width="100%"
      height={height}
    >
      {children}
    </Flex>
  );
};

Tile.defaultProps = {
  size: "m",
};

export default Tile;
