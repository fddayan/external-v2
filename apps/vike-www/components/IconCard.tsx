import Feature from "@src/components/Feature";
import { Space } from "@src/components/nessie-web";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { Box, Flex } from "./Boxes";
import Tile from "./Tile";
import { TranslationType } from "./translation/TranslationContext";

type IconCardPropType = {
  icon?: FixedObject | string;
  iconOffset?: boolean;
  title?: string | TranslationType;
  description: string | TranslationType;
  buttonLabel?: string | TranslationType;
  menuItems?: {
    value: string | TranslationType;
    onClick?: () => void;
  }[];
  kind?: "primary" | "secondary" | "tertiary";
  href?: string;
  onClick?: () => void;
};

const IconContainer = ({ img, isAbsolute }: { img: string | FixedObject | FixedObject[]; isAbsolute?: boolean }) => (
  <Box
    position={isAbsolute ? "absolute" : "static"}
    maxWidth="80px"
    margin="auto"
    top="-70px"
    left="50%"
    style={isAbsolute ? { transform: "translateX(-50%)" } : {}}
  >
    {typeof img === "string" ? <img src={img} alt="feature icon" /> : <GatsbyImage image={img} />}
  </Box>
);

const IconCard: React.FC<IconCardPropType> = ({
  icon,
  iconOffset,
  title,
  description,
  buttonLabel,
  children,
  menuItems,
  ...buttonProps
}) => {
  const featureProps = {
    title,
    description,
    buttonLabel,
    menuItems,
    ...buttonProps,
  };
  return (
    <Tile size="s">
      {children ? (
        children
      ) : (
        <Flex flexDirection="column" height="100%" position="relative" alignItems="center">
          <IconContainer img={icon ?? ""} isAbsolute={iconOffset} />
          {iconOffset && <Space size="l" />}
          <Feature {...featureProps} />
        </Flex>
      )}
    </Tile>
  );
};

IconCard.defaultProps = { kind: "primary" };

export default IconCard;
