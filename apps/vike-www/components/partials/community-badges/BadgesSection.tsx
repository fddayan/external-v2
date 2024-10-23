import React, { useContext, useRef } from "react";
import { theme, Subheading, DetailText, Heading, Space, BodyText, Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { mediaQueries } from "@src/styles/theme";
import { PublicUrlImg } from "@src/types/common";

const {
  colors: { dt_aqua20, dt_grape20, dt_white, dt_taro50, dt_aqua50 },
  radii: { dt_radius_s, dt_radius_m },
  shadows: { dt_shadow_shadezies },
} = theme;

const BadgesSectionContainer = styled.section`
  width: 100%;

  ${mediaQueries[0]} {
    padding: 0 15px;
    margin: auto;
    width: 750px;
  }

  ${mediaQueries[1]} {
    width: 970px;
  }

  ${mediaQueries[2]} {
    width: 1170px;
  }
`;

const TitleWrapper = styled.div`
  padding: 0 15px;

  ${mediaQueries[0]} {
    padding: 0;
  }
`;

const HighBadgesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 12px;
  padding: 24px;
  border-radius: ${dt_radius_m};
  background-color: ${dt_aqua20};

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px;
  }

  ${mediaQueries[2]} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ExpertBadgesGrid = styled(HighBadgesGrid)`
  background-color: ${dt_grape20};
`;

const GiftWrapper = styled.div`
  width: 100%;
  display: flex;

  ${mediaQueries[0]} {
    max-width: 420px;
  }
`;

const GiftImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;

const BadgesItem = styled.div<{ ref?: React.MutableRefObject<HTMLDivElement> }>`
  padding: 18px;
  display: flex;
  border-radius: ${dt_radius_s};
  background-color: ${dt_white};
  box-shadow: ${dt_shadow_shadezies};
`;

const BadgesExpertItem = styled(BadgesItem)`
  display: block;
  position: relative;
  cursor: auto;
`;

const TinyGift = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${dt_white};
  box-shadow: ${dt_shadow_shadezies};
  position: absolute;
  top: -10px;
  right: -10px;
`;

const TinyGiftImage = styled.img`
  width: 32px;
  height: 32px;
`;

const ItemContent = styled.div`
  width: 100%;
  display: flex;
  pointer-events: none;
`;

const BadgeImg = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 10px;
  pointer-events: none;
`;

const ExpertButtons = styled.div`
  display: flex;

  @media (max-width: 374px) {
    flex-direction: column;
  }
`;

const LearnMoreButton = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${dt_aqua50};
  padding: 12px 18px;
  margin: 0;
  cursor: pointer;
  text-align: center;
`;
type Badge = {
  id: string;
  category: string;
  image: PublicUrlImg;
  name: string;
  description: string;
  visible_in_page: boolean;
  survey_url?: boolean;
};
type BadgesSectionProps = {
  high_achiever_title: string;
  expert_title: string;
  expert_text: string;
  content: Badge[];
  gift_icon: any;
  badges_button_text: string;
  claim_badge_button_text: string;
  learn_more_button_text: string;
};

const BadgesSection: React.FC<BadgesSectionProps> = ({
  high_achiever_title,
  expert_title,
  expert_text,
  content,
  gift_icon,
  badges_button_text,
  claim_badge_button_text,
  learn_more_button_text,
}) => {
  const selectedBadge = useRef<HTMLSpanElement | Badge | null>(null);

  const modalContext = useContext(ModalContext);

  const clickedBadge = (el: { id: string }): Badge | null => {
    return content.find((badge: { id: string }) => badge.id === el.id) ?? null;
  };

  function OpenBadgesModal(e: React.MouseEvent<HTMLElement> & { target: { id: string } }) {
    const badge = clickedBadge(e.target);
    selectedBadge.current = badge;
    modalContext.showModal(ModalType.BadgesModal, {
      badge: selectedBadge.current,
      gift_icon,
      badges_button_text,
      claim_badge_button_text,
    });
  }

  return (
    <BadgesSectionContainer>
      <TitleWrapper>
        <Heading>{high_achiever_title}</Heading>
      </TitleWrapper>
      <Space size="m" />
      <HighBadgesGrid>
        {content.map(
          (badge) =>
            badge.category === "high-achiever" && (
              <BadgesItem key={badge.id} id={badge.id} ref={selectedBadge as React.MutableRefObject<HTMLDivElement>}>
                <BadgeImg src={badge.image.file.publicURL} alt="test" />
                <div style={{ pointerEvents: "none" }}>
                  <Subheading>{badge.name}</Subheading>
                  <DetailText>{badge.description}</DetailText>
                </div>
              </BadgesItem>
            ),
        )}
      </HighBadgesGrid>

      <Space size="l" />

      <TitleWrapper>
        <Heading>{expert_title}</Heading>
        <Space size="m" />
        <GiftWrapper>
          <GiftImage src={gift_icon.file.publicURL} alt="gift box" />
          <BodyText color={dt_taro50}>{expert_text}</BodyText>
        </GiftWrapper>
      </TitleWrapper>
      <Space size="m" />
      <ExpertBadgesGrid>
        {content.map(
          (badge) =>
            badge.category === "expert" &&
            badge.visible_in_page && (
              <BadgesExpertItem key={badge.id}>
                <TinyGift>
                  <TinyGiftImage src={gift_icon.file.publicURL} alt="gift box" />
                </TinyGift>
                <ItemContent>
                  <BadgeImg src={badge.image.file.publicURL} alt="test" />
                  <div>
                    <Subheading>{badge.name}</Subheading>
                    <DetailText>{badge.description}</DetailText>
                  </div>
                </ItemContent>
                <Space size="m" />
                <ExpertButtons>
                  <Button
                    size="m"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.stopPropagation();
                    }}
                    href={badge.survey_url ? badge.survey_url : ""}
                    disabled={badge.survey_url === null ? true : false}
                  >
                    {claim_badge_button_text}
                  </Button>
                  <LearnMoreButton
                    id={badge.id}
                    ref={selectedBadge as React.MutableRefObject<HTMLSpanElement>}
                    onClick={OpenBadgesModal}
                  >
                    {learn_more_button_text}
                  </LearnMoreButton>
                </ExpertButtons>
              </BadgesExpertItem>
            ),
        )}
      </ExpertBadgesGrid>
      <Space size="l" />
    </BadgesSectionContainer>
  );
};

export default BadgesSection;
