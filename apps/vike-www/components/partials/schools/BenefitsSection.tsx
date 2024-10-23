import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Subheading, BodyText, Button, Space, Title } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white, dt_aqua10, dt_taro50 },
  radii: { dt_radius_s },
  shadows: { dt_shadow_shadezies },
} = theme;

const BenefitsSectionContainer = styled.section`
  background-color: ${dt_aqua10};
  position: relative;
  overflow: hidden;
`;

const WaveContainer = styled.div`
  display: inline-block;
  width: 100%;
  pointer-events: none;

  svg {
    display: inline-block;
    vertical-align: bottom;

    path {
      stroke: none;
      fill: ${dt_white};
    }
  }
`;

const BenefitsContent = styled.div`
  padding: 36px 15px 24px;
  text-align: center;
  position: relative;

  ${mediaQueries[0]} {
    padding: 36px 0 24px;
  }

  ${mediaQueries[1]} {
    text-align: left;
  }
`;

const BenefitsImg = styled.img`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  width: 420px;
  max-width: unset;

  ${mediaQueries[0]} {
    width: 500px;
    top: 90px;
  }

  ${mediaQueries[1]} {
    transform: unset;
    left: unset;
    top: unset;
    width: 660px;
    bottom: -12px;
    right: -144px;
  }
`;

const BenefitsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 12px;
  margin-top: 180px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 24px;
  }
`;

const BenefitsItem = styled.div`
  padding: 24px;
  border-radius: ${dt_radius_s};
  background-color: ${dt_white};
  cursor: pointer;
  text-align: left;
  box-shadow: ${dt_shadow_shadezies};
  z-index: 2;
`;

const ButtonWrapper = styled.div`
  margin-left: -6px;
`;

const BenefitsButton = styled(Button)`
  width: fit-content;
`;

type BenefitsSectionProps = {
  benefits_title: string;
  benefits_mentor_title: string;
  benefits_mentor_text: string;
  benefits_mentor_button_text: string;
  benefits_mentor_button_url: string;
  benefits_ambassador_title: string;
  benefits_ambassador_text: string;
  benefits_ambassador_button_text: string;
  benefits_ambassador_button_url: string;
  benefits_background_image_url: string;
};

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits_title,
  benefits_mentor_title,
  benefits_mentor_text,
  benefits_mentor_button_text,
  benefits_ambassador_title,
  benefits_ambassador_text,
  benefits_ambassador_button_text,
  benefits_background_image_url,
  benefits_mentor_button_url,
  benefits_ambassador_button_url,
}) => {
  return (
    <>
      <BenefitsSectionContainer>
        <WaveContainer>
          <svg viewBox="0 0 500 40">
            <path d="M0, 20 C220, 60 200, 0 500, 30 L500, 00 L0, 0 Z"></path>
          </svg>
        </WaveContainer>
        <Container>
          <BenefitsContent>
            <BenefitsImg src={benefits_background_image_url} alt="club members photos" />
            <Title size={1}>{benefits_title}</Title>
            <BenefitsGrid>
              <BenefitsItem>
                <Subheading>{benefits_mentor_title}</Subheading>
                <BodyText color={dt_taro50}>{benefits_mentor_text}</BodyText>
                <Space size="s" />
                <ButtonWrapper>
                  <BenefitsButton size="m" href={benefits_mentor_button_url} target="_blank">
                    {benefits_mentor_button_text}
                  </BenefitsButton>
                </ButtonWrapper>
              </BenefitsItem>

              <BenefitsItem>
                <Subheading>{benefits_ambassador_title}</Subheading>
                <BodyText color={dt_taro50}>{benefits_ambassador_text}</BodyText>
                <Space size="s" />
                <ButtonWrapper>
                  <BenefitsButton size="m" href={benefits_ambassador_button_url} target="_blank">
                    {benefits_ambassador_button_text}
                  </BenefitsButton>
                </ButtonWrapper>
              </BenefitsItem>
            </BenefitsGrid>
          </BenefitsContent>
        </Container>
      </BenefitsSectionContainer>
    </>
  );
};

export default BenefitsSection;
