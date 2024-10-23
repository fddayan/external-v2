import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { Flex } from "../Boxes";
import { mediaQueriesMax } from "@src/styles/theme";
import CalendlyModal from "@src/components/CalendlyModal";
import { logEvent } from "@src/utils/logClient";
import PlayVideoContainer from "@src/components/partials/shared/PlayVideoContainer";
import { Button } from "@src/components/nessie-web";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import { SecondaryButton } from "./styles";
import { Helmet } from "react-helmet";

const HeadingWrapper = styled.div`
  .mobile {
    display: none;
  }
  ${mediaQueriesMax[1]} {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
      margin-bottom: 40px;
    }
  }
`;
const Heading = styled.div`
  color: ${(props) => props.theme.__new.colors.cloud80};
  text-align: center;
  font-family: DojoDisplay !important;
  font-size: 148px;
  font-style: normal;
  font-weight: 800;
  line-height: 123.152px;
  letter-spacing: -1.48px;
  margin-bottom: 20px;
  ${mediaQueriesMax[1]} {
    font-size: 42px;
    font-style: normal;
    font-weight: 800;
    line-height: 68.203px; /* 83.211% */
    letter-spacing: -0.82px;
    margin-bottom: -10px;
  }
`;

const TitleFlex = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;
  order: 1;
`;
const SubText = styled.div`
  color: ${(props) => props.theme.__new.colors.contentAccent};
  text-align: center;
  font-family: DojoDisplay !important;
  font-size: 76px;
  font-style: normal;
  font-weight: 800;
  line-height: 61.404px;
  letter-spacing: -0.76px;
  margin-bottom: 20px;
  ${mediaQueriesMax[1]} {
    font-size: 33px;
    font-style: normal;
    font-weight: 800;
    line-height: 34.006px; /* 80.794% */
    letter-spacing: -0.421px;
  }
`;

const Headline1 = styled.h3`
  /* Marketing/Headers/Headline 1 */
  font-family: "DojoText";
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 33.6px */
  letter-spacing: -0.1px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -0.44px;
    max-width: 270px;
    margin-inline: auto;
  }
`;

const FlexButtons = styled(Flex)`
  gap: 18px;
  flex-direction: row;
  order: 2;
  margin-block: 42px;
  ${mediaQueriesMax[1]} {
    flex-direction: column-reverse;
    order: 3;
    margin-block: 24px;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;

  ${mediaQueriesMax[1]} {
    gap: 20px;
    margin-top: 20px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.17%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 24px; /* To match your requirement */
  order: 3;
  ${mediaQueriesMax[1]} {
    order: 2;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: inherit;
  }
`;

export const HeroA = ({ utmParams }) => {
  useEffect(() => {
    logEvent({
      eventName: "web.external.page_whats_new_2024_sl.page_view",
      eventValue: window.location.href,
    });
  }, []);

  const [showCalendly, setShowCalendly] = useState(false);

  const openCalendly = () => {
    setShowCalendly(true);
    logEvent({
      eventName: "web.external.page_whats_new_2024_sl.open_calendly_captcha",
      eventValue: window.location.href,
    });
  };

  const closeCalendly = () => {
    setShowCalendly(false);
  };

  const modalContext = React.useContext(ModalContext);
  const openSignUpModal = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external.page_whats_new_2024_sl.hero_a.sign_up.tap",
    });
    modalContext.showModal(ModalType.Signup);
  };

  const buildCalendlyLink = () => {
    const baseLink =
      "https://calendly.com/d/cn96-2ws-fxy?utm_source=sayhelloLPhero";
    const utmString = new URLSearchParams(utmParams).toString();
    return `${baseLink}&${utmString}`;
  };

  return (
    <FlexWrapper>
      <HeadingWrapper>
        <TitleFlex className="desktop">
          <Heading>
            <Translate path="directus.page_whats_new_2024_sl.headline" />
          </Heading>
          <SubText>
            <Translate path="directus.page_whats_new_2024_sl.subheadline" />
          </SubText>
          <Headline1>
            <Translate path="directus.page_whats_new_2024_sl.small_text" />
          </Headline1>
        </TitleFlex>
        <TitleFlex className="mobile">
          <Heading>Say Hello to</Heading>
          <SubText>the new ClassDojo</SubText>
          <Headline1>
            <Translate path="directus.page_whats_new_2024_sl.small_text" />
          </Headline1>
        </TitleFlex>
      </HeadingWrapper>
      <FlexButtons>
        <SecondaryButton kind="secondary" onClick={openCalendly}>
          <Translate path="directus.page_whats_new_2024_sl.hero_cta_primary" />
        </SecondaryButton>
        <Button kind="plus" onClick={openSignUpModal}>
          <Translate path="directus.page_whats_new_2024_sl.hero_cta_secondary" />
        </Button>
      </FlexButtons>
      <VideoContainer>
        <iframe
          src="https://player.vimeo.com/video/992255740?h=7070ba758b&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
          // frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title="CD_SayHello_PUBLISH_h264_04"
        ></iframe>
      </VideoContainer>
      {showCalendly && (
        <CalendlyModal
          logEventContext="page_whats_new_2024_sl"
          calendlyLink={buildCalendlyLink()}
          closeModal={closeCalendly}
        />
      )}
    </FlexWrapper>
  );
};
