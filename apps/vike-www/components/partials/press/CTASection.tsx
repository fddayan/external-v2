import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import { Title, Space, Button } from "@src/components/nessie-web";
import { FileIcon, MailIcon } from "@classdojo/web/nessie/icons";

const CTASectionContainer = styled.section`
  width: 100%;
  padding: 75px 0;

  ${mediaQueries[0]} {
    padding: 150px 0;
  }
`;

const CTAContent = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${mediaQueries[0]} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CTATextContent = styled.div`
  flex: 1;
  max-width: 665px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CTAImage = styled.img`
  display: none;
  width: 100%;
  max-width: 312px;

  ${mediaQueries[0]} {
    display: block;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: -6px;

  ${mediaQueries[1]} {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

type CTASectionProps = {
  cta_text: string;
  cta_contact_button_text: string;
  cta_kit_button_text: string;
  cta_image: string;
  contact_button_url: string;
  press_kit_button_url: string;
};

const CTASection: React.FC<CTASectionProps> = ({
  cta_text,
  cta_contact_button_text,
  cta_kit_button_text,
  cta_image,
  contact_button_url,
  press_kit_button_url,
}) => {
  return (
    <CTASectionContainer>
      <Container>
        <CTAContent>
          <CTATextContent>
            <Title size={1}>
              <Translate path={cta_text} />
            </Title>
            <Space size="l" />
            <ButtonsWrapper>
              <Button href={contact_button_url} icon={<MailIcon />}>
                <Translate path={cta_contact_button_text} />
              </Button>
              <Space size="l" />
              <Space size="l" kind="inline" />
              <Button href={press_kit_button_url} icon={<FileIcon />}>
                <Translate path={cta_kit_button_text} />
              </Button>
            </ButtonsWrapper>
          </CTATextContent>
          <CTAImage src={cta_image} alt="mailing mojo" />
        </CTAContent>
      </Container>
    </CTASectionContainer>
  );
};

export default CTASection;
