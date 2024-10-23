import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import FAQTile from "@src/components/partials/schools/FAQTile";
import { Title, Space, Button, BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { mediaQueries } from "@src/styles/theme";

const FAQSectionContainer = styled.section`
  padding: 48px 0;
`;

const FAQWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries[0]} {
    max-width: 575px;
    margin: auto;
  }
`;

type FAQSectionProps = {
  faq_title: string;
  faq_items: any;
  faq_item_caret_alt: string;
  translationPath: string;
  faq_question: string;
  classdojo_help_link_text: string;
  classdojo_help_link_url: string;
};

const FAQSection: React.FC<FAQSectionProps> = ({
  faq_title,
  faq_items,
  faq_item_caret_alt,
  translationPath,
  faq_question,
  classdojo_help_link_text,
  classdojo_help_link_url,
}) => {
  const t = useContext(TranslationContext);

  return (
    <>
      <FAQSectionContainer>
        <Container>
          <FAQWrapper>
            <Title size={1}>{t.translate(faq_title)}</Title>
            <Space size="m" />
            {faq_items.map((item, idx) => (
              <FAQTile
                key={`item_${idx + 1}`}
                faq_item_title={`${translationPath}faq_items.title_${idx + 1}`}
                faq_item_content={`${translationPath}faq_items.content_${idx + 1}`}
                faq_item_caret_alt={faq_item_caret_alt}
              />
            ))}
            <Space size="l" />
            <BodyText>{t.translate(faq_question)}</BodyText>
            <Space size="m" />
            <Button href={classdojo_help_link_url} kind="tertiary" size="m">
              {t.translate(classdojo_help_link_text)}
            </Button>
          </FAQWrapper>
        </Container>
      </FAQSectionContainer>
    </>
  );
};

export default FAQSection;
