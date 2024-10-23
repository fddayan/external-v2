import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { Title, Subheading } from "../new-nessie";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { FormButton } from "../partials/mentors/HeroSection/styles";
import { MentorApplicationUserProps } from "@src/www/become-mentor";

const HeroSectionContent = styled.div`
  padding-block: 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 800px;
  gap: 24px;
`;

const BecomeMentorHero: React.FC<MentorApplicationUserProps> = ({ user, onFormButtonClick }) => {
  const t = useContext(TranslationContext);

  return (
    <Container>
      <HeroSectionContent>
        <Title css={{ color: "#1A192D", margin: 0 }}>{t.translate("directus.become_mentor.Title")}</Title>
        <Subheading css={{ color: "#5D5D8F", margin: 0 }}>{t.translate("directus.become_mentor.hero_copy")}</Subheading>
        <FormButton onClick={onFormButtonClick}>
          {user
            ? `${t.translate("directus.become_mentor.cta_logged")}`
            : `${t.translate("directus.become_mentor.cta_unlogged")}`}
        </FormButton>
      </HeroSectionContent>
    </Container>
  );
};

export default BecomeMentorHero;
