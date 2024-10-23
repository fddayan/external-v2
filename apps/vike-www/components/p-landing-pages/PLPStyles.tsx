import React from "react";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

export const IconImage = styled(GatsbyImage)`
  max-width: 80%;
  margin-bottom: -20px;
  ${mediaQueries[0]} {
    max-width: 400px;
  }
`;

export const DojoTextParagraph = styled("p")`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 500;
`;
export const DojoTextHeading = styled("h3")`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
`;

export const DojoTextDisplay = styled("h1")`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 0;
`;

export const DojoTextRegular = styled("p")`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 27px;
  margin-bottom: 0;
`;

export const DojoTextBold = styled("p")`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 27px;
  font-weight: 700;
  margin-bottom: 0;
`;

export const DojoGreyedOut = styled("p")`
  font-family: DojoText, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0;
  opacity: 0.5;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;
  align-items: center;
  justify-items: center;
  ${mediaQueries[0]} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const SquiglyLine = () => (
  <svg width="178" height="13" viewBox="0 0 178 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 10.5C9.90864 10.5 9.90864 2.46923 17.8173 2.46923C25.7259 2.46923 25.7259 10.5 33.6345 10.5C41.5432 10.5 41.5432 2.46923 49.4468 2.46923C57.3504 2.46923 57.3554 10.5 65.2641 10.5C73.1727 10.5 73.1727 2.46923 81.0813 2.46923C88.99 2.46923 88.99 10.5 96.8986 10.5C104.807 10.5 104.807 2.46923 112.711 2.46923C120.614 2.46923 120.625 10.5 128.533 10.5C136.442 10.5 136.442 2.46923 144.355 2.46923C152.269 2.46923 152.264 10.5 160.178 10.5C168.091 10.5 168.091 2.46923 176 2.46923"
      stroke="black"
      stroke-width="4"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
  </svg>
);
