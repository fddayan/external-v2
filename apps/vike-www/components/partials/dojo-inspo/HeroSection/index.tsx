import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import * as S from "./styles";

interface HeroSectionProps {
  heroHeading: string;
  heroTagline: string;
  heroImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroHeading, heroTagline, heroImage }) => {
  const { translate: t } = useContext(TranslationContext);
  return (
    <S.HeroBackground>
      <S.HeroGrid>
        <S.HeadingContainer>
          <S.HeroTitle size={3}>{t(heroHeading)}</S.HeroTitle>
          <S.HeroHeading>{t(heroTagline)}</S.HeroHeading>
        </S.HeadingContainer>
        <S.HeroImage src={heroImage} alt="" placeholder="blurred" />
      </S.HeroGrid>
    </S.HeroBackground>
  );
};

export default HeroSection;
