import React from "react";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const UpAwaySectionContainer = styled.section`
  padding: 50px 0 100px;
  text-align: center;
  font-size: 32px;

  ${mediaQueries[1]} {
    padding: 50px 0 300px;
  }
`;

const UpAwayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: auto;
`;

const UpAwayText = styled.div`
  font-weight: 800;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: -0.35px;
  max-width: 320px;
  margin: auto;

  ${mediaQueries[0]} {
    padding-top: 48px;
    font-size: 48px;
    font-weight: 800;
    line-height: 100%;
    max-width: unset;
  }
`;

const UpAwayImageWrapper = styled.div`
  min-width: 260px;
`;

type UpAwaySectionProps = {
  vision_mojo_image_url: string;
  vision_mojo_image_alt: string;
  vision_title: string;
  vision_text: string;
};

const UpAwaySection: React.FC<UpAwaySectionProps> = ({
  vision_mojo_image_url,
  vision_mojo_image_alt,
  vision_title,
  vision_text,
}) => {
  return (
    <UpAwaySectionContainer>
      <Container>
        <UpAwayContent>
          <UpAwayImageWrapper>
            <img src={vision_mojo_image_url} alt={vision_mojo_image_alt} />
          </UpAwayImageWrapper>
          <UpAwayText>
            {vision_title} <br />
            {vision_text}
          </UpAwayText>
        </UpAwayContent>
      </Container>
    </UpAwaySectionContainer>
  );
};

export default UpAwaySection;
