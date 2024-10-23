import React, { useContext, useEffect, useState } from "react";
import Container from "@src/components/Container";
import { Space, Button, Heading, Title, theme } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { PlayIcon } from "@classdojo/web/nessie/icons";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";
import CalendlyModal from "@src/components/CalendlyModal";
import { generatingFor } from "@src/utils/routes";

const {
  colors: { dt_taro30, dt_taro40 },
} = theme;

const SchoolsHeroSectionContainer = styled.section``;

const SchoolsHeroContent = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 2px solid ${dt_taro30};

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    border-bottom: none;
    padding-bottom: 0px;
  }
`;

const SchoolsHeroTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SchoolsHeroTitle = styled(Title)`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;

  ${mediaQueries[0]} {
    font-size: 50px;
    line-height: 100%;
    letter-spacing: -0.5px;
  }
`;

const StarBadge = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
  margin-left: 8px;

  ${mediaQueries[0]} {
    width: 30px;
    height: 30px;
    margin-bottom: 4px;
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

const ButtonAdviceWrapper = styled.div`
  display: flex;
  align-items: center;
  position: unset;
  gap: ${theme.space.l}px;
`;

const SignUpTooltipWrapper = styled.div``;

const SchoolsHeroImageWrapper = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;
  margin: auto;
  order: -1;

  ${mediaQueries[0]} {
    margin: 0;
    order: 2;
  }
`;

const SchoolsHeroImage = styled.img`
  width: 100%;
  max-width: 400px;
  padding-bottom: 16px;

  ${mediaQueries[0]} {
    max-width: 525px;
  }
`;

const VideoPlayButton = styled(Button)`
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 !important;
  border-radius: 50% !important;

  div {
    padding: 0;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;

    ${mediaQueries[1]} {
      width: 92px;
      height: 92px;
      border-radius: 46px;
    }

    svg {
      ${mediaQueries[1]} {
        width: 36px;
        height: 36px;
      }
    }
  }
`;

type SchoolsHeroSectionProps = {
  hero_title: string;
  hero_text: string;
  hero_button_text: string;
  hero_button_advice: string;
  hero_video_image: any;
  hero_video_alt: string;
  hero_video_url: string;
  hero_button_url: string;
  hero_tepsa_button_text?: string;
  hero_tepsa_button_url?: string;
  hero_button_schedule_demo?: string;
  star_badge_icon?: any;
  star_badge_alt?: string;
  button_log_event_name?: string;
  params?: any;
  test_variant?: string;
  openCalendly: any;
};

const SchoolsHeroSection: React.FC<SchoolsHeroSectionProps> = ({
  hero_title,
  hero_text,
  hero_button_text,
  hero_video_image,
  hero_video_alt,
  hero_video_url,
  hero_button_url,
  hero_tepsa_button_text,
  hero_tepsa_button_url,
  hero_button_schedule_demo,
  star_badge_icon,
  star_badge_alt,
  params,
  test_variant,
  openCalendly,
}) => {
  const t = useContext(TranslationContext);
  const modalContext = useContext(ModalContext);
  const [showCalendly, setShowCalendly] = useState(false);
  const closeCalendly = () => {
    setShowCalendly(false);
  };
  const lang = generatingFor.locale;
  const brazilUrl = lang.startsWith("pt");
  useEffect(() => {
    if (params && "openVideo" in params) {
      openVideoModal();
    }
  }, []);

  function fireLogEvent() {
    logEvent({
      eventName: "web.external.cds.main_cta_hero.click",
      eventValue: location.href,
      metadata: params,
    });
  }

  function fireTepsaLogEvent() {
    logEvent({
      eventName: "web.external.cds.tepsa_cta_hero.click",
      eventValue: location.href,
      metadata: params,
    });
  }

  function openVideoModal() {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: hero_video_url });
    logEvent({
      eventName: "web.external.cds.open_video.click",
      metadata: params,
    });
  }

  return (
    <SchoolsHeroSectionContainer>
      <Container>
        <SchoolsHeroContent>
          <SchoolsHeroTextBlock>
            <SchoolsHeroTitle>
              {t.translate(hero_title)}
              {star_badge_icon && (
                <span>
                  <StarBadge src={star_badge_icon.file.publicURL} alt={t.translate(star_badge_alt) as string} />
                </span>
              )}
            </SchoolsHeroTitle>
            <Space size="l" />
            <SchoolsHeroText color={dt_taro40}>{t.translate(hero_text)}</SchoolsHeroText>
            <Space size="l" />
            <SignUpTooltipWrapper>
              <ButtonAdviceWrapper>
                <Button
                  href={`${hero_button_url}${test_variant ? `?test=${test_variant}` : ""}`}
                  onClick={fireLogEvent}
                >
                  {t.translate(hero_button_text)}
                </Button>
                <Button onClick={() => openCalendly("control_hero")}>{t.translate(hero_button_schedule_demo)}</Button>
                {hero_tepsa_button_url && (
                  <Button href={hero_tepsa_button_url} onClick={fireTepsaLogEvent}>
                    {t.translate(hero_tepsa_button_text)}
                  </Button>
                )}
              </ButtonAdviceWrapper>
            </SignUpTooltipWrapper>
          </SchoolsHeroTextBlock>
          <SchoolsHeroImageWrapper>
            <SchoolsHeroImage src={hero_video_image.file.publicURL} alt={t.translate(hero_video_alt) as string} />
            <VideoPlayButton kind="tertiary" icon={<PlayIcon />} onClick={openVideoModal} />
          </SchoolsHeroImageWrapper>
        </SchoolsHeroContent>
      </Container>
    </SchoolsHeroSectionContainer>
  );
};

export default SchoolsHeroSection;
