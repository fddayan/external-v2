import React, { useContext } from "react";
import Container from "@src/components/Container";
import { Space, Subheading, theme } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro50, dt_taro90 },
} = theme;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${mediaQueries[0]} {
    padding: 52px 0;
    flex-direction: row;
  }
`;

const HeroBlock = styled.div`
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mediaQueries[0]} {
    width: 50%;
    padding: 0;
    margin: 0;
  }
`;

const HeroContent = styled.div`
  text-align: center;

  ${mediaQueries[0]} {
    text-align: left;
  }
`;

const HeroTitle = styled.h1<{ bgImage: string }>`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.35px;
  text-align: center;
  color: ${dt_taro90};

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 50px;
    line-height: 100%;
    letter-spacing: -0.5px;
    text-align: left;
  }

  span {
    position: relative;

    &:after {
      content: " ";
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url("${(props) => props.bgImage}");
      display: block;
      height: 14px;
      width: 100%;
      position: absolute;
      bottom: -6px;
      left: 0px;

      ${mediaQueries[0]} {
        bottom: 2px;
      }
    }
  }
`;

const HeroImg = styled.img`
  width: 100%;

  ${mediaQueries[0]} {
    max-width: 480px;
  }
`;

type HeroSectionProps = {
  hero_title: string;
  hero_highlight_image_url: string;
  hero_text: string;
  hero_image: any;
};

const HeroSection: React.FC<HeroSectionProps> = ({ hero_title, hero_highlight_image_url, hero_text, hero_image }) => {
  const t = useContext(TranslationContext);
  return (
    <Container>
      <HeroContainer>
        <HeroBlock>
          <HeroContent>
            <HeroTitle bgImage={hero_highlight_image_url}>{t.translate(hero_title)}</HeroTitle>
            <Space size="l" />
            <Subheading color={dt_taro50}>{t.translate(hero_text)}</Subheading>
            <Space size="l" />
          </HeroContent>
        </HeroBlock>
        <HeroBlock>
          <HeroImg src={hero_image} alt="app chatting between ClassDojo teachers" />
        </HeroBlock>
      </HeroContainer>
    </Container>
  );
};

export default HeroSection;
