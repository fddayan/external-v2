import React, { useContext } from "react";
import { Space, Heading, BodyText, Button } from "@src/components/nessie-web";
import Container from "@src/components/Container";

import featureOne from "@src/assets/images/resources/feature-1.svg";
import featureTwo from "@src/assets/images/resources/feature-2.svg";
import featureThree from "@src/assets/images/resources/feature-3.svg";
import featureFour from "@src/assets/images/resources/feature-4.svg";

import {
  FeatureSection,
  FeatureWrapper,
  FeaturePairBlock,
  FeatureImgBlock,
  FeatureImage,
  FeatureTextBlock,
  FeatureTextContent,
  FeatureButtonHolder,
} from "./styles";
import {
  ResourceFeaturesData,
  createResourceEventName,
} from "@src/utils/resources";
import Translate from "@src/components/translation/Translate";
import ResourceDownloadButton from "../ResourceDownloadButton";
import { TranslationContext } from "@src/components/translation/TranslationContext";

interface SectionProps {
  features: ResourceFeaturesData[];
}

const AlternatedFeaturesSection: React.FC<SectionProps> = ({ features }) => {
  const t = useContext(TranslationContext);

  return (
    <FeatureSection>
      <Container>
        <FeatureWrapper>
          {features.map((feature, index) => {
            const eventName = createResourceEventName(
              t.translate(feature.title)
            );
            return (
              <FeaturePairBlock key={index}>
                <FeatureImgBlock>
                  <FeatureImage src={feature.imageUrl} alt="Feature" />
                </FeatureImgBlock>
                <FeatureTextBlock>
                  <FeatureTextContent>
                    <Heading>
                      <Translate path={feature.title} />
                    </Heading>
                    <Space size="s" />
                    <BodyText>
                      <Translate path={feature.description} />
                    </BodyText>
                    <Space size="m" />
                    <ResourceDownloadButton
                      path={feature.url}
                      eventName={eventName}
                    >
                      <Translate path={feature.label} />
                      {!feature.hasResource && (
                        <>
                          {" "}
                          <Translate path="layouts.main.in_english" />
                        </>
                      )}
                    </ResourceDownloadButton>
                  </FeatureTextContent>
                </FeatureTextBlock>
              </FeaturePairBlock>
            );
          })}
        </FeatureWrapper>
      </Container>
    </FeatureSection>
  );
};

export default AlternatedFeaturesSection;
