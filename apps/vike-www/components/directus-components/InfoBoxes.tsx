import React from "react";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import GatsbyImageWrapper from "../GatsbyImageWrapper";

const BoxesContainer = styled(Flex)`
  padding-top: 122px;
`;
BoxesContainer.defaultProps = {
  flexDirection: ["column", "row"],
  width: ["100%"],
  maxWidth: [415, "100%", "100%", "83%"],
};

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 30px;
  margin-bottom: 60px;
`;
InfoBox.defaultProps = { flexDirection: "column", alignItems: "center", width: ["100%", 1 / 3], textAlign: "center" };

const InfoBoxImg = styled(GatsbyImageWrapper)`
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: -60px;
  width: 75px;
`;
InfoBoxImg.defaultProps = { loading: "eager" };

const InfoBoxHeader = styled("h3")`
  font-size: 18px;
  line-height: 24px;
  color: #363636;
  margin-top: -30px;
  margin-bottom: 11px;
  font-weight: 800;
  width: 100%;
`;

const InfoBoxText = styled("p")`
  font-size: 16px;
  color: #363636;
  width: 100%;
`;

type InfoBoxesProps = {
  boxes: Array<{
    image?: FluidObject;
    header?: string;
    text?: string;
  }>;
};
const InfoBoxes: React.FC<InfoBoxesProps> = ({ boxes }) => {
  return (
    <BoxesContainer>
      {boxes.map((box, index) => (
        <InfoBox key={`infobox-${index}`}>
          {box.image && <InfoBoxImg image={box.image} />}
          {box.header && <InfoBoxHeader>{box.header}</InfoBoxHeader>}
          {box.text && <InfoBoxText>{box.text}</InfoBoxText>}
        </InfoBox>
      ))}
    </BoxesContainer>
  );
};

export default InfoBoxes;
