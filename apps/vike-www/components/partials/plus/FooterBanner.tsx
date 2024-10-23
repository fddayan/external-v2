import React, { useContext } from "react";
import styled from "@emotion/styled";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { BodyText, Button, theme } from "@src/components/nessie-web";
import { PublicUrlImg } from "@src/types/common";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";

interface FooterBannerProps {
  imageSrc: PublicUrlImg;
  imageAlt: string;
  bannerText: string;
  buttonLabel: string;
  buttonUrl: string;
}

const Banner = styled(Container)`
  margin: ${theme.space.s}px;
  background-color: ${theme.colors.dt_grape20};
  border-radius: ${theme.radii.dt_radius_m};
  padding: ${theme.space.m}px;
  display: grid;
  grid-gap: ${theme.space.s}px;
  justify-items: center;
  ${mediaQueries[0]} {
    align-items: center;
    grid-template-columns: auto minmax(50%, 720px) auto;
    grid-gap: ${theme.space.l}px;
    padding: ${theme.space.xl}px;
    margin: ${theme.space.l}px auto;
  }
`;

const Icon = styled("img")`
  height: 32px;
`;

const FooterBanner: React.FC<FooterBannerProps> = (props) => {
  const { translate: t } = useContext(TranslationContext);
  return (
    <Banner>
      <Icon src={props.imageSrc.file.publicURL} alt={t(props.imageAlt).toString()} />
      <BodyText>{t(props.bannerText)}</BodyText>
      <Button kind="plus" href={props.buttonUrl}>
        {t(props.buttonLabel)}
      </Button>
    </Banner>
  );
};

export default FooterBanner;
