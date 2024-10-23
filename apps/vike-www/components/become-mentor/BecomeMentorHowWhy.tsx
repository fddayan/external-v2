import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Title, Heading } from "../new-nessie";
import { Button, Space, theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { FormButton } from "../partials/mentors/HeroSection/styles";
import ReactMarkdown from "react-markdown";
import { MentorApplicationUserProps, MentorApplicationContentBox } from "@src/www/become-mentor";
import { justifyContent } from "styled-system";

const {
  colors: { dt_white },
} = theme;

const Disclaimer = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
`;

const SolidBGContainer = styled.div<{ backgroundColor: string }>`
  padding: 40px 0;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : dt_white)};
`;

const SolidBGTitle = styled.h1`
  font-size: 46px;
  color: ${dt_white};
  text-align: center;
  font-weight: 800;

  ${mediaQueries[0]} {
    font-size: 72px;
  }
`;

const HeroSectionContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 600px;
`;

const BecomeMentorHowWhy: React.FC<MentorApplicationUserProps> = ({ user, onFormButtonClick }) => {
  const t = useContext(TranslationContext);
  const modalContext = React.useContext(ModalContext);
  function openSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <div
      css={{
        backgroundColor: "#8A56EF",
        backgroundImage: "url('https://static.classdojo.com/img/2024/05/pattern-purple.svg')",
        backgroundSize: "cover",
        paddingTop: 60,
        paddingBottom: 150,
      }}
    >
      <Container css={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "center" }}>
        <Title css={{ color: "white", textAlign: "center", maxWidth: 800 }}>
          {t.translate("directus.become_mentor.why_how_heading")}
        </Title>
        <div css={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
          <MentorApplicationContentBox>
            <ReactMarkdown>{t.translate("directus.become_mentor.why_copy")}</ReactMarkdown>
          </MentorApplicationContentBox>
          <MentorApplicationContentBox>
            <ReactMarkdown>{t.translate("directus.become_mentor.how_copy")}</ReactMarkdown>
          </MentorApplicationContentBox>
        </div>
        <FormButton onClick={onFormButtonClick}>
          {user
            ? `${t.translate("directus.become_mentor.cta_logged")}`
            : `${t.translate("directus.become_mentor.cta_unlogged")}`}
        </FormButton>
      </Container>
    </div>
  );
};

export default BecomeMentorHowWhy;
