import React, { useContext } from "react";
import Container from "@src/components/Container";
import { Space, DetailText, Button, Heading, theme, BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro20, dt_taro90 },
} = theme;

const TraitsSectionContainer = styled.section`
  padding-bottom: 54px;
`;

const TraitsTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${dt_taro90};
  margin: 0 auto;
  margin-bottom: 54px;
  border-top: solid 2px ${dt_taro20};
  padding-top: 54px;

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 30px;
    line-height: 100%;
    letter-spacing: -0.5px;
    margin-top: -40px;
  }
`;

const TraitsContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 30px;
  border-bottom: 3px solid ${dt_taro20};

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-bottom: none;
  }
`;

const Trait = styled.div`
  text-align: center;
  padding: 0 40px;

  ${mediaQueries[1]} {
    text-align: left;
    padding: 0;
  }
`;

const TraitIcon = styled.img`
  width: 80px;
  height: 80px;
`;

type TraitsSectionProps = {
  traits_title: string;
  content: { title: string; text: string; icon_url: string }[];
  translationPath: string;
};

const TraitsSection: React.FC<TraitsSectionProps> = ({ traits_title, content, translationPath }) => {
  const t = useContext(TranslationContext);
  return (
    <TraitsSectionContainer>
      <Container>
        <TraitsTitle>{t.translate(traits_title)}</TraitsTitle>
        <TraitsContent>
          {content.map((trait, index) => (
            <Trait key={index}>
              <TraitIcon src={trait.icon_url} alt="icon" />
              <Space size="m" />
              <Heading>{t.translate(`${translationPath}title_${index + 1}`)}</Heading>
              <Space size="m" />
              <BodyText>{t.translate(`${translationPath}text_${index + 1}`)}</BodyText>
              <Space size="m" />
            </Trait>
          ))}
        </TraitsContent>
      </Container>
    </TraitsSectionContainer>
  );
};

export default TraitsSection;
