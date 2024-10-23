import React, { useContext } from "react";
import { Title, BodyText, Space } from "@src/components/nessie-web";
import tmpRocketImg from "@src/assets/images/resources/tmp-rocketship.png";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import {
  ContentContainer,
  CustomizeBubbleRow,
  BubbleOne,
  BubbleTwo,
  BubbleThree,
  BubbleFour,
  RocketHolder,
  RocketSection,
} from "./styles";
import {
  ResourceFeaturesData,
  createResourceEventName,
} from "@src/utils/resources";
import ResourceDownloadButton from "../ResourceDownloadButton";

interface SectionProps {
  features: ResourceFeaturesData[];
}

const CustomizeForYourWorld: React.FC<SectionProps> = ({ features }) => {
  const t = useContext(TranslationContext);

  const featuresEventName: string[] = features.map((feature) => {
    return createResourceEventName(t.translate(feature.title));
  });

  return (
    <ContentContainer id="customize">
      <Space size="xl" />
      <Title as="h2" size={2} textAlign="center">
        <Translate path="directus.page_resources_2023.customization_heading" />
      </Title>
      <Space size="xxl" />
      <CustomizeBubbleRow>
        <BubbleOne>
          <Title>
            <Translate path={features[0].title} />
          </Title>
          <BodyText>
            <Translate path={features[0].description} />
          </BodyText>
          <ResourceDownloadButton
            path={features[0].url}
            eventName={featuresEventName[0]}
          >
            <Translate path={features[0].label} />
            {!features[0].hasResource && (
              <>
                {" "}
                <Translate path="layouts.main.in_english" />
              </>
            )}
          </ResourceDownloadButton>
        </BubbleOne>
        <BubbleTwo>
          <Title>
            <Translate path={features[1].title} />
          </Title>
          <BodyText>
            <Translate path={features[1].description} />
          </BodyText>
          <ResourceDownloadButton
            path={features[1].url}
            eventName={featuresEventName[1]}
          >
            <Translate path={features[1].label} />
            {!features[1].hasResource && (
              <>
                {" "}
                <Translate path="layouts.main.in_english" />
              </>
            )}
          </ResourceDownloadButton>
        </BubbleTwo>
      </CustomizeBubbleRow>
      <RocketHolder>
        <RocketSection src={tmpRocketImg} />
      </RocketHolder>
      <CustomizeBubbleRow>
        <BubbleThree>
          <Title>
            <Translate path={features[2].title} />
          </Title>
          <BodyText>
            <Translate path={features[2].description} />
          </BodyText>
          <ResourceDownloadButton
            path={features[2].url}
            eventName={featuresEventName[2]}
          >
            <Translate path={features[2].label} />
          </ResourceDownloadButton>
        </BubbleThree>
        <BubbleFour>
          <Title>
            <Translate path={features[3].title} />
          </Title>
          <BodyText>
            <Translate path={features[3].description} />
          </BodyText>
          <ResourceDownloadButton
            path={features[3].url}
            eventName={featuresEventName[3]}
          >
            <Translate path={features[3].label} />
            {!features[3].hasResource && (
              <>
                {" "}
                <Translate path="layouts.main.in_english" />
              </>
            )}
          </ResourceDownloadButton>
        </BubbleFour>
      </CustomizeBubbleRow>
    </ContentContainer>
  );
};

export default CustomizeForYourWorld;
