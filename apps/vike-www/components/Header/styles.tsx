import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import Container from "../Container";

export const Nav = styled("nav")<{ unpinHeader: boolean }>`
  border-bottom: 1px solid;
  border-color: ${theme.colors.dt_taro30};
  position: ${(p) => (p.unpinHeader ? "absolute" : "fixed")};
  background-color: ${theme.colors.dt_white};
  right: 0;
  left: 0;
  top: 0;
  z-index: 1000;
  flex: 0 0 auto;
  @media print {
    display: none;
  }
`;

export const HeaderContainer = styled(Container)`
  position: relative;
  display: grid;
  grid-template-columns: auto min-content;
  height: 88px;
  align-items: center;
  justify-items: start;
  z-index: 1010;
  @media print {
    display: none;
  }
`;

export const Logo = styled("img")`
  width: 176px;
  z-index: 1;
  position: relative;
  box-shadow: 0px 0px 20px #ffffff;
  display: block;
`;
