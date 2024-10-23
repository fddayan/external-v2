import React, { useContext } from "react";
import Container from "@src/components/Container";
import { Space, DetailText, Button, Heading, Title, theme } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";

const {
  colors: { dt_taro40, dt_taro50 },
} = theme;

const SchoolsHeroSectionContainer = styled.section`
  padding-bottom: 54px;
  overflow: hidden;

  ${mediaQueries[1]} {
    padding-bottom: 108px;
    padding-top: 12px;
  }
`;

const SchoolsHeroContainer = styled(Container)`
  ${mediaQueriesMax[0]} {
    width: 110%;
    padding: 0;
  }
`;

const SchoolsHeroContent = styled.div`
  width: 100vw;
  text-align: center;
  padding: 0 15px;

  ${mediaQueries[0]} {
    max-width: 698px;
    margin: auto;
  }
`;

const SchoolsHeroTitle = styled(Title)<{ bgImage?: string }>`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;

  ${mediaQueries[0]} {
    font-size: 50px;
    line-height: 100%;
    letter-spacing: -0.5px;
  }

  span {
    white-space: nowrap;
    position: relative;
    display: inline-block;

    &:after {
      content: " ";
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url("${(props) => props.bgImage}");
      position: absolute;
      bottom: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
    }
  }
`;

const SchoolsHeroText = styled(Heading)`
  font-size: 18px;
  line-height: 22px;

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
  }
`;

const ButtonWrapper = styled.div`
  width: fit-content;
  margin: auto;
`;

const SchoolsHeroImg = styled.img`
  width: 100%;
  margin-left: -5%;
  display: none;
  max-height: 300px;

  ${mediaQueries[0]} {
    display: inherit;
    margin-left: 0;
    transform: unset;
  }
`;

const SchoolsHeroImgMobile = styled.img`
  width: calc(90% - 36px);
  margin-left: 18px;

  ${mediaQueries[0]} {
    display: none;
  }
`;

type SchoolsHeroSectionProps = {
  hero_title: string;
  hero_title_marked?: string;
  hero_highlight_image_url?: string;
  hero_text: string;
  hero_button_text: string;
  hero_button_advice: string;
  hero_image_url: string;
  hero_image_alt: string;
  hero_image_mobile_url: string;
  hero_button_url?: string;
  button_log_event_name?: string;
  params?: any;
};

const SchoolsHeroSection: React.FC<SchoolsHeroSectionProps> = ({
  hero_title,
  hero_highlight_image_url,
  hero_text,
  hero_button_text,
  hero_button_advice,
  hero_image_url,
  hero_image_alt,
  hero_image_mobile_url,
  hero_button_url,
  button_log_event_name,
  params,
}) => {
  const t = useContext(TranslationContext);

  const modalContext = useContext(ModalContext);
  function fireLogEvent() {
    logEvent({
      eventName: button_log_event_name,
      eventValue: location.href,
      metadata: params,
    });
  }

  function openSchoolLeaderModal() {
    modalContext.showModal(ModalType.SchoolLeaderSignup);
    fireLogEvent();
  }

  return (
    <SchoolsHeroSectionContainer>
      <SchoolsHeroContainer>
        <Space size="l" />
        <SchoolsHeroImg src={hero_image_url} alt={t.translate(hero_image_alt) as string} />
        <SchoolsHeroImgMobile src={hero_image_mobile_url} alt={t.translate(hero_image_alt) as string} />
        <SchoolsHeroContent>
          <SchoolsHeroTitle bgImage={hero_highlight_image_url}>{t.translate(hero_title)}</SchoolsHeroTitle>
          <Space size="l" />
          <SchoolsHeroText color={dt_taro40}>{t.translate(hero_text)}</SchoolsHeroText>
          <Space size="l" />
          <ButtonWrapper>
            {hero_button_url ? (
              <Button href={hero_button_url} onClick={fireLogEvent}>
                {t.translate(hero_button_text)}
              </Button>
            ) : (
              <Button onClick={openSchoolLeaderModal}>{t.translate(hero_button_text)}</Button>
            )}
          </ButtonWrapper>
          <Space size="s" />
          <DetailText color={dt_taro50}>{t.translate(hero_button_advice)}</DetailText>
        </SchoolsHeroContent>
      </SchoolsHeroContainer>
    </SchoolsHeroSectionContainer>
  );
};

export default SchoolsHeroSection;
