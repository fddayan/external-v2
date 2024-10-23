import React from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { Button, Heading, Space, theme } from "@src/components/nessie-web";
import { FileIcon, MailIcon } from "@classdojo/web/nessie/icons";
import HeaderVideo from "@src/assets/images/index/header-video.mp4";

const {
  colors: { dt_taro20, dt_white },
} = theme;

const HeroSectionContainer = styled.section`
  width: 100%;
  background-color: ${dt_taro20};
`;

const HeroBackgroundContainer = styled.div`
  width: 100%;
  height: 620px;
  position: relative;
  display: flex;
  align-items: center;
`;

const HeroVideoContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &:before {
    content: "";
    display: block;
    width: 95%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, rgba(44, 42, 80, 0.8) 0%, rgba(44, 42, 80, 0) 100%);
    z-index: 1;
  }
`;

const HeroVideo = styled.video`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const HeroContainer = styled(Container)`
  z-index: 2;
`;

const HeroContent = styled.div`
  max-width: 600px;
`;

const HeroTitle = styled.div`
  letter-spacing: -1px;
  font-weight: 800;
  font-size: 30px;
  line-height: 30px;
  color: ${dt_white};

  ${mediaQueries[0]} {
    font-size: 42px;
    line-height: 42px;
  }
`;

const PressContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  padding: 30px 0;
  margin: auto;

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr;
  }
`;

const TwoButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ArticleButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NewsIcon = styled.img`
  width: 54px;
  height: 54px;
  margin-right: 24px;
`;

type HeroSectionProps = {
  hero_text: string;
  contact_button_text: string;
  press_kit_button_text: string;
  news_icon: string;
  article_button_text: string;
  article_button_url: string;
  contact_button_url: string;
  press_kit_button_url: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  hero_text,
  contact_button_text,
  press_kit_button_text,
  news_icon,
  article_button_text,
  article_button_url,
  contact_button_url,
  press_kit_button_url,
}) => {
  return (
    <HeroSectionContainer>
      <HeroBackgroundContainer>
        <HeroVideoContainer>
          <HeroVideo playsInline autoPlay muted loop>
            <source src={HeaderVideo} type="video/webm" />
          </HeroVideo>
        </HeroVideoContainer>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              <Translate path={hero_text} />
            </HeroTitle>
            <Space size="m" />
          </HeroContent>
        </HeroContainer>
      </HeroBackgroundContainer>
      <Container>
        <PressContent>
          <a href={article_button_url}>
            <ArticleButton>
              <NewsIcon src={news_icon} alt="news icon" />
              <Heading>
                <Translate path={article_button_text} />
              </Heading>
            </ArticleButton>
          </a>
          <TwoButtonsWrapper>
            <Button href={contact_button_url} icon={<MailIcon />} width="100%" size="l">
              <Translate path={contact_button_text} />
            </Button>
            <Button href={press_kit_button_url} icon={<FileIcon />} width="100%" size="l">
              <Translate path={press_kit_button_text} />
            </Button>
          </TwoButtonsWrapper>
        </PressContent>
      </Container>
    </HeroSectionContainer>
  );
};

export default HeroSection;
