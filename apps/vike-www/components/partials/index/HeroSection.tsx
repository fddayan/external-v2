import * as React from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { css } from "@emotion/react";
import Button from "@src/components/Button";
import BrushStroke from "@src/assets/images/index/brush-stroke.svg";
import PlayButtonImage from "@src/assets/images/index/header-video-btn.svg";
import HeaderVideoMask from "@src/assets/images/index/header-video-mask.svg";
import MonstersImage from "@src/assets/images/index/teacher-and-students.svg";
import HeaderVideo from "@src/assets/images/index/header-video.mp4";
import ReactPlayer from "react-player";
import { mediaQueries } from "@src/styles/theme";
import { theme } from "@src/components/nessie-web";
import ConstituentButtons, { ConstituentButtonsType } from "@src/components/ConstituentButtons";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import { useEffect, useRef } from "react";
import cookies from "cookies-js";
import { graphql, useStaticQuery } from "gatsby";
import { cookiesWork } from "@src/utils/cookies";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";

const {
  colors: { dt_taro40, dt_taro90, dt_white },
} = theme;

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
`;
InfoBox.defaultProps = {
  flexDirection: "column",
  alignItems: ["center", "center", "start"],
  width: ["100%", "100%", 11 / 20],
  textAlign: ["center", "center", "left"],
};

const InfoBoxHeader = styled("h1")`
  font-size: 62px;
  line-height: 70px;
  margin-bottom: 20px;
  max-width: 560px;
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
  font-size: 50px;
  line-height: 60px;
`;

const InfoBoxSubHeader = styled("h2")`
  line-height: 40px;
  margin-top: 0;
  margin-bottom: 11px;
  font-size: 24px;
  font-weight: 800;
  color: ${dt_taro90};
  width: 100%;
`;

const InfoBoxText = styled("p")`
  font-size: 24px;
  line-height: 30px;
  max-width: 560px;
  @media (max-width: 577px) {
    font-size: 16px;
    line-height: 20px;
  }
  margin-bottom: 20px;
  color: ${dt_taro40};
  font-weight: 700;
`;

const BrushStrokeSpan = styled.span`
  white-space: nowrap;
  position: relative;

  &:after {
    background-image: url(${BrushStroke});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    content: "";
    height: 5px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    ${mediaQueries[0]} {
      display: block;
    }
  }
`;

const VideoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: ${dt_white};
  margin-bottom: 60px;
  /* margin-top: 41px; */
  text-align: left;
`;
VideoBox.defaultProps = {
  width: ["100%", "100%", 9 / 20],
};

const PlayButton = styled.button`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  ${mediaQueries[2]} {
    top: calc(50%);
    left: calc(50%);
  }
  width: 80px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const VideoMask = styled(Box)`
  mask: url(${HeaderVideoMask});
  mask-repeat: no-repeat;
  mask-size: contain;
  width: 100%;
`;
VideoMask.defaultProps = { position: ["relative", "relative", "absolute"], height: ["100%", "100%", "auto"] };

const VideoBottomImg = styled.img`
  position: absolute;
  top: 70%;
  left: 10%;
  width: 100%;
  max-width: 450px;

  ${mediaQueries[1]} {
    max-width: 520px;
    top: 80%;
  }
`;
VideoBottomImg.defaultProps = { alt: "Monsters", src: MonstersImage };

const HeroSectionStyled = styled(Flex)`
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  padding-bottom: 60px;
  margin-top: 22px;
`;

HeroSectionStyled.defaultProps = {};

function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);
}

const HeroSection = () => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        page_home {
          youtube_hero_video_id
          translations {
            youtube_hero_video_id
            languages_code {
              code
              name
            }
          }
        }
      }
    }
  `);

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

  const youTubeIDEnglish = data.directus.page_home.youtube_hero_video_id;
  let youtubeVideoId = youTubeIDEnglish;

  if (cookiesWork()) {
    const locale = cookies.get("dojoDesiredLanguage") || "en-us";
    const languageCode = locale.substring(0, 2);
    const translations = data.directus.page_home.translations;
    const youtubeMap = translations.reduce((acc, videoId) => {
      const videoLanguage = videoId.languages_code.code.substring(0, 2);
      acc[videoLanguage] = videoId.youtube_hero_video_id;
      return acc;
    }, {});
    youtubeVideoId = youtubeMap[languageCode] || youTubeIDEnglish;
  }

  function openVideoModal() {
    logEvent({ eventValue: window.location.href, eventName: "web.external_page.play_intro_video.tap" });
    modalContext.showModal(ModalType.VideoModal, { youtubeID: youtubeVideoId });
  }

  useDidUpdateEffect(() => {
    logEvent({
      eventName: "web.external_page.homepage.page_view",
      eventValue: window.location.href,
      metadata: featureFlags,
    });
  }, [featureFlags]);

  return (
    <HeroSectionStyled>
      <Container>
        <Flex flexDirection={["column", "column", "row"]} marginBottom={[0, 0, 80]}>
          <InfoBox mt={[40, 80]} textAlign={["center", "center", "left"]} mr={[0, 20]}>
            <InfoBoxHeaderVariant>
              <Translate path={`directus.page_home.title`} />
            </InfoBoxHeaderVariant>
            <InfoBoxText>
              <span
                css={css`
                  margin-right: 5px;
                  strong {
                    color: #4b4fa1;
                    font-weight: inherit;
                  }
                `}
              >
                <Translate path={`directus.page_home.subtitle`} />
              </span>
              <BrushStrokeSpan>
                <Translate path="directus.page_home.subtitle_underlined" />
              </BrushStrokeSpan>
            </InfoBoxText>

            <Box display={["inline-block", "inline-block", "none"]} my={30}>
              <Button xl onClick={openSignupModal} data-test-name="open-login-modal-mobile-cta">
                <Translate path="pages.home.sign_up" />
              </Button>
            </Box>

            <Box display={["none", "none", "block"]} width="100%">
              <InfoBoxSubHeader>
                <Translate path="pages.home.sign_up_as_a" />
              </InfoBoxSubHeader>
              <ConstituentButtons type={ConstituentButtonsType.SIGNUP} buttonLocation="home" />
            </Box>
          </InfoBox>
          <VideoBox>
            <Flex
              mx="auto"
              position={["relative", "relative", "absolute"]}
              width={[400, 400, 500, 600]}
              height="100%"
              alignContent="center"
            >
              <VideoMask>
                <ReactPlayer url={HeaderVideo} playing loop muted volume={0} width="100%" height="100%" />
              </VideoMask>
              <VideoBottomImg />
            </Flex>
            <PlayButton onClick={openVideoModal}>
              <img
                src={PlayButtonImage}
                alt="Play video"
                css={css`
                  width: 80px;
                  max-width: unset;
                `}
              />
            </PlayButton>
          </VideoBox>
        </Flex>
      </Container>
    </HeroSectionStyled>
  );
};

export default HeroSection;
