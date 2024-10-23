import styled from "@emotion/styled";
import { display, DisplayProps, layout, LayoutProps, space, SpaceProps } from "styled-system";
import React from "react";

type SpacerProps = SpaceProps & DisplayProps & LayoutProps;

const Spacer: React.FC<SpacerProps> = styled.div`
  ${display};
  ${space};
  ${layout};
`;
//prevent margin collapsing
// Spacer.defaultProps = { display: 'inline-block' }

export default Spacer;
