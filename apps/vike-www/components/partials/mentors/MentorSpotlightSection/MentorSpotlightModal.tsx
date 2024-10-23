import React, { Dispatch, SetStateAction, useContext } from "react";
import * as S from "./styles";
import Container from "@src/components/Container";
import { Button, DetailText, Heading, Space } from "@src/components/nessie-web";
import { CloseIcon } from "@classdojo/web/nessie/icons";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";

type MentorSpotlightModalProps = {
  mentor: { avatar_url: string; index: number };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isMentor: boolean;
};

const MentorSpotlightModal: React.FC<MentorSpotlightModalProps> = ({ mentor, isOpen, setIsOpen, isMentor }) => {
  const t = useContext(TranslationContext);

  const carouselIndexIncrement = isMentor ? 2 : 1;

  if (!isOpen) {
    return null;
  }

  return (
    <S.MentorSpotlightModalContainer>
      <Container>
        <S.SpotlightCard>
          <S.SpotlightAvatar
            src={mentor.avatar_url}
            alt={t.translate(`directus.page_mentors.mentors.name_${mentor.index + carouselIndexIncrement}`) as string}
          />
          <Space size="m" />
          <S.SpotlightContent>
            <S.SpotlightTextContent>
              <Heading>
                <Translate path={`directus.page_mentors.mentors.name_${mentor.index + carouselIndexIncrement}`} />
              </Heading>
              <Space size="s" />
              <S.SchoolTextWrapper>
                <DetailText>
                  <Translate path={`directus.page_mentors.mentors.school_${mentor.index + carouselIndexIncrement}`} />
                </DetailText>
              </S.SchoolTextWrapper>
              <Space size="m" />
              <div>
                <DetailText>
                  <Translate
                    path={`directus.page_mentors.mentors.description_${mentor.index + carouselIndexIncrement}`}
                  />
                </DetailText>
              </div>
            </S.SpotlightTextContent>
            <S.CloseButtonWrapper>
              <Button onClick={() => setIsOpen(false)} size="s" kind="secondary" icon={<CloseIcon />}></Button>
            </S.CloseButtonWrapper>
          </S.SpotlightContent>
        </S.SpotlightCard>
      </Container>
    </S.MentorSpotlightModalContainer>
  );
};

export default MentorSpotlightModal;
