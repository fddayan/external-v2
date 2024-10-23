import React, { ComponentProps } from "react";
import styled from "@emotion/styled";
import { margin, MarginProps, typography, TypographyProps } from "styled-system";

type WrapperProps = MarginProps & TypographyProps;
type InputProps = ComponentProps<"input">;
export type CheckboxProps = WrapperProps & InputProps;

const Checkbox: React.FC<CheckboxProps> = ({ children, name, ...props }) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput id={name} type="checkbox" {...props} />
      <CheckboxLabel htmlFor={name}>{children}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled("div")<MarginProps>(
  {
    position: "relative",
    display: "inline-block",
    width: "100%",
  },
  margin,
  typography,
);

const CheckboxInput = styled("input")`
  position: absolute;
  font-size: 2rem;
  margin: 4px 0 0;
  line-height: normal;
`;

const CheckboxLabel = styled("label")`
  margin-left: 1rem;
  font-weight: 400;
  font-size: 14px;
  color: #9e9e9e;
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  padding-left: 6px;
`;

export default Checkbox;
