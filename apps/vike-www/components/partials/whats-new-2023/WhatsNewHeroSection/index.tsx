import React from "react";
import { BodyText, DetailHeading, Title } from "@src/components/new-nessie";
import { IGatsbyImageData } from "gatsby-plugin-image";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";

type WhatsNewHeroSectionProps = {
  background: string[];
  heroImage: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
  title: string;
  subtitle: string;
  videoCtaLabel: string;
  videoId: string;
  openVideoModal: () => void;
};

const WhatsNewHeroSection: React.FC<WhatsNewHeroSectionProps> = (props) => (
  <S.Background image={props.background}>
    <S.HeroContainer>
      <img
        css={{ width: "80%", maxWidth: 440 }}
        src="https://static.classdojo.com/uploads/57e176e4-31b1-46a2-a1d7-bce250f82fe9.png"
        alt="trophy"
      />
      <Title>
        <Translate path={props.title} />
      </Title>
      <DetailHeading>
        <Translate path={props.subtitle} />
      </DetailHeading>
      <S.VideoChip onClick={props.openVideoModal}>
        <img src={`https://img.youtube.com/vi/${props.videoId}/default.jpg`} alt="video thumbnail" />
        <BodyText>
          <Translate path={props.videoCtaLabel} />
        </BodyText>
      </S.VideoChip>
    </S.HeroContainer>
  </S.Background>
);

export default WhatsNewHeroSection;
