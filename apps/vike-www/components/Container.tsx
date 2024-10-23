import React from "react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

type StyledContainerProps = LayoutProps &
  SpaceProps & {
    id?: string;
    className?: string;
    as?: string;
  };

const StyledContainer = styled("div", { shouldForwardProp })<StyledContainerProps>`
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;

  ${layout}
  ${space}
`;

const Container: React.FC<StyledContainerProps> = ({ children, className, ...props }) => (
  <StyledContainer className={className} width={["100%", 750, 970, 1170]} px={15} {...(props as LayoutProps)}>
    {children}
  </StyledContainer>
);

export default Container;
