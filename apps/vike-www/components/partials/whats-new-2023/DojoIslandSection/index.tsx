import React, { useRef } from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import Translate from "@src/components/translation/Translate";
import { Button, BodyText, Heading, Subheading } from "@src/components/new-nessie";
import * as S from "./styles";
import { PlayIcon } from "@src/components/nessie-web";
import { logEvent } from "@src/utils/logClient";

type DojoIslandSectionProps = {
  videoUrl: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  features: {
    icon: string;
    title: string;
    text: string;
  }[];
};

const DojoIslandSection: React.FC<DojoIslandSectionProps> = (props) => {
  return (
    <S.SectionContainer>
      <S.VideoContainer>
        <S.Video
          src="https://static.classdojo.com/uploads/19e97f79-e899-4053-a2a8-a11f627e8ec2.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/*
        <S.VideoControls>
          <button>
            <PlayIcon color="white" size="l" />
          </button>
        </S.VideoControls>
        */}
      </S.VideoContainer>
      <Heading>
        <Translate path={props.title} />
        <br />
        <Translate path={props.subtitle} />
      </Heading>
      <Button
        as="a"
        onClick={() => logEvent("web.external_page.whatsnew.dojo_islands.tap")}
        href="https://www.classdojo.com/ul/t/home?target=dojoIslands"
      >
        <Translate path={props.ctaLabel} />
      </Button>
      <S.FeaturesContainer>
        {props.features.map((feature, index) => (
          <S.Feature key={index}>
            <Subheading>
              <Translate path={feature.title} />
            </Subheading>
            <BodyText>
              <Translate path={feature.text} />
            </BodyText>
            <S.FeatureImage src={feature.icon} />
          </S.Feature>
        ))}
      </S.FeaturesContainer>
      {/* <img
        src="https://static.classdojo.com/uploads/7f8d3ef7-c26a-4c38-9aa1-f308e1e85c0b.png"
        css={{ position: "absolute", bottom: -70, right: -120 }}
        alt="Illustration"
      /> */}
    </S.SectionContainer>
  );
};

export default DojoIslandSection;
