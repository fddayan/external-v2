import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, LinkHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { css } from "@emotion/react";

type ButtonVariantProps = {
  big?: boolean;
  xl?: boolean;
  square?: boolean;
  disabled?: boolean;
  outline?: boolean;
  signup?: boolean;
  block?: boolean;
  gray?: boolean;
};
type StyledButtonProps = (ButtonHTMLAttributes<any> | LinkHTMLAttributes<any> | AnchorHTMLAttributes<any>) &
  LayoutProps &
  SpaceProps &
  ButtonVariantProps & {
    to?: string;
    as?: ElementType<any> | undefined;
    big?: boolean;
    type?: "button" | "submit" | "reset";
  };

const variant = ({ big, xl, square, disabled, outline, signup, block, gray }: ButtonVariantProps) => {
  const allStyles = [];
  if (big) {
    allStyles.push(css`
      padding: 10px 32px;
      font-size: 20px;
      line-height: 1.33;
      border-radius: 30px;
    `);
  }
  if (xl) {
    allStyles.push(css`
      padding: 18px 52px;
      font-size: 20px;
      border-radius: 30px;
      line-height: 24px;
    `);
  }
  if (square) {
    allStyles.push(css`
      border-radius: 5px;
    `);
  } else {
    allStyles.push(css`
      border-radius: 30px;
    `);
  }

  if (disabled) {
    allStyles.push(css`
      background-color: #b4b4b4;
      border-color: #b4b4b4;
      &:hover,
      &:focus {
        background-color: #b4b4b4;
        border-color: #b4b4b4;
        cursor: default;
      }
    `);
  }

  if (outline) {
    allStyles.push(css`
      border: 1px solid #00aeef;
      background: #fff;
      border-color: #00aeef;
      color: #00aeef;

      &:hover,
      &:focus {
        background: #00aeef;
        color: #fff;
      }
    `);
  }

  if (signup) {
    allStyles.push(css`
      border: 2px solid #00aeef;
      color: #00aeef;
      background-color: #fff;

      &:hover,
      &:focus {
        border-color: #23c3ff;
        background-color: #fff;
        color: #23c3ff;
      }
    `);
  }

  if (gray) {
    allStyles.push(css`
      border: 2px solid #ccc;
      color: #777;
      background-color: #fff;

      &:hover,
      &:focus {
        color: #777;
        background-color: #e6e6e6;
        border-color: #adadad;
      }
    `);
  }

  if (block) {
    allStyles.push(css`
      display: inline-block;
      width: 100%;
    `);
  }
  return css(allStyles);
};

const StyledButton: React.FC<StyledButtonProps> = styled.button`
  display: inline-block;
  position: relative;

  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.5;

  font-size: 16px;
  /* height: 36px; */

  box-sizing: border-box;

  color: white;
  background-color: #00aeef;

  padding: 5px 18px 5px 18px;

  font-weight: 600;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;

  user-select: none;

  &:hover {
    background-color: #24c4ff;
    border-color: #24c4ff;
    text-decoration: none;
  }

  &:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    text-decoration: none;
  }

  ${layout}
  ${space}
  ${variant}
`;

const Button: React.FC<StyledButtonProps> = ({ children, className, ...props }) => (
  <StyledButton className={className} {...props}>
    {children}
  </StyledButton>
);

export default Button;
