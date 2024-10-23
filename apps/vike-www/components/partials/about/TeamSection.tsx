import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Title, Space, BodyText, Heading } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro30, dt_taro50 },
  shadows: { dt_shadow_shadezies },
} = theme;

const TeamSectionContainer = styled.section`
  padding: 54px 0;
  text-align: left;

  ${mediaQueries[0]} {
    padding: 100px 0;
    text-align: center;
  }
`;

const TeamTitle = styled(Title)<{ alignCenter: boolean }>`
  max-width: ${(props) => (props.alignCenter ? "100%" : "200px")};
  ${(props) => (props.alignCenter ? "text-align: center;" : "")}

  ${mediaQueries[0]} {
    max-width: unset;
  }
  font-size: 30px;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

const TeamSectionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-top: 54px;
  row-gap: 24px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const TeamTile = styled.div`
  width: 100%;
  border: 3px solid ${dt_taro30};
  border-radius: 30px;
  box-shadow: ${dt_shadow_shadezies};
  overflow: hidden;
  align-self: flex-start;

  ${mediaQueries[0]} {
    &:nth-child(2) {
      margin-top: 218px;
    }

    &:nth-child(3) {
      margin-top: -218px;
    }
  }

  ${mediaQueries[1]} {
    &:nth-child(2) {
      margin-top: 218px;
    }

    &:nth-child(3) {
      margin-top: 436px;
    }
  }
`;

const TeamTileImage = styled.img`
  width: 100%;
  height: 440px;
  object-fit: cover;
`;

const TeamTileContent = styled.div`
  padding: 48px;
  text-align: left;
`;

type TeamSectionProps = {
  team_title: string;
  team_item_image_1: any;
  team_item_image_alt_1: string;
  team_item_username_1: string;
  team_item_role_1: string;
  team_item_text_1: string;
  team_item_image_2: any;
  team_item_image_alt_2: string;
  team_item_username_2: string;
  team_item_role_2: string;
  team_item_text_2: string;
  team_item_image_3: any;
  team_item_image_alt_3: string;
  team_item_username_3: string;
  team_item_role_3: string;
  team_item_text_3: string;
  title_align_center: boolean;
};

const TeamSection: React.FC<TeamSectionProps> = ({
  team_title,
  team_item_image_1,
  team_item_image_alt_1,
  team_item_username_1,
  team_item_role_1,
  team_item_text_1,
  team_item_image_2,
  team_item_image_alt_2,
  team_item_username_2,
  team_item_role_2,
  team_item_text_2,
  team_item_image_3,
  team_item_image_alt_3,
  team_item_username_3,
  team_item_role_3,
  team_item_text_3,
  title_align_center,
}) => {
  return (
    <TeamSectionContainer>
      <Container>
        <TeamTitle size={2} alignCenter={title_align_center}>
          {team_title}
        </TeamTitle>
        <TeamSectionContent>
          <TeamTile>
            <TeamTileImage src={team_item_image_1.file.publicURL} alt={team_item_image_alt_1} />
            <TeamTileContent>
              <Heading>{team_item_username_1}</Heading>
              <BodyText>{team_item_role_1}</BodyText>
              <Space size="m" />
              <BodyText color={dt_taro50}>{team_item_text_1}</BodyText>
            </TeamTileContent>
          </TeamTile>
          <TeamTile>
            <TeamTileImage src={team_item_image_2.file.publicURL} alt={team_item_image_alt_2} />
            <TeamTileContent>
              <Heading>{team_item_username_2}</Heading>
              <BodyText>{team_item_role_2}</BodyText>
              <Space size="m" />
              <BodyText color={dt_taro50}>{team_item_text_2}</BodyText>
            </TeamTileContent>
          </TeamTile>
          <TeamTile>
            <TeamTileImage src={team_item_image_3.file.publicURL} alt={team_item_image_alt_3} />
            <TeamTileContent>
              <Heading>{team_item_username_3}</Heading>
              <BodyText>{team_item_role_3}</BodyText>
              <Space size="m" />
              <BodyText color={dt_taro50}>{team_item_text_3}</BodyText>
            </TeamTileContent>
          </TeamTile>
        </TeamSectionContent>
      </Container>
    </TeamSectionContainer>
  );
};

export default TeamSection;
