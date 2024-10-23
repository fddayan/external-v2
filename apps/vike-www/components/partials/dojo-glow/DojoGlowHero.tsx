import React, { useContext } from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TranslationContext } from "@src/components/translation/TranslationContext";

import { mediaQueriesMax } from "@src/styles/theme";
import Container from "@src/components/Container";
import { ShareButton } from "./ShareButton";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.17%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 24px; /* To match your requirement */

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

const textStyle = css`
  color: var(--Light-Content-Primary, #2c2a50);
  text-align: center;
  max-width: 600px;
  ${mediaQueriesMax[1]} {
    max-width: 300px;
  }
`;

const Title = styled.h1`
  background: linear-gradient(92deg, rgba(125, 64, 255, 1) 16%, rgba(223, 189, 255, 1) 51%, rgba(125, 64, 255, 1) 85%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: "DojoDisplay";
  font-size: 142px;
  font-style: normal;
  font-weight: 800;
  line-height: 160px;
  letter-spacing: -2.84px;
  margin-top: -40px;
  padding-inline: 2px;
  margin-bottom: 0;
  ${mediaQueriesMax[1]} {
    font-size: 44px;
    line-height: 120%;
    margin-top: -20px;
    letter-spacing: -0.1px;
  }
`;

const SubTitle = styled.h2`
  background: linear-gradient(92deg, rgba(125, 64, 255, 1) 16%, rgba(223, 189, 255, 1) 51%, rgba(125, 64, 255, 1) 85%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: "DojoDisplay";
  font-size: 60.419px;
  font-style: normal;
  font-weight: 800;
  line-height: 90.655px; /* 150.045% */
  letter-spacing: -1.208px;
  padding-inline: 2px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    font-size: 28px;
    line-height: 120%;
    letter-spacing: -0.1px;
  }
`;

interface DojoGlowHeroProps {
  language: string;
  slug: string;
}

export const DojoGlowHero = ({ language, slug }: DojoGlowHeroProps) => {
  const { dojoGlow: values } = useDojoGlow();

  const DojoGlowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    align-items: center;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-image: url(${values.background.publicURL}), url(${values.side_image_a.publicURL}),
      url(${values.side_image_b.publicURL});
    background-position: center 30px, left -50px, right 120px;
    margin-bottom: 100px;
    ${mediaQueriesMax[1]} {
      background-size: 80%, 100px, 140px;
      background-position: right 0px, left -20px, right 170px;
    }
  `;

  return (
    <DojoGlowContainer>
      <Container
        css={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, maxWidth: 1000, marginTop: 40 }}
      >
        <SubTitle>{values.title}</SubTitle>
        <Title>{values.sub_title}</Title>
        <Typography variant={["Body2", "Body2", "Headline1Medium"]} css={textStyle}>
          {values.text}
        </Typography>
        <Flex alignItems="center" justifyContent="center" my={20}>
          <ShareButton
            label={values.cta_primary_text}
            slug={slug}
            language={language}
            url={values.share_url}
            eventName="dojo_glow_hero"
          />
        </Flex>
        <VideoContainer>
          <iframe
            src="https://player.vimeo.com/video/992251560?h=8f0537a067&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title="CD_SayHello_PUBLISH_h264_04"
          ></iframe>
        </VideoContainer>
      </Container>
    </DojoGlowContainer>
  );
};
