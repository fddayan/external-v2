import React from "react";
import { Space, theme, Subheading, DetailText, DetailHeading, Button } from "@src/components/nessie-web";
import CommonModal from "./CommonModal";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  borders: { dt_border_card },
  radii: { dt_radius_s },
} = theme;

const BadgeModalImg = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 12px;
`;

const BadgeModalTitle = styled.h1`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.25px;

  ${mediaQueries[0]} {
    font-size: 30px;
    line-height: 36px;
    letter-spacing: -0.35px;
  }
`;

const BadgeModalTile = styled.div`
  width: 100%;
  padding: 24px;
  border: ${dt_border_card};
  border-radius: ${dt_radius_s};
`;

const PrizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RewardText = styled.div`
  flex-grow: 1;
`;

const PrizeWinner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-left: -6px;
`;

const PrizeImg = styled.img`
  width: 54px;
  height: 54px;
  margin-right: 6px;
`;

const PrizeWinnerAvatar = styled.img`
  height: 96px;
`;

const BadgesButton = styled(Button)`
  width: fit-content;
`;

type BadgesModalProps = {
  badge: any;
  gift_icon: any;
  closeModal: () => void;
  badges_button_text: string;
  claim_badge_button_text: string;
};

const BadgesModal = ({
  badge,
  gift_icon,
  closeModal,
  badges_button_text,
  claim_badge_button_text,
}: BadgesModalProps) => {
  const isExpert = badge.category === "expert";

  return (
    <CommonModal noHeader closeModal={closeModal}>
      <BadgeModalImg onClick={closeModal} src={badge.image.file.publicURL} />
      <BadgeModalTitle>{badge.name}</BadgeModalTitle>
      <Space size="m" />
      <BadgeModalTile>
        <Subheading>{badge.modal_heading ? badge.modal_heading : "modal heading"}</Subheading>
        <DetailText>{badge.modal_description ? badge.modal_description : "modal description"}</DetailText>
        <Space size="l" />
        <ButtonWrapper>
          <BadgesButton kind="secondary" href={badge.poster_pack}>
            {badges_button_text}
          </BadgesButton>
        </ButtonWrapper>
      </BadgeModalTile>
      {isExpert && (
        <>
          <Space size="m" />
          <PrizeWrapper>
            <PrizeWinner>
              <PrizeImg src={gift_icon.file.publicURL} />
              <RewardText>
                <DetailHeading>{badge.reward ? badge.reward : "reward"}</DetailHeading>
                <Subheading>{badge.reward_title ? badge.reward_title : "reward title"}</Subheading>
              </RewardText>
              <PrizeWinnerAvatar src={badge.reward_image === null ? "" : badge.reward_image.file.publicURL} />
            </PrizeWinner>
          </PrizeWrapper>
        </>
      )}
      {isExpert && (
        <>
          <Space size="l" />
          <Button
            width={"100%"}
            href={badge.survey_url ? badge.survey_url : ""}
            disabled={badge.survey_url === null ? true : false}
          >
            {claim_badge_button_text}
          </Button>
        </>
      )}
    </CommonModal>
  );
};

export default BadgesModal;
