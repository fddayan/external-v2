import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { Heading, theme } from "@src/components/nessie-web";

const {
  colors: { dt_taro50, dt_taro90 },
} = theme;

const HeroSectionContainer = styled.section`
  margin-top: 60px;
  margin-bottom: 30px;
`;

const HeroContent = styled.div`
  width: 100%;

  ${mediaQueries[0]} {
    max-width: 540px;
  }
`;

const HeroTitle = styled.h1`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.35px;
  color: ${dt_taro90};

  ${mediaQueries[0]} {
    font-size: 60px;
    line-height: 60px;
    letter-spacing: -0.583333px;
  }
`;

type HeroSectionProps = {
  hero_title: string;
  hero_text: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ hero_title, hero_text }) => {
  return (
    <HeroSectionContainer>
      <Container>
        <HeroContent>
          <HeroTitle>{hero_title}</HeroTitle>
          <Heading color={dt_taro50}>{hero_text}</Heading>
        </HeroContent>
      </Container>
    </HeroSectionContainer>
  );
};

export default HeroSection;
