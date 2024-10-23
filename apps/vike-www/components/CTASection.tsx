import React, { useContext } from "react";
import Container from "@src/components/Container";
import { Button, Space, theme, BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";

const {
  colors: { dt_white, dt_taro90 },
  radii: { dt_radius_m },
} = theme;

const CTASectionContainer = styled.section<{ bgImage: string; home_variation?: boolean; accentBGColor?: string }>`
  background-image: url("${(props) => props.bgImage}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;

  ${(props) =>
    props.home_variation &&
    `
    position: relative;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1292 55' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M981.178 5.52051C783.987 5.52051 314.965 84.6091 0.605469 42.7775V0.520508H1291.77V41.8813C1246.07 24.3737 1135.55 5.52051 981.178 5.52051Z' fill='${encodeURIComponent(
      props.accentBGColor ?? "",
    )}'/%3E%3C/svg%3E%0A"), url("${props.bgImage}");
    background-size: 102% auto, cover;
    background-repeat: no-repeat;
    background-position: center -1px, center top;
    `}
`;

const CTAContent = styled.div`
  width: 100%;
  min-height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries[0]} {
    min-height: 640px;
  }
`;

const CTATile = styled.div<{ home_variation?: boolean }>`
  text-align: center;
  width: 100%;
  max-width: ${(props) => (props.home_variation ? "none" : "560px")};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.home_variation ? "none" : dt_white)};
  border-radius: ${dt_radius_m};
  margin-top: ${(props) => (props.home_variation ? "6%" : "54px")};

  ${mediaQueries[0]} {
    padding: ${(props) => (props.home_variation ? "0" : "54px")};
    margin-top: ${(props) => (props.home_variation ? "0" : "108px")};
  }
`;

const CTATitle = styled.h2<{ home_variation?: boolean }>`
  font-weight: 800;
  font-size: ${(props) => (props.home_variation ? "50px" : "30px")};
  line-height: ${(props) => (props.home_variation ? "50px" : "36px")};
  text-align: center;
  letter-spacing: -0.35px;
  color: ${(props) => (props.home_variation ? dt_white : dt_taro90)};

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 50px;
    font-size: ${(props) => (props.home_variation ? "72px" : "50px")};
    line-height: 100%;
    text-align: center;
    letter-spacing: -0.5px;
  }
`;

type CTASectionProps = {
  cta_title: string;
  cta_button_text: string;
  cta_background_image_url: string;
  cta_advice?: string;
  cta_button_url?: string;
  button_log_event_name?: string;
  params?: any;
  home_variation?: boolean;
  hide_button?: boolean;
  teacherSignup?: boolean;
  accentBGColor?: string;
};

const CTASection: React.FC<CTASectionProps> = ({
  cta_title,
  cta_button_text,
  cta_background_image_url,
  cta_advice,
  cta_button_url,
  button_log_event_name,
  params,
  home_variation,
  teacherSignup,
  hide_button,
  accentBGColor,
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

  function openSignupModal() {
    teacherSignup ? modalContext.showModal(ModalType.TeacherSignup) : modalContext.showModal(ModalType.Signup);
    fireLogEvent();
  }

  return (
    <CTASectionContainer
      bgImage={cta_background_image_url}
      home_variation={home_variation}
      accentBGColor={accentBGColor}
    >
      <Container>
        <CTAContent>
          <CTATile home_variation={home_variation}>
            <CTATitle home_variation={home_variation}>{t.translate(cta_title)}</CTATitle>
            {hide_button ? null : (
              <>
                <Space size="m" />
                {cta_button_url ? (
                  <Button href={cta_button_url} onClick={fireLogEvent}>
                    {t.translate(cta_button_text)}
                  </Button>
                ) : (
                  <Button onClick={openSignupModal}>{t.translate(cta_button_text)}</Button>
                )}
                <Space size="m" />
                {cta_advice && <BodyText>{t.translate(cta_advice)}</BodyText>}
              </>
            )}
          </CTATile>
        </CTAContent>
      </Container>
    </CTASectionContainer>
  );
};

CTASection.defaultProps = {
  accentBGColor: dt_white,
};

export default CTASection;
