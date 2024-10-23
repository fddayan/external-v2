import React, { useContext } from "react";
import { Button, Title, MailIcon } from "@src/components/nessie-web";
import * as S from "./styles";
import { TranslationContext } from "@src/components/translation/TranslationContext";

export interface GotInspoProps {
  footerHeading: string;
  footerTagline: string;
  footerButtonLabel: string;
  footerButtonURL: string;
  darkBackground?: boolean;
}

const GotInspo: React.FC<GotInspoProps> = ({
  darkBackground,
  footerHeading,
  footerTagline,
  footerButtonLabel,
  footerButtonURL,
}) => {
  const { translate: t } = useContext(TranslationContext);
  return (
    <S.Background darkBackground={darkBackground}>
      <S.Container>
        <Title size={2}>{t(footerHeading)}</Title>
        <S.Tagline>{t(footerTagline)}</S.Tagline>
        <Button icon={<MailIcon />} href={footerButtonURL} target="_blank" rel="noreferrer">
          {t(footerButtonLabel)}
        </Button>
      </S.Container>
    </S.Background>
  );
};

export default GotInspo;
