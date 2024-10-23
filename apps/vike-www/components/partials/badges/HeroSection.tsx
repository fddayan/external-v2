import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, BodyText, Button, Space, Title } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { navigate } from "gatsby";
import { getRelativePath } from "@src/utils/routes";

const {
  colors: { dt_taro50, dt_white, dt_aqua20, dt_taro90 },
  radii: { dt_radius_s },
  shadows: { dt_shadow_shadezies },
} = theme;

const HeroSectionContainer = styled.section<{ topSpacing: boolean }>`
  padding-bottom: 15px;
  padding-top: ${(props) => (props.topSpacing ? "15px" : "0")};
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

const BadgesContainer = styled.div<{ bgImage: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${dt_aqua20};
  background-image: url("https://static.classdojo.com/img/badges/confetti.svg"), url("${(props) => props.bgImage}");
  background-repeat: repeat, no-repeat;
  background-size: contain, cover;
  background-position: top, center;
  overflow: hidden;
  position: relative;
`;

const BadgeContent = styled.div`
  padding: 24px 15px;

  ${mediaQueries[0]} {
    padding: 60px 0;
  }
`;

const WaveContainer = styled.div`
  display: inline-block;
  width: 100%;
  bottom: 0;
  pointer-events: none;

  svg {
    display: inline-block;
    transform: rotate(180deg) translateY(-2px);
    vertical-align: bottom;

    path {
      stroke: none;
      fill: ${dt_white};
    }
  }
`;

const BadgesTile = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${dt_radius_s};
  background-color: ${dt_white};
  box-shadow: ${dt_shadow_shadezies};
  width: 100%;
  max-width: 430px;
  text-align: center;
`;

const BadgesHeadline = styled.h1`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${dt_taro90};

  ${mediaQueries[0]} {
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.35px;
  }
`;

const BadgeImg = styled.img`
  width: 150px;
  height: 150px;

  ${mediaQueries[0]} {
    width: 192px;
    height: 192px;
  }
`;

const HeroTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${mediaQueries[0]} {
    width: 50%;
  }
`;

const HeroImgBlock = styled.div`
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

const HeroTitle = styled.h1`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.35px;
  color: ${dt_taro90};

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 60px;
    line-height: 60px;
    letter-spacing: -0.583333px;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: -6px;
`;

type HeroSectionProps = {
  hero_badge_title: string;
  hero_badge_button_text: string;
  hero_badge_background_url: string;
  hero_title: string;
  hero_text: string;
  hero_button_text: string;
  hero_button_url: string;
  hero_image: any;
  hero_image_alt: string;
  searchParams?: any;
  badges: any;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  hero_badge_title,
  hero_badge_button_text,
  hero_badge_background_url,
  hero_title,
  hero_text,
  hero_button_text,
  hero_button_url,
  hero_image,
  hero_image_alt,
  searchParams,
  badges,
}) => {
  const badgeId = badges.find((badge: { id: string }) => badge.id === searchParams.badge);

  return (
    <>
      {badgeId && (
        <BadgesContainer bgImage={hero_badge_background_url}>
          <BadgeContent>
            <BadgesHeadline>{hero_badge_title}</BadgesHeadline>
            <Space size="m" />
            <BadgesTile>
              <BadgeImg src={badgeId.image.file.publicURL} alt="badge" />
              <Title size={1}>{badgeId.name}</Title>
              <Space size="s" />
              <BodyText color={dt_taro50}>{badgeId.congrats_message}</BodyText>
              <Space size="s" />
              <Button kind="secondary" href={badgeId.poster_pack}>
                {hero_badge_button_text}
              </Button>
            </BadgesTile>
          </BadgeContent>
          <WaveContainer>
            <svg viewBox="0 0 500 40">
              <path d="M0, 20 C220, 60 200, 0 500, 30 L500, 00 L0, 0 Z"></path>
            </svg>
          </WaveContainer>
        </BadgesContainer>
      )}
      <HeroSectionContainer topSpacing={badgeId === undefined}>
        <Container>
          <HeroContent>
            <HeroTextBlock>
              <HeroTitle>{hero_title}</HeroTitle>
              <BodyText color={dt_taro50}>{hero_text}</BodyText>
              <ButtonWrapper>
                <Space size="m" />
                <Button onClick={() => navigate(getRelativePath(hero_button_url))}>{hero_button_text}</Button>
              </ButtonWrapper>
            </HeroTextBlock>
            <HeroImgBlock>
              <img src={hero_image.file.publicURL} alt={hero_image_alt} />
            </HeroImgBlock>
          </HeroContent>
        </Container>
      </HeroSectionContainer>
    </>
  );
};

export default HeroSection;
