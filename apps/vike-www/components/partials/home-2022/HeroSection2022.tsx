/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Subheading, Space } from "@src/components/nessie-web";
import Button from "@src/components/Button";
import { mediaQueries } from "@src/styles/theme";
import ConstituentButtons, { ConstituentButtonsType } from "@src/components/ConstituentButtons";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import StarGraphicURL from "@src/assets/images/index/review-stars.svg";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import spinner from "@src/assets/images/loadingMojo.gif";
import { useEffect, useRef } from "react";

const {
  colors: { dt_aqua60, dt_taro60, dt_taro90 },
} = theme;

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
  ${mediaQueries[0]} {
    width: 66%;
    margin-left: 17%;
  }
`;

InfoBox.defaultProps = {
  flexDirection: "column",
};

const InfoBoxHeader = styled("h1")`
  font-size: 60px;
  line-height: 60px;
  margin-bottom: 20px;
  @media (max-width: 577px) {
    font-size: 30px;
    line-height: 36px;
    margin-bottom: 10px;
  }
  font-weight: 800;
  margin-top: 0;
  color: ${dt_taro90};
  width: 100%;
`;

const InfoBoxHeaderVariant = styled(InfoBoxHeader)`
  font-size: 60px;
  line-height: 60px;
`;

const InfoBoxText = styled("p")`
  font-size: 24px;
  line-height: 30px;
  @media (max-width: 577px) {
    font-size: 16px;
    line-height: 20px;
  }
  margin-bottom: 20px;
  color: ${dt_taro60};
  font-weight: 700;
`;

const HeroSectionStyled = styled(Flex)`
  overflow: hidden;
`;

const SubtitleUnderline = styled("span")`
  display: inline-block;
  position: relative;
  .inner {
    position: relative;
    z-index: 2;
  }
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    ${mediaQueries[0]} {
      height: 7px;
    }
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 275 7' preserveAspectRatio='none' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.16406 3.28156C18.8524 3.28156 34.5154 3.76923 50.1793 3.90865C71.208 4.09582 92.3732 3.94069 113.413 3.92048C127.922 3.90655 142.415 3.72664 156.927 3.70751C172.515 3.68695 187.863 3.22509 203.411 3.09225C225.964 2.89954 248.601 3.06858 271.164 3.06858' stroke='%23EAECF5' stroke-width='6' stroke-linecap='round'/%3E%3C/svg%3E%0A");
    background-repeat: none;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

HeroSectionStyled.defaultProps = {};

const ButtonContainer = styled("div")`
  text-align: center;
  margin: auto;
`;

const ReviewBox = styled("div")`
  text-align: center;
`;

const ReviewCount = styled("div")`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: ${dt_taro60};
`;

const StarGraphic = styled.img``;
StarGraphic.defaultProps = { alt: "5 Stars", src: StarGraphicURL };

type HeroSection2022 = {
  hero_title: string;
  hero_subtitle: string;
  hero_subtitle_underlined: string;
  get_started_title: string;
  review_count: string;
  setShowMobileButton: (_: boolean) => void;
};

const HeroSection2022: React.FC<HeroSection2022> = ({
  hero_title,
  hero_subtitle,
  hero_subtitle_underlined,
  get_started_title,
  review_count,
  setShowMobileButton,
}) => {
  const t = React.useContext(TranslationContext);
  const modalContext = React.useContext(ModalContext);
  const featureFlags = useFeatureFlagsWithOverrides();

  const openSignupModal = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.hero_section.sign_up.tap",
      metadata: featureFlags,
    });
    modalContext.showModal(ModalType.Signup);
  };

  const openSignupModalFromSticky = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.hero_section.sticky_sign_up.tap",
      metadata: featureFlags,
    });
    modalContext.showModal(ModalType.Signup);
  };

  const signupButtonRef = useRef(null);

  const intersectionObserverCallBack = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setShowMobileButton(!entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (signupButtonRef.current) observer.observe(signupButtonRef.current);
    return () => {
      if (signupButtonRef.current) observer.unobserve(signupButtonRef.current);
    };
  }, [signupButtonRef]);

  return (
    <HeroSectionStyled>
      <Container>
        <InfoBox mt={[54, 96]} textAlign="center">
          <InfoBoxHeaderVariant>{t.translateIfAble(hero_title)}</InfoBoxHeaderVariant>
          <InfoBoxText>
            {t.translateIfAble(hero_subtitle)}
            <br />
            <SubtitleUnderline>
              <span className="inner">
                <Translate path={hero_subtitle_underlined} />
              </span>
            </SubtitleUnderline>
          </InfoBoxText>
        </InfoBox>
        <ButtonContainer>
          <Box display={["none", "block"]} my={30}>
            <Subheading textAlign="center">
              <Translate path={get_started_title} />
            </Subheading>
            <Space size="s" />
            <ConstituentButtons type={ConstituentButtonsType.SIGNUP} buttonLocation="home" arrow={true} />
          </Box>
          <Box display={["block", "none"]} my={30}>
            <div ref={signupButtonRef}>
              <Button xl onClick={openSignupModalFromSticky} data-test-name="open-login-modal-mobile-cta" width={"80%"}>
                <Translate path="layouts.main.signup" />
              </Button>
            </div>
          </Box>
        </ButtonContainer>
        <ReviewBox>
          <Space size="l" />
          <StarGraphic />
          <ReviewCount>
            <Translate path={review_count} />
          </ReviewCount>
        </ReviewBox>
      </Container>
    </HeroSectionStyled>
  );
};

export default HeroSection2022;
