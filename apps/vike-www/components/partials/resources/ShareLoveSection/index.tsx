import React, { useContext } from "react";
import {
  theme,
  Title,
  BodyText,
  Space,
  Heading,
  HeartIcon,
  StoryIcon,
  InviteIcon,
} from "@src/components/nessie-web";
import IconFromString from "@src/components/nessie-web/IconFromString";
import Container from "@src/components/Container";
import * as S from "./styles";
import {
  ResourceFeaturesData,
  createResourceEventName,
} from "@src/utils/resources";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Translate from "@src/components/translation/Translate";
import ResourceDownloadButton from "../ResourceDownloadButton";

const iconColors = ["dt_mango60", "dt_tangerine60", "dt_grape50"];

interface SectionProps {
  features: ResourceFeaturesData[];
}

const ShareLoveSection: React.FC<SectionProps> = ({ features }) => {
  const t = useContext(TranslationContext);

  return (
    <Container paddingTop={60} id="share">
      <Space size="xl" />
      <Title size="2" textAlign="center">
        <Translate path="directus.page_resources_2023.share_the_love_heading" />
      </Title>
      <Space size="xxl" />
      <S.ShareOptionWrap>
        {features.map((feature, index) => {
          const eventName = createResourceEventName(t.translate(feature.title));
          return (
            <S.ShareOption key={index}>
              <S.ShareIcon bgColor={theme.colors[iconColors[index]]}>
                <IconFromString iconName={feature.iconName} color="white" />
              </S.ShareIcon>
              <Space size="s" />
              <Heading>
                <Translate path={feature.title} />
              </Heading>
              <Space size="s" />
              <BodyText>
                <Translate path={feature.description} />
              </BodyText>
              <Space size="m" />
              <ResourceDownloadButton path={feature.url} eventName={eventName}>
                <Translate path={feature.label} />
                {!feature.hasResource && (
                  <>
                    {" "}
                    <Translate path="layouts.main.in_english" />
                  </>
                )}
              </ResourceDownloadButton>
            </S.ShareOption>
          );
        })}
      </S.ShareOptionWrap>
    </Container>
  );
};

export default ShareLoveSection;
