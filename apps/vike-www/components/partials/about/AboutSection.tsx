import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Heading, Space, BodyText } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro10 },
} = theme;

const AboutSectionContainer = styled.section`
  background-color: ${dt_taro10};
  padding: 100px 0;
`;

const AboutSectionContent = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

const AboutTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${mediaQueries[0]} {
    width: 50%;
    padding: 0 15px;
  }
`;

const AboutImgBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 30px;

  ${mediaQueries[0]} {
    width: 50%;
    margin-bottom: 0;
  }
`;

type AboutSectionProps = {
  about_title: string;
  about_text: string;
  about_image: any;
  about_image_alt: string;
};

const AboutSection: React.FC<AboutSectionProps> = ({ about_title, about_text, about_image, about_image_alt }) => {
  return (
    <AboutSectionContainer>
      <Container>
        <AboutSectionContent>
          <AboutTextBlock>
            <Heading>{about_title}</Heading>
            <Space size="s" />
            <BodyText>{about_text}</BodyText>
          </AboutTextBlock>
          <AboutImgBlock>
            <img src={about_image.file.publicURL} alt={about_image_alt} />
          </AboutImgBlock>
        </AboutSectionContent>
      </Container>
    </AboutSectionContainer>
  );
};

export default AboutSection;
