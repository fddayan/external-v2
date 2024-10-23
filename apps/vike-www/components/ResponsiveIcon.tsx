import * as React from "react";
import styled from "@emotion/styled";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";

const SelectorBadgeImg = styled(GatsbyImage)`
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
`;
SelectorBadgeImg.defaultProps = { loading: "eager" };

const ResponsiveIcon = ({ ...props }: GatsbyImageProps) => {
  return (
    <SelectorBadgeImg
      {...props}
      imgStyle={{
        objectFit: "contain",
      }}
      style={{ width: "72px", height: "72px" }}
    />
  );
};

export default ResponsiveIcon;
