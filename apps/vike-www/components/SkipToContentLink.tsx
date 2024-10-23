import React from "react";
import styled from "@emotion/styled";

const StyledLink = styled.a`
  position: absolute;
  left: -10000px;
  &:focus {
    position: fixed;
    left: 100px;
    z-index: 10000;
    color: black;
  }
`;

const SkipToContentLink = () => {
  return (
    <StyledLink href="#page-content" ref={null} tabIndex={0}>
      Skip content
    </StyledLink>
  );
};

export default SkipToContentLink;
