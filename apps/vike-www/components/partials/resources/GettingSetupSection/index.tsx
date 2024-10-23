import React, { useContext } from "react";
import {
  theme,
  Title,
  BodyText,
  Space,
  Heading,
} from "@src/components/nessie-web";
import Container from "@src/components/Container";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import MascotSetup from "@src/assets/images/resources/mascot-setup.svg";
import {
  GettingSetupHolder,
  GSTitleWrapper,
  MascotHolder,
  SetupSteps,
  StepContent,
  Step,
  StepButtonHolder,
  StepIcon,
} from "./styles";
import {
  ResourceFeaturesData,
  createResourceEventName,
} from "@src/utils/resources";
import Translate from "@src/components/translation/Translate";
import ResourceDownloadButton from "../ResourceDownloadButton";
import IconFromString from "@src/components/nessie-web/IconFromString";

const iconColors = [
  "dt_tangerine60",
  "dt_kiwi60",
  "dt_mango60",
  "dt_aqua60",
  "dt_grape50",
];

interface SectionProps {
  features: ResourceFeaturesData[];
}

const GettingStartedSection: React.FC<SectionProps> = ({ features }) => {
  const t = useContext(TranslationContext);

  return (
    <>
      <GettingSetupHolder>
        <Container id="get-started">
          <GSTitleWrapper>
            <Space size="xl" />
            <Title size="2" textAlign="center">
              <Translate path="directus.page_resources_2023.get_started_heading" />
            </Title>
            <Space size="xxl" />
          </GSTitleWrapper>
          <MascotHolder>
            <img src={MascotSetup} alt="" />
          </MascotHolder>
          <SetupSteps>
            {features.map((feature, index) => {
              const eventName = createResourceEventName(
                t.translate(feature.title)
              );
              return (
                <Step key={index}>
                  <StepContent className="step-content">
                    <Heading>
                      <Translate path={feature.title} />
                    </Heading>
                    <Space size="s" />
                    <BodyText color="dt_taro90">
                      <Translate path={feature.description} />
                    </BodyText>
                    <Space size="s" />
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
                  </StepContent>
                  <StepIcon
                    bgColor={theme.colors[iconColors[index]]}
                    className="step-icon"
                  >
                    <IconFromString
                      iconName={feature.iconName}
                      color="white"
                      size="m"
                    />
                  </StepIcon>
                </Step>
              );
            })}
          </SetupSteps>
        </Container>
      </GettingSetupHolder>
    </>
  );
};

export default GettingStartedSection;
