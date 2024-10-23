import React from "react";
import { BodyText, Button, Heading } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";
import SvgIcon from "@src/utils/SvgIcon";
import { logEvent } from "@src/utils/logClient";

type ActivityCornerSectionProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  features: {
    icon: string;
    title: string;
    text: string;
  }[];
};

const ActivityCornerSection: React.FC<ActivityCornerSectionProps> = (props) => {
  return (
    <S.Background>
      <S.SectionContainer>
        <Heading>
          <Translate path={props.title} />
          <br />
          <Translate path={props.subtitle} />
        </Heading>
        <Button onClick={() => logEvent("web.external_site.whatsnew.activity_corner.tap")} as="a" href={props.ctaUrl}>
          <Translate path={props.ctaLabel} />
        </Button>
        <S.Activities>
          <S.ActivityCard
            css={{
              backgroundImage: "url(https://static.classdojo.com/uploads/7c4bcd3d-f6bd-4d1f-89f2-1102d8ab923d.jpg)",
            }}
          />
          <S.ActivityCard
            css={{
              backgroundImage: "url(https://static.classdojo.com/uploads/6a74f462-375c-4be3-a2f0-a2eba31c40aa.png)",
            }}
          />
          <S.ActivityCard
            css={{
              backgroundImage: "url(https://static.classdojo.com/uploads/e6c9c5c4-d6e7-4e24-9818-f49992ee35cb.png)",
            }}
          />
        </S.Activities>
        <S.Features>
          <S.Feature>
            <SvgIcon name={props.features[0].icon} size={80} iconColor="#0B2E47" />
            <Heading>
              <Translate path={props.features[0].title} />
            </Heading>
            <BodyText>
              <Translate path={props.features[0].text} />
            </BodyText>
          </S.Feature>
          <S.Divider></S.Divider>
          <S.Feature>
            <SvgIcon name={props.features[1].icon} size={80} iconColor="#0B2E47" />
            <Heading>
              <Translate path={props.features[1].title} />
            </Heading>
            <BodyText>
              <Translate path={props.features[1].text} />
            </BodyText>
          </S.Feature>
        </S.Features>
      </S.SectionContainer>
    </S.Background>
  );
};

export default ActivityCornerSection;
