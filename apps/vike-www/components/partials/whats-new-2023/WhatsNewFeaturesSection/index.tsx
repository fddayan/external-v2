import React from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { BodyText, Button, Heading } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";
import { logEvent } from "@src/utils/logClient";

type WhatsNewFeaturesSectionProps = {
  image: { filename_disk: string };
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaUrl: string;
  eventName: string;
  features: {
    title: string;
    text: string;
  }[];
};

const WhatsNewFeaturesSection: React.FC<WhatsNewFeaturesSectionProps> = (props) => {
  return (
    <S.SectionContainer>
      <S.Image src={`https://static.classdojo.com/uploads/${props.image.filename_disk}`} alt="" loading="lazy" />
      <Heading>
        <Translate path={props.title} />
        {props.subtitle && (
          <>
            <br />
            <Translate path={props.subtitle} />
          </>
        )}
      </Heading>
      <Button onClick={() => logEvent(props.eventName)} as="a" href={props.ctaUrl}>
        <Translate path={props.ctaLabel} />
      </Button>
      <S.Features>
        {props.features.map((feature, index) => (
          <S.Feature key={index}>
            <BodyText>
              <strong>
                <Translate path={feature.title} />
              </strong>{" "}
              <Translate path={feature.text} />
            </BodyText>
          </S.Feature>
        ))}
      </S.Features>
    </S.SectionContainer>
  );
};

export default WhatsNewFeaturesSection;
