import React, { useRef, useState, LegacyRef } from "react";
import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { Flex } from "./Boxes";
import useClickOutside from "@src/utils/useClickOutside";

const DropdownMenu = styled("ul")`
  display: block;
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 160px;
  padding: 10px 0;
  margin: 2px 0 0;
  background-color: ${theme.colors.white};
  border: 2px solid;
  border-color: ${theme.colors.taro30};
  border-radius: 30px;
  list-style: none;
  box-shadow: 0 6px 0 ${theme.colors.taro30};
  z-index: 1000;
  overflow: hidden;
`;

const DropDownItem = styled("li")`
  cursor: pointer;
  & > * {
    fontweight: 600;
    fontsize: 18px;
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: ${theme.colors.taro90};
    white-space: nowrap;
  }

  & > *:hover {
    text-decoration: none;
    background-color: ${theme.colors.taro10};
    outline: 0;
  }
`;

const DropDown = ({
  children,
  Trigger,
}: {
  children: JSX.Element[];
  Trigger: React.FC<{ "aria-expanded": boolean; onClick: () => void }>;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLUListElement | null | undefined>();
  useClickOutside(ref, () => setOpen(false));

  return (
    <Flex position="relative">
      <Trigger aria-expanded={open} onClick={() => setOpen(!open)} />
      {open && <DropdownMenu ref={(newRef) => (ref.current = newRef)}>{children}</DropdownMenu>}
    </Flex>
  );
};

export { DropDownItem, DropDown };
