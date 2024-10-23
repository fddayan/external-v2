import styled from "@emotion/styled";
import Link from "@src/components/UTMLink";

export const HeaderHTMLA = styled("a")`
  background: none;
  border: none;
  text-decoration: none;
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const HeaderGatsbyLink = HeaderHTMLA.withComponent(Link);
export const HeaderButton = HeaderHTMLA.withComponent("button");
