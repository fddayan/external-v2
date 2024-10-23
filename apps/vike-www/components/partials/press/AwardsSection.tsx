import React, { useContext } from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { BodyText, Space, Title, theme } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const {
  colors: { dt_taro10 },
} = theme;

const AwardsSectionContainer = styled.section`
  width: 100%;
  background-color: ${dt_taro10};
  text-align: center;
  padding: 75px 0;

  ${mediaQueries[0]} {
    padding: 150px 0;
  }
`;

const AwardsContent = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 245px;
  grid-gap: 30px;
  max-width: 1440px;
  margin: auto;

  ${mediaQueries[0]} {
    grid-template-columns: 245px 245px;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 245px 245px 245px;
  }
`;

type AwardsSectionProps = {
  awards_title: string;
  awards_data: { award_image_url: string; award_image_alt: string; award_text: string }[];
};

const AwardsSection: React.FC<AwardsSectionProps> = ({ awards_title, awards_data }) => {
  const t = useContext(TranslationContext);
  return (
    <AwardsSectionContainer>
      <Container>
        <Title size={1}>
          <Translate path={awards_title} />
        </Title>
        <Space size="xl" />
        <AwardsContent>
          {awards_data.map((award, idx) => (
            <div key={`award_${idx + 1}`}>
              <img src={award.award_image_url} alt={t.translate(award.award_image_alt) as string} />
              <BodyText>
                <Translate path={award.award_text} />
              </BodyText>
            </div>
          ))}
        </AwardsContent>
      </Container>
    </AwardsSectionContainer>
  );
};

export default AwardsSection;
