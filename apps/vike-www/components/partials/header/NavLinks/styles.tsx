import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

export const NavLinksContainer = styled.ul<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: ${theme.space.m}px 0;
  margin-bottom: 0;
  overflow: hidden;
  position: fixed;
  top: 88px;
  left: 0;
  transform: ${(props) => (props.active ? "translateY(0)" : "translateY(calc(-100% - 88px))")};
  transition: all 0.3s ease-in-out;
  background: ${theme.colors.dt_white};
  border-bottom: 1px solid;
  border-color: ${theme.colors.dt_taro30};
  ${mediaQueries[2]} {
    flex-direction: row;
    width: auto;
    padding: 0;
    opacity: 1;
    position: static;
    transform: translateY(0);
    border-bottom: 0;
    overflow: visible;
  }
  ${mediaQueriesMax[2]} {
    animation: entering 0.5s;
    opacity: ${(props) => (props.active ? "1" : "0")};
    & > * {
      display: ${(props) => (props.active ? "" : "none")};
    }
  }
  @media print {
    display: none;
  }
  @keyframes entering {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const LinkText = styled("span")`
  color: ${theme.colors.dt_taro90};
  font-weight: 500;
  line-height: 22px;
  font-family: "DojoText", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.dt_aqua50};
    text-decoration: none;
  }
`;
