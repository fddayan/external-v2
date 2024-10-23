import React from "react";
import * as S from "./styles";
import { Button } from "@src/components/nessie-web";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface DistrictLeaderAProps {
  heading: string;
  tagline: string;
  features: {
    icon: {
      name: string;
      color: string;
    };
    text: string;
  }[];
  calendlyEmbed: string;
  oneToOneCallText: string;
  oneToOneCallQuestion: string;
  oneToOneCallCtaText: string;
  oneToOneCallAvatar: { childImageSharp: { gatsbyImageData: IGatsbyImageData } };
  oneToOneCallQuote: string;
  moreInfoQuestion: string;
  moreInfoCtaLabel: string;
  moreInfoCtaAction: () => void;
}

const DistrictLeaderA: React.FC<DistrictLeaderAProps> = (props) => {
  return (
    <S.Background>
      <S.PageContainer>
        <S.TextSection>
          <h1>{props.heading}</h1>
          <p>{props.tagline}</p>
          <ul>
            {props.features.map((feature, index) => (
              <li key={index}>{feature.text}</li>
            ))}
          </ul>
          <p>{props.oneToOneCallText}</p>
          <p>{props.oneToOneCallQuestion}</p>
          <p>
            <em>{props.oneToOneCallCtaText}</em>
          </p>
        </S.TextSection>
        <S.CalendarSection>
          <S.Quote>
            <S.QuoteAvatar image={props.oneToOneCallAvatar.childImageSharp.gatsbyImageData} alt="" />
            <S.QuoteText>{props.oneToOneCallQuote}</S.QuoteText>
          </S.Quote>
          <S.CalendarIframe src={props.calendlyEmbed} />
          <p>{props.moreInfoQuestion}</p>
          <Button kind="plus" onClick={props.moreInfoCtaAction}>
            {props.moreInfoCtaLabel}
          </Button>
        </S.CalendarSection>
      </S.PageContainer>
    </S.Background>
  );
};

export default DistrictLeaderA;
