import React from "react";
import { BodyText, Button, Heading } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";
import SvgIcon from "@src/utils/SvgIcon";
import { logEvent } from "@src/utils/logClient";

type SmallUpdatesSectionProps = {
  image: string;
  title: string;
  features: {
    icon: string;
    imageUrl: string;
    title: string;
    text: string;
    ctaLabel: string;
    ctaUrl: string;
    eventName: string;
  }[];
};

const SmallUpdatesSection: React.FC<SmallUpdatesSectionProps> = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <S.SectionContainer>
        <S.BlobImage src="https://static.classdojo.com/uploads/272323a4-a589-4fdb-a4ec-95726d115354.png" />
        <div></div>
        <div>
          <Heading>
            <Translate path={props.title} />
          </Heading>
          <SvgIcon name="Turn.Down.Left" size={64} iconColor="#1A192D" />
        </div>
        <S.Features>
          {props.features.map((feature, index) => (
            <S.Feature key={index}>
              <S.FeatureImageContainer>
                <img src={feature.imageUrl} alt="" css={{ display: "block" }} />
              </S.FeatureImageContainer>
              <S.FeatureContent>
                <SvgIcon name={feature.icon} size={84} iconColor="red" />
                <Heading>
                  <Translate path={feature.title} />
                </Heading>
                <BodyText>
                  <Translate path={feature.text} />
                </BodyText>
                <Button onClick={() => logEvent(feature.eventName)} as="a" href={feature.ctaUrl} noIcon>
                  <Translate path={feature.ctaLabel} />
                </Button>
              </S.FeatureContent>
            </S.Feature>
          ))}
        </S.Features>
      </S.SectionContainer>
    </div>
  );
};

export default SmallUpdatesSection;
