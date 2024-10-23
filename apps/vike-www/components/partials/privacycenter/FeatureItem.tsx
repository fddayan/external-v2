import React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { css } from "@emotion/react";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const ItemWrapper = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
`;
ItemWrapper.defaultProps = { width: ["100%", 1 / 3] };

const ItemBox = styled(Flex)`
  position: relative;
  border-radius: 5px;
  padding: 0 10px 0;
  width: 100%;
  margin-bottom: 30px;
  max-width: 292px;
  margin-left: auto;
  margin-right: auto;

  a {
    display: inline;
    text-align: left;
    /* width: 100%; */
    font-weight: 600;
    color: #00bcf2;
    text-decoration: none;
    cursor: pointer;
    &:hover,
    &:focus {
      text-decoration: none;
      color: #00a8d9;
    }
    padding-left: 2px;
    padding-right: 2px;
  }
`;

ItemBox.defaultProps = { flexDirection: "column", alignItems: "center" };

const ItemBoxImg = styled(GatsbyImageWrapper)`
  margin: 0 auto;
`;

const ItemBoxHeader = styled("h3")`
  color: #363636;
  font-size: 21px;
  line-height: 24px;
  font-weight: 800;
  margin-top: 22px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

const FeatureItem = ({ image, header, text, ...props }) => {
  return (
    <ItemWrapper {...props}>
      <ItemBox>
        <ItemBoxImg image={image} />
        <ItemBoxHeader>{header}</ItemBoxHeader>
        <Text textAlign="left" lineHeight={4} fontSize={2}>
          {text}
        </Text>
      </ItemBox>
    </ItemWrapper>
  );
};

export default FeatureItem;
