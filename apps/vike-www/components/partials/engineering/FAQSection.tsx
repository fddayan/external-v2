import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import FAQTile from "@src/components/partials/engineering/FAQTile";
import { theme, Title, Space } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";

const {
  colors: { dt_aqua10 },
} = theme;

const FAQSectionContainer = styled.section`
  padding: 54px 0;
  background-color: ${dt_aqua10};

  ${mediaQueries[0]} {
    padding: 108px 0;
  }
`;

const FAQWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries[0]} {
    max-width: 748px;
    margin: auto;
  }
`;

type FAQSectionProps = {
  faq_title: string;
  faq_items: any;
  translationPath: string;
};

const ResponsiveTitle = styled(Title)`
  font-size: 30px;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

const FAQSection: React.FC<FAQSectionProps> = ({ faq_title, faq_items, translationPath }) => {
  return (
    <>
      <FAQSectionContainer>
        <Container>
          <FAQWrapper>
            <ResponsiveTitle size={2}>
              <Translate path={faq_title} />
            </ResponsiveTitle>
            <Space size="xxl" />
            {faq_items.map((item, idx) => (
              <FAQTile
                key={`item_${idx + 1}`}
                faq_item_title={`${translationPath}faq_items.question_${idx + 1}`}
                faq_item_content={`${translationPath}faq_items.answer_${idx + 1}`}
                faq_index={idx + 1}
              />
            ))}
          </FAQWrapper>
        </Container>
      </FAQSectionContainer>
    </>
  );
};

export default FAQSection;
