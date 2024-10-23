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

const ClubsSectionContainer = styled.section`
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

const ClubsContent = styled.div`
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

const ClubsImg = styled.img`
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

const ClubsGrid = styled.div`
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

const ClubsItem = styled.div`
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

const ClubsButton = styled(Button)`
  width: fit-content;
`;

type ClubsSectionProps = {
  clubs_title: string;
  clubs_mentor_title: string;
  clubs_mentor_text: string;
  clubs_mentor_button_text: string;
  clubs_mentor_button_url: string;
  clubs_ambassador_title: string;
  clubs_ambassador_text: string;
  clubs_ambassador_button_text: string;
  clubs_ambassador_button_url: string;
  clubs_background_image_url: string;
};

const ClubsSection: React.FC<ClubsSectionProps> = ({
  clubs_title,
  clubs_mentor_title,
  clubs_mentor_text,
  clubs_mentor_button_text,
  clubs_ambassador_title,
  clubs_ambassador_text,
  clubs_ambassador_button_text,
  clubs_background_image_url,
  clubs_mentor_button_url,
  clubs_ambassador_button_url,
}) => {
  return (
    <>
      <ClubsSectionContainer>
        <WaveContainer>
          <svg viewBox="0 0 500 40">
            <path d="M0, 20 C220, 60 200, 0 500, 30 L500, 00 L0, 0 Z"></path>
          </svg>
        </WaveContainer>
        <Container>
          <ClubsContent>
            <ClubsImg src={clubs_background_image_url} alt="club members photos" />
            <Title size={1}>{clubs_title}</Title>
            <ClubsGrid>
              <ClubsItem>
                <Subheading>{clubs_mentor_title}</Subheading>
                <BodyText color={dt_taro50}>{clubs_mentor_text}</BodyText>
                <Space size="s" />
                <ButtonWrapper>
                  <ClubsButton size="m" href={clubs_mentor_button_url} target="_blank">
                    {clubs_mentor_button_text}
                  </ClubsButton>
                </ButtonWrapper>
              </ClubsItem>

              <ClubsItem>
                <Subheading>{clubs_ambassador_title}</Subheading>
                <BodyText color={dt_taro50}>{clubs_ambassador_text}</BodyText>
                <Space size="s" />
                <ButtonWrapper>
                  <ClubsButton size="m" href={clubs_ambassador_button_url} target="_blank">
                    {clubs_ambassador_button_text}
                  </ClubsButton>
                </ButtonWrapper>
              </ClubsItem>
            </ClubsGrid>
          </ClubsContent>
        </Container>
      </ClubsSectionContainer>
    </>
  );
};

export default ClubsSection;
