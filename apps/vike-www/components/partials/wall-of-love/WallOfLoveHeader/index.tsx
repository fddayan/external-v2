import React, { useContext } from "react";
import Container from "@src/components/Container";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import * as S from "./styles";

type CTASectionProps = {
  title: string;
  subtitle?: string;
  bgImage?: string;
  accentBGColor?: string;
};

const WallOfLoveHeader: React.FC<CTASectionProps> = ({ title, subtitle, bgImage, accentBGColor }) => {
  const t = useContext(TranslationContext);

  return (
    <>
      <S.HeaderSectionContainer bgImage={bgImage} accentBGColor={accentBGColor}>
        <Container>
          <S.CTAContent>
            <S.HeaderContent>
              <S.CTATitle>{t.translate(title)}</S.CTATitle>
              <S.HeaderSubtitle>{t.translate(subtitle)}</S.HeaderSubtitle>
            </S.HeaderContent>
          </S.CTAContent>
        </Container>
      </S.HeaderSectionContainer>
      <S.HeaderSectionMobile accentBGColor={accentBGColor}>
        <Container>
          <S.HeaderContentMobile>
            <S.CTATitle>{t.translate(title)}</S.CTATitle>
            <S.HeaderSubtitle>{t.translate(subtitle)}</S.HeaderSubtitle>
          </S.HeaderContentMobile>
        </Container>
      </S.HeaderSectionMobile>
    </>
  );
};

WallOfLoveHeader.defaultProps = {
  accentBGColor: "white",
};

export default WallOfLoveHeader;
