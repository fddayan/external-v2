import React from "react";
import { Flex } from "./Boxes";
import { Title, BodyText, Button, Heading, Menu, theme } from "./nessie-web";
import { TranslationType } from "./translation/TranslationContext";
import { uniqueId } from "lodash";
import { ChevronDownIcon } from "@classdojo/web/nessie/icons";
import styled from "@emotion/styled";
const {
  colors: { dt_white, dt_aqua50 },
} = theme;
type FeatureProps = {
  // content props
  title?: string | TranslationType;
  description: string | TranslationType;
  buttonLabel?: string | TranslationType;
  menuItems?: {
    value: string | TranslationType;
    onClick?: () => void;
  }[];
  // display props
  alignContent?: "left" | "center" | "right";
  big?: boolean;
  // button props
  kind?: "primary" | "secondary" | "tertiary";
  href?: string;
  onClick?: () => void;
};

const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  buttonLabel,
  alignContent,
  big,
  menuItems,
  ...buttonProps
}) => {
  const TitleContainer = ({ children }: { children: JSX.Element | string }) =>
    big ? <Title>{children}</Title> : <Heading>{children}</Heading>;
  const spacing = big ? theme.space.l : theme.space.s;
  let flexAlignItems = "center";

  switch (alignContent) {
    case "left":
      flexAlignItems = "flex-start";
      break;
    case "right":
      flexAlignItems = "flex-end";
      break;
  }
  const uniqueIdForDescription = uniqueId("featureLink");

  return (
    <Flex flexDirection="column" height="100%" alignItems={flexAlignItems} textAlign={alignContent}>
      <TitleContainer>{title as string}</TitleContainer>
      <Flex flexGrow={1} marginY={spacing}>
        <BodyText id={uniqueIdForDescription}>{description}</BodyText>
      </Flex>
      {menuItems ? (
        <Menu
          trigger={
            <MenuTrigger>
              <ChevronDownIcon color="white" size={"s"} />
              <span>{buttonLabel}</span>
            </MenuTrigger>
          }
          options={menuItems.map((item) => ({ label: item.value, onClick: item.onClick }))}
          label={buttonLabel}
        />
      ) : (
        buttonLabel && (
          <Button {...buttonProps} aria-describedby={uniqueIdForDescription}>
            {buttonLabel}
          </Button>
        )
      )}
    </Flex>
  );
};

Feature.defaultProps = {
  kind: "primary",
  alignContent: "center",
};

const MenuTrigger = styled("div")`
  color: ${dt_white};
  padding: 19px 24px;
  background-color: ${dt_aqua50};
  display: flex;
  align-items: center;
  border-radius: 30px;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
`;

export default Feature;
