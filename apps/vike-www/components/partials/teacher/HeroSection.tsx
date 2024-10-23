import React, { useContext } from "react";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Button, Subheading, Heading, Space, theme, Title, BodyText } from "@src/components/nessie-web";
import { Box, Flex } from "@src/components/Boxes";
import StarGraphicURL from "@src/assets/images/index/review-stars.svg";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import IconFromString from "@src/components/nessie-web/IconFromString";

const {
  colors: { dt_taro10, dt_taro20, dt_white, dt_aqua60 },
  space: { dt_s, dt_l, dt_xl, dt_xxl },
} = theme;

const HeroSectionContainer = styled.section`
  width: 100%;
  background-color: ${dt_taro10};
  background-image: url("https://static.classdojo.com/img/page_teacher/curve-slim.svg");
  padding-bottom: 70px;
  background-position: bottom center;
  background-repeat: no-repeat;
`;

const HeroBackgroundContainer = styled.div`
  background-image: url("https://static.classdojo.com/img/page_teacher/curve.svg"),
    linear-gradient(90deg, rgba(44, 42, 80, 0.9) 0%, rgba(44, 42, 80, 0) 80%),
    url("https://static.classdojo.com/img/page_teacher/teacher-bg.jpg");
  background-position: bottom center, center, center;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 100%, auto, cover;
  width: 100%;
  height: 480px;
  position: relative;
  display: flex;
  align-items: center;
`;

const ReviewCount = styled("div")`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: ${dt_aqua60};
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
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${mediaQueries[0]} {
    text-align: left;
    font-size: 42px;
    line-height: 42px;
    align-items: flex-start;
  }
`;

const PressContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${dt_xl}px;
  margin-bottom: ${dt_xl}px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

interface IconHolderProps {
  color: string;
}
const IconHolder = styled.div<IconHolderProps>`
  height: 20px;
  width: 20px;
  background-color: ${(p) => theme.colors[p.color]};
`;

const Underlined = styled.div`
  position: relative;
  display: inline-block;
  // font-size: 24px;
  // line-height: 30px;
  // letter-spacing: -.25px;
  &:after {
    display: block;
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 10px;
    content: " ";
    background-image: url("https://static.classdojo.com/img/page_teacher/underline-stroke.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
  }
`;

const StarGraphic = styled.img``;
StarGraphic.defaultProps = { alt: "5 Stars", src: StarGraphicURL };

interface HeroSectionProps {
  heading: string;
  tagline: string;
  taglineHighlight: string;
  featuresHeading: string;
  featuresReviews: string;
}
const HeroSection: React.FC<HeroSectionProps> = (props) => {
  const modalContext = useContext(ModalContext);

  function openSignupModal() {
    modalContext.showModal(ModalType.TeacherSignup);
  }

  const { translate: t } = useContext(TranslationContext);

  return (
    <HeroSectionContainer>
      <HeroBackgroundContainer>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              <Title size={2} color="dt_white">
                {t(props.heading)}
              </Title>
              <Space size="m" />
              <Heading color="dt_white">
                {t(props.tagline)}
                <br />
                <Underlined>{t(props.taglineHighlight)}</Underlined>
              </Heading>
              <Space size="xl" />
              <Button onClick={openSignupModal}>{t("layouts.main.signup")}</Button>
            </HeroTitle>
          </HeroContent>
        </HeroContainer>
      </HeroBackgroundContainer>
      <Container>
        <Box textAlign="center" paddingTop={dt_xl}>
          <Heading>{t(props.featuresHeading)}</Heading>
          <Space size="m" />
          <StarGraphic />
          <ReviewCount>{t(props.featuresReviews)}</ReviewCount>
        </Box>
        <Space size="xxl" />
        <PressContent>
          <Flex>
            <img src="https://static.classdojo.com/img/page_teacher/feature1.svg" width="58" height="50" alt="Icon" />
            <Box marginLeft={dt_s}>
              <Subheading>{t("directus.page_teachers.grid_features_items.title_1")}</Subheading>
              <Space size="s" />
              <BodyText>{t("directus.page_teachers.grid_features_items.description_1")}</BodyText>
            </Box>
          </Flex>
          <Flex>
            <img src="https://static.classdojo.com/img/page_teacher/feature2.svg" width="58" height="50" alt="Icon" />
            <Box marginLeft={dt_s}>
              <Subheading>{t("directus.page_teachers.grid_features_items.title_2")}</Subheading>
              <Space size="s" />
              <BodyText>{t("directus.page_teachers.grid_features_items.description_2")}</BodyText>
            </Box>
          </Flex>
          <Flex>
            <img src="https://static.classdojo.com/img/page_teacher/feature3.svg" width="58" height="50" alt="Icon" />
            <Box marginLeft={dt_s}>
              <Subheading>{t("directus.page_teachers.grid_features_items.title_3")}</Subheading>
              <Space size="s" />
              <BodyText>{t("directus.page_teachers.grid_features_items.description_3")}</BodyText>
            </Box>
          </Flex>
        </PressContent>
      </Container>
    </HeroSectionContainer>
  );
};

export default HeroSection;
