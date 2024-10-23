import React from "react";
import Container from "@src/components/Container";
import { Space, theme } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white },
} = theme;

const HeroSectionContainer = styled.section<{ bgImage: string }>`
  width: 100%;
  background-image: url("${(props) => props.bgImage}"),
    linear-gradient(0deg, rgba(1, 174, 244, 0.3) 0%, rgba(1, 174, 244, 1) 100%);
  background-repeat: no-repeat;
  background-size: 800px, 100%;
  background-position: center bottom;
  padding: 140px 0 260px;

  ${mediaQueries[1]} {
    padding: 100px 0 390px;
    background-size: 1200px, 100%;
  }

  ${mediaQueries[2]} {
    padding: 120px 0 24%;
    background-size: 100%;
    background-position: center bottom -15%, center bottom;
  }

  @media (min-width: 1560px) {
    padding: 120px 0 25%;
    background-size: 100%;
    background-position: center bottom -25%, center bottom;
  }
`;

const HeroSectionContent = styled.div`
  width: 100%;
`;

const HeroTitle = styled.h1`
  margin: auto;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: -0.35px;
  font-weight: 800;
  text-align: center;
  color: ${dt_white};

  ${mediaQueries[0]} {
    font-size: 60px;
    line-height: 60px;
    letter-spacing: -2px;
  }
`;

const HeroText = styled.p`
  margin: auto;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.25px;
  font-weight: 600;
  text-align: center;
  color: ${dt_white};

  ${mediaQueries[0]} {
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.35px;
  }
`;

type HeroSectionProps = {
  hero_title: string;
  hero_signature: string;
  hero_image: any;
};

const HeroSection: React.FC<HeroSectionProps> = ({ hero_title, hero_signature, hero_image }) => {
  return (
    <HeroSectionContainer bgImage={hero_image.file.publicURL}>
      <Container>
        <HeroSectionContent>
          <HeroTitle>{hero_title}</HeroTitle>
          <Space size="m" />
          <HeroText>{hero_signature}</HeroText>
        </HeroSectionContent>
      </Container>
    </HeroSectionContainer>
  );
};

export default HeroSection;
