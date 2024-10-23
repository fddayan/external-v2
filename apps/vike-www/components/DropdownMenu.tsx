import React from "react";
import { Box } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { theme } from "@classdojo/web/nessie";

const DropdownContainer = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Box position="relative">{children}</Box>
);

const DropdownButton = ({ children, handleClick }: { children: JSX.Element; handleClick: () => void }) => (
  <Box onClick={() => handleClick()}>{children}</Box>
);

const DropdownItems = ({ children, show }: { children: JSX.Element | JSX.Element[]; show: boolean }) => (
  <Box
    display={show ? "block" : "none"}
    border="2px solid"
    borderColor={theme.colors.taro30}
    borderRadius="12px"
    position="absolute"
    backgroundColor={theme.colors.white}
    padding="18px"
    style={{
      transform: "translateY(-6px)",
    }}
    zIndex={999}
  >
    {children}
  </Box>
);

const DropdownLabel = ({ children }: { children: JSX.Element | string | null }) => (
  <Text marginBottom="0" fontWeight="600" color={theme.colors.taro90}>
    {children}
  </Text>
);

const DropdownItem = ({ label, href, handleClick }: { label: string; href: string; handleClick?: () => void }) => {
  const labelStyle = { whiteSpace: "nowrap" } as const;
  return href ? (
    <a href={href} style={labelStyle}>
      <DropdownLabel>{label}</DropdownLabel>
    </a>
  ) : (
    <Box onClick={() => handleClick?.()} style={labelStyle}>
      <DropdownLabel>{label}</DropdownLabel>
    </Box>
  );
};

const DropdownMenu = ({
  trigger,
  items,
}: {
  trigger: JSX.Element;
  items: { label: string; href: string; handleClick?: () => void }[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContainer>
      <DropdownButton handleClick={toggleDropdown}>{trigger}</DropdownButton>
      <DropdownItems show={isOpen}>
        {items.map((item, index) => (
          <DropdownItem label={item.label} href={item.href} handleClick={item.handleClick} key={index} />
        ))}
      </DropdownItems>
    </DropdownContainer>
  );
};

export default DropdownMenu;
