import { css } from "@emotion/react";

export interface NewStylesProps {
  newStyles?: boolean;
}

export const NewInputStyles = css`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 72px;
  border: 2px solid rgba(0, 0, 0, 0.12);
  background: rgba(241, 243, 248, 0.24);
  box-shadow: none;
  &:focus {
    border-radius: 72px;
    border: 2px solid #884dff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
`;

export const NewTextStyles = css`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
`;
