import React from "react";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import * as S from "./styles";
import Container from "@src/components/Container";
import { Button, Space, Subheading, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";

type CTASectionProps = {
  user: string;
};

const CTASection: React.FC<CTASectionProps> = ({ user }) => {
  const modalContext = React.useContext(ModalContext);
  function openLoginModal() {
    modalContext.showModal(ModalType.Login, { noRedirect: true });
  }
  function openSurveyModal() {
    modalContext.showModal(ModalType.JoinTheClubModal);
  }

  if (user && user === "notTeacher") return null;

  return (
    <S.CTASectionContainer>
      <Container>
        <S.CTASectionFlex>
          {user ? (
            <>
              <S.CTASectionFlexChild>
                <Title size={1}>
                  <Translate path="directus.page_mentors.cta_1_title" />
                </Title>
                <Space size="s" />
                <Subheading size={1}>
                  <Translate path="directus.page_mentors.cta_1_text" />
                </Subheading>
                <Space size="s" />
                <Button onClick={openSurveyModal}>
                  <Translate path="directus.page_mentors.cta_1_button_text" />
                </Button>
              </S.CTASectionFlexChild>
              <Space size="xxl" />
            </>
          ) : (
            <S.CTASectionFlexChild>
              <Title size={1}>
                <Translate path="directus.page_mentors.cta_2_title" />
              </Title>
              <Space size="s" />
              <Subheading size={1}>
                <Translate path="directus.page_mentors.cta_2_text" />
              </Subheading>
              <Space size="s" />
              <Button onClick={openLoginModal}>
                <Translate path="directus.page_mentors.cta_2_button_text" />
              </Button>
            </S.CTASectionFlexChild>
          )}
        </S.CTASectionFlex>
      </Container>
    </S.CTASectionContainer>
  );
};

export default CTASection;
