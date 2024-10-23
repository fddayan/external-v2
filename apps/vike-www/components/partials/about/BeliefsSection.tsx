import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Title, Space, BodyText, Subheading } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro30, dt_taro50 },
} = theme;

const BeliefsSectionContainer = styled.section`
  padding: 100px 0;
`;

const BeliefsSectionHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${mediaQueries[0]} {
    flex-direction: row;
    max-width: 900px;
    padding: 24px 36px;
    margin: auto;
  }
`;

const BeliefsSectionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    max-width: 900px;
    margin: auto;
    padding: 0 36px;
  }
`;

const ContentItem = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${dt_taro30};
  padding: 18px 0;

  &:last-of-type {
    border-bottom: none;
    padding: 18px 0 0;

    ${mediaQueries[0]} {
      padding: 36px 15px;
    }
  }

  ${mediaQueries[0]} {
    padding: 36px 15px;
    border-bottom: 3px solid ${dt_taro30};

    &:nth-child(3),
    &:nth-child(4) {
      border-bottom: none;
    }

    &:first-of-type {
      &:after {
        content: "";
        height: calc(100% - 60px);
        width: 3px;
        position: absolute;
        top: 36px;
        right: -16px;
        transform: translateX(-50%);
        background-color: ${dt_taro30};
      }
    }

    &:last-of-type {
      &:after {
        content: "";
        height: calc(100% - 60px);
        width: 3px;
        position: absolute;
        top: 24px;
        left: -12px;
        transform: translateX(-50%);
        background-color: ${dt_taro30};
      }
    }
  }
`;

const AboutTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0 6px 0;

  ${mediaQueries[0]} {
    width: 50%;
    padding: 0 15px;
  }
`;

const AboutImgBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 30px;

  ${mediaQueries[0]} {
    width: 50%;
    margin-bottom: 0;
    padding: 0 15px;
  }
`;

const AboutTitle = styled(Title)`
  font-size: 42px;
`;

type BeliefsSectionProps = {
  beliefs_title: string;
  beliefs_text: string;
  beliefs_image: any;
  beliefs_image_alt: string;
  beliefs_items: any;
};

const BeliefsSection: React.FC<BeliefsSectionProps> = ({
  beliefs_title,
  beliefs_text,
  beliefs_image,
  beliefs_image_alt,
  beliefs_items,
}) => {
  return (
    <BeliefsSectionContainer>
      <Container>
        <BeliefsSectionHeader>
          <AboutTextBlock>
            <AboutTitle>{beliefs_title}</AboutTitle>
            <Space size="m" />
            <BodyText>{beliefs_text}</BodyText>
          </AboutTextBlock>
          <AboutImgBlock>
            <img src={beliefs_image.file.publicURL} alt={beliefs_image_alt} />
          </AboutImgBlock>
        </BeliefsSectionHeader>

        <BeliefsSectionContent>
          <ContentItem>
            <Space size="s" />
            <Subheading>{beliefs_items[0].title}</Subheading>
            <Space size="s" />
            <BodyText color={dt_taro50}>{beliefs_items[0].text}</BodyText>
          </ContentItem>

          <ContentItem>
            <Subheading>{beliefs_items[1].title}</Subheading>
            <Space size="s" />
            <BodyText color={dt_taro50}>{beliefs_items[1].text}</BodyText>
          </ContentItem>

          <ContentItem>
            <Subheading>{beliefs_items[2].title}</Subheading>
            <Space size="s" />
            <BodyText color={dt_taro50}>{beliefs_items[2].text}</BodyText>
          </ContentItem>

          <ContentItem>
            <Subheading>{beliefs_items[3].title}</Subheading>
            <Space size="s" />
            <BodyText color={dt_taro50}>{beliefs_items[3].text}</BodyText>
          </ContentItem>
        </BeliefsSectionContent>
      </Container>
    </BeliefsSectionContainer>
  );
};

export default BeliefsSection;
