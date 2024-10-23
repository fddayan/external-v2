import React from "react";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  background: white;
  margin: 40px auto;
  padding: 10px 20px;
  width: 100%;
  position: relative;
  max-width: 440px;
`;

const Container = ({ children }: { children: JSX.Element }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
