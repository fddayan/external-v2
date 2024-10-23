import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Title, Heading } from "../new-nessie";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { FormButton } from "../partials/mentors/HeroSection/styles";
import ReactMarkdown from "react-markdown";
import { MentorApplicationUserProps, MentorApplicationContentBox } from "@src/www/become-mentor";

const BecomeMentorQuestions: React.FC<MentorApplicationUserProps> = ({ user, onFormButtonClick }) => {
  const t = useContext(TranslationContext);

  return (
    <div
      css={{
        backgroundColor: "rgba(254, 200, 141, 0.21)",
        backgroundImage: "url('https://static.classdojo.com/img/2024/05/pattern-sand.svg')",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 60,
      }}
    >
      <img
        src="https://static.classdojo.com/img/2024/05/mojo-celebration.svg"
        css={{ margin: "-100px auto 30px auto", width: 300 }}
        alt=""
      />
      <Container
        css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}
      >
        <Title css={{ textAlign: "center", maxWidth: 800 }}>
          {t.translate("directus.become_mentor.questions_heading")}
        </Title>
        <div css={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          <MentorApplicationContentBox>
            <ReactMarkdown>{t.translate("directus.become_mentor.question_1")}</ReactMarkdown>
          </MentorApplicationContentBox>
          <MentorApplicationContentBox>
            <ReactMarkdown>{t.translate("directus.become_mentor.question_2")}</ReactMarkdown>
          </MentorApplicationContentBox>
        </div>
        <div css={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          <MentorApplicationContentBox css={{ position: "relative", maxWidth: 700, paddingRight: 150 }}>
            <ReactMarkdown>{t.translate("directus.become_mentor.more_for_mentors")}</ReactMarkdown>
            <img
              src="https://static.classdojo.com/img/2024/05/mojo-sunglasses.svg"
              css={{ position: "absolute", bottom: -20, right: -20 }}
              alt=""
            />
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

export default BecomeMentorQuestions;
