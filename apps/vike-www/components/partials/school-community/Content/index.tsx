/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import { Button, Heading, PlayIcon, Space, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";
import Container from "@src/components/Container";

type SchoolCommunityContentProps = {
  videoUrl: string;
  primaryCtaUrl: string;
  secondaryCtaUrl: string;
};

const SchoolCommunityContent: React.FC<SchoolCommunityContentProps> = ({
  videoUrl,
  primaryCtaUrl,
  secondaryCtaUrl,
}) => {
  return (
    <S.Background>
      <Container>
        <Title size={3}>
          <Translate path="directus.page_school_community.heading" />
        </Title>
        <Title as="p">
          <Translate path="directus.page_school_community.subheading" />
        </Title>
        <Space size="l" />
        <S.VideoContainer>
          <video src={videoUrl} width="100%" controls />
        </S.VideoContainer>
        <Space size="l" />
        <Heading>
          <Translate path="directus.page_school_community.tagline" />
        </Heading>
        <Space size="s" />
        <S.CTAContainer>
          <Button href={primaryCtaUrl}>
            <Translate path="directus.page_school_community.primary_cta_label" />
          </Button>
          <Button kind="tertiary" size="m" href={secondaryCtaUrl}>
            <Translate path="directus.page_school_community.secondary_cta_label" />
          </Button>
        </S.CTAContainer>
      </Container>
    </S.Background>
  );
};
export default SchoolCommunityContent;
