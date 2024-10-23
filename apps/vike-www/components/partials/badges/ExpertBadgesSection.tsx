import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, Heading, Button, Space, BodyText } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { navigate } from "gatsby";
import { getRelativePath } from "@src/utils/routes";

const {
  colors: { dt_taro50, dt_grape40, dt_grape50, dt_grape60 },
} = theme;

const ExpertBadgesSectionContainer = styled.section`
  padding: 15px 0;

  ${mediaQueries[1]} {
    padding: 0;
  }
`;

const ExpertContent = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

const ExpertTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${mediaQueries[0]} {
    width: 50%;
    padding: 0 15px;
  }
`;

const GiftIcon = styled.img`
  display: none;

  ${mediaQueries[0]} {
    display: block;
  }
`;

const ExpertImgBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 30px;

  ${mediaQueries[0]} {
    width: 50%;
    margin-bottom: 0;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: -6px;
`;

const ExpertButton = styled(Button)`
  div {
    background-color: ${dt_grape50};

    &:hover {
      background-color: ${dt_grape60};
    }

    &:active {
      background-color: ${dt_grape40};
    }
  }
`;

type ExpertBadgesSectionProps = {
  expert_image: any;
  expert_image_alt: string;
  expert_icon: any;
  expert_icon_alt: string;
  expert_title: string;
  expert_text: string;
  expert_button_text: string;
  expert_button_url: string;
};

const ExpertBadgesSection: React.FC<ExpertBadgesSectionProps> = ({
  expert_image,
  expert_image_alt,
  expert_icon,
  expert_icon_alt,
  expert_title,
  expert_text,
  expert_button_text,
  expert_button_url,
}) => {
  return (
    <ExpertBadgesSectionContainer>
      <Container>
        <ExpertContent>
          <ExpertImgBlock>
            <img src={expert_image.file.publicURL} alt={expert_image_alt} />
          </ExpertImgBlock>
          <ExpertTextBlock>
            <GiftIcon src={expert_icon.file.publicURL} alt={expert_icon_alt} />
            <Space size="s" />
            <Heading>{expert_title}</Heading>
            <BodyText color={dt_taro50}>{expert_text}</BodyText>
            <ButtonWrapper>
              <Space size="m" />
              <ExpertButton onClick={() => navigate(getRelativePath(expert_button_url))}>
                {expert_button_text}
              </ExpertButton>
            </ButtonWrapper>
          </ExpertTextBlock>
        </ExpertContent>
      </Container>
    </ExpertBadgesSectionContainer>
  );
};

export default ExpertBadgesSection;
