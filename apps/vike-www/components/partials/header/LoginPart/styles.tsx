import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

export const HeaderHTMLButton = styled("button")`
  background: none;
  border: none;
  text-decoration: none;
  padding: 10px 15px;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const LinkText = styled("span")`
  color: ${theme.colors.dt_taro90};
  font-weight: 500;
  line-height: 22px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.dt_aqua50};
    text-decoration: none;
  }
`;

export const LoggedInText = styled.span`
  color: ${theme.colors.dt_aqua50};
  font-weight: 600;
  line-height: 22px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.dt_aqua60};
    text-decoration: none;
  }
`;

export const NoBulletLi = styled.li`
  list-style-type: none;
`;
