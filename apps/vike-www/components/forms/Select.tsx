import React, { SelectHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { space, SpaceProps } from "styled-system";
import { NewStylesProps, NewInputStyles } from "./NewStylesConstants";

const newStyles = ({ newStyles }: NewStylesProps) => (newStyles ? NewInputStyles : null);

const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement> & SpaceProps & NewStylesProps> = styled("select")`
  display: block;
  width: 100%;
  appearance: none;
  color: #363636;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.9844 17.8C12.5014 17.804 13.0197 17.6087 13.4142 17.2143L20.3439 10.2846C21.1249 9.50357 21.1249 8.23724 20.3439 7.4562C19.5628 6.67515 18.2965 6.67515 17.5154 7.4562L11.9846 12.987L6.45376 7.45618C5.67271 6.67514 4.40638 6.67514 3.62534 7.45618C2.84429 8.23723 2.84429 9.50357 3.62534 10.2846L10.555 17.2143C10.9494 17.6087 11.4675 17.8039 11.9844 17.8Z' fill='%238689b8'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: right 10px center;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  height: 49px;
  padding: 10px 16px;

  font-size: 16px;
  font-weight: 300;
  line-height: 1.33;
  border-radius: 15px;
  margin: 1px;
  &.placeholder {
    color: #999;
  }
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
  ${space}
  ${newStyles}
`;

export default Select;
