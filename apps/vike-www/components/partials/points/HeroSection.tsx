import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { BodyText, Title, Button, Space } from "@src/components/nessie-web";
import { Flex, Box } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import HeaderVideoMask from "@src/assets/images/points/header-video-mask.svg";
import HeaderVideo from "@src/assets/images/points/header-video.mp4";
import HeaderVideoBg from "@src/assets/images/points/header-video-blob.png";
import PlayButtonImage from "@src/assets/images/points/header-video-btn.svg";

const VideoBlob = () => (
  <VideoMask>
    <ReactPlayer url={HeaderVideo} playing loop muted volume={0} width="100%" height="100%" />
  </VideoMask>
);

const VideoBg = styled(Box)`
  background-image: url(${HeaderVideoBg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px;
`;

const VideoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 60px;
  text-align: left;
`;
VideoBox.defaultProps = {
  width: ["100%", "100%", 9 / 20],
};

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const VideoMask = styled(Box)`
  mask: url(${HeaderVideoMask});
  mask-repeat: no-repeat;
  mask-size: contain;
`;
VideoMask.defaultProps = { position: "relative", height: ["100%", "100%", "auto"] };

const HeroSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_points {
          hero_youtube_id
          hero_button_url
        }
      }
      feature_one: file(name: { eq: "feature_one" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      feature_two: file(name: { eq: "feature_two" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      feature_three: file(name: { eq: "feature_three" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const t = useContext(TranslationContext);
  const modalContext = useContext(ModalContext);

  const openVideoModal = () => {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: data.directus.page_points.hero_youtube_id });
  };
  return (
    <Container marginBottom={[40, 40, 60]} marginTop={[40, 40, 60]}>
      <Flex flexDirection={["column", "column", "row"]} alignItems="center">
        <Flex flexBasis={["100%", "100%", "49%"]} flexDirection="column">
          <Title size={2}>
            <Translate path="directus.page_points.hero_header" />
          </Title>
          <Space size="m" />
          <BodyText>
            <Translate path="directus.page_points.hero_subtitle" />
          </BodyText>
          <Space size="m" />
          <Button href={data.directus.page_points.hero_button_url}>
            <Translate path="directus.page_points.hero_button_text" />
          </Button>
        </Flex>
        <Space size="l" />
        <Box position="relative">
          <VideoBg>
            <VideoBlob />
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
          </VideoBg>
        </Box>
      </Flex>
    </Container>
  );
};

export default HeroSection;
