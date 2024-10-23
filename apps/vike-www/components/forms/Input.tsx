import React, { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { space, SpaceProps } from "styled-system";
import { css } from "@emotion/react";
import { NewStylesProps, NewInputStyles } from "./NewStylesConstants";

interface VariantProps {
  success?: boolean;
  error?: boolean;
  rounded?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, SpaceProps, VariantProps, NewStylesProps {}

const variants = ({ success, error, rounded }: VariantProps) => {
  const all = [];
  if (success) {
    all.push(css`
      border-color: #3c763d;
      &:focus {
        border-color: #3c763d;
      }
    `);
  }
  if (error) {
    all.push(css`
      border-color: #a94442;
      &:focus {
        border-color: #a94442;
      }
    `);
  }
  if (rounded) {
    all.push(css`
      border-radius: 15px;
    `);
  }
  return css(all);
};

const newStyles = ({ newStyles }: NewStylesProps) => (newStyles ? NewInputStyles : null);

const Input: React.FC<InputProps> = styled("input")`
  display: block;
  width: 100%;
  color: #363636;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  height: 49px;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.33;
  border-radius: 5px;
  margin: 1px;
  &::placeholder {
    color: #999;
  }
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
  ${space}
  ${variants}
  ${newStyles}
`;

Input.defaultProps = {
  type: "text",
  autoCorrect: "off",
  autoCapitalize: "off",
  spellCheck: "false",
  newStyles: false,
};

export default Input;
