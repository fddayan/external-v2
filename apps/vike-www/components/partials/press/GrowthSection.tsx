import React from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import { Heading, theme, BodyText } from "@src/components/nessie-web";

const {
  colors: { dt_taro10, dt_taro50, dt_taro90 },
  radii: { dt_radius_s },
} = theme;

const GrowthSectionContainer = styled.section`
  width: 100%;
`;

const GrowthContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  padding: 30px;
  max-width: 1440px;
  margin: auto;

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr;
  }
`;

const GrowthTextBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 0;
`;

const GrowthTextContainer = styled.div`
  max-width: 410px;
`;

const GrowthNumbersBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
  }
`;

const GrowthTile = styled.div`
  border-radius: ${dt_radius_s};
  background-color: ${dt_taro10};
  width: 100%;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 24px;

  ${mediaQueries[0]} {
    padding: 64px 48px;
  }
`;

const GrowthNumbers = styled.h2`
  font-weight: 800;
  font-size: 48px;
  line-height: 48px;
  letter-spacing: -4px;
  margin: 0;
  color: ${dt_taro90};

  ${mediaQueries[0]} {
    font-size: 96px;
    line-height: 96px;
  }
`;

type GrowthSectionProps = {
  growth_text: string;
  features: { text: string; numbers: string }[];
};

const GrowthSection: React.FC<GrowthSectionProps> = ({ growth_text, features }) => {
  return (
    <GrowthSectionContainer>
      <GrowthContent>
        <GrowthTextBlock>
          <GrowthTextContainer>
            <Heading>
              <Translate path={growth_text} />
            </Heading>
          </GrowthTextContainer>
        </GrowthTextBlock>
        <GrowthNumbersBlock>
          {features.map((feature, idx) => (
            <GrowthTile key={`feature_${idx + 1}`}>
              <GrowthNumbers>
                <Translate path={feature.numbers} />
              </GrowthNumbers>
              <BodyText color={dt_taro50}>
                <Translate path={feature.text} />
              </BodyText>
            </GrowthTile>
          ))}
        </GrowthNumbersBlock>
      </GrowthContent>
    </GrowthSectionContainer>
  );
};

export default GrowthSection;
