import React from "react";
import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

type ButtonContainerProps = {
  active?: boolean;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0;
  background: transparent;
  border-radius: 5px;
  box-sizing: content-box;
  cursor: pointer;
  padding: 9px 10px;
  margin-left: auto;
  box-shadow: 0px 0px 20px #fff;
  position: relative;
  z-index: 1;
  ${(props) => ({ backgroundColor: props.active ? theme.colors.dt_taro30 : "transparent" })}
  ${mediaQueries[2]} {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  background-color: ${theme.colors.dt_taro60};
`;

type BurgerButtonProps = ButtonContainerProps & {
  onClick: () => void;
  backgroundVisible?: boolean;
  ml?: string;
  display?: (string | null)[];
};

const BurgerButton: React.FC<BurgerButtonProps> = (props) => {
  return (
    <ButtonContainer {...props} aria-label="Menu">
      <Line />
      <Line />
      <Line />
    </ButtonContainer>
  );
};

export default BurgerButton;
