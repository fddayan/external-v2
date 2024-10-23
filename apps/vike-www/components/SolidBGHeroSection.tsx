import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Button, Heading, Space, theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const {
  colors: { dt_white },
} = theme;

const Disclaimer = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
`;

const SolidBGContainer = styled.div<{ backgroundColor: string }>`
  padding: 40px 0;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : dt_white)};
`;

const SolidBGTitle = styled.h1`
  font-size: 46px;
  color: ${dt_white};
  text-align: center;
  font-weight: 800;

  ${mediaQueries[0]} {
    font-size: 72px;
  }
`;

const HeroSectionContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 600px;
`;

type SolidBGHeroSectionProps = {
  title?: string;
  subtitle?: string;
  sentence?: string;
  BGColor?: string;
  hero_button_text?: string;
  fullWidthButton?: boolean;
};

const SolidBGHeroSection: React.FC<SolidBGHeroSectionProps> = ({
  title,
  subtitle,
  sentence,
  BGColor,
  hero_button_text,
  fullWidthButton,
}) => {
  const t = useContext(TranslationContext);
  const modalContext = React.useContext(ModalContext);
  function openSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <SolidBGContainer backgroundColor={BGColor}>
      <Container>
        <SolidBGTitle>{t.translate(title)}</SolidBGTitle>
        <HeroSectionContent>
          <Space size="m" />
          <Heading color={dt_white}>{t.translate(subtitle)}</Heading>
          <Space size="m" />
          <Button kind="secondary" onClick={() => openSignupModal()} width={fullWidthButton ? "100%" : ""}>
            {hero_button_text
              ? t.translate(hero_button_text)
              : t.translate("directus.page_landing_common_data.hero_button_text" as string)}
          </Button>
          {sentence && (
            <Disclaimer>
              <span aria-hidden={true}>⭐</span> {t.translate(sentence)} <span aria-hidden={true}>⭐</span>
            </Disclaimer>
          )}
        </HeroSectionContent>
      </Container>
    </SolidBGContainer>
  );
};

export default SolidBGHeroSection;
