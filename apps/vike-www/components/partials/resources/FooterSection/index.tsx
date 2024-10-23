import React from "react";
import { Space, Title, Heading } from "@src/components/nessie-web";
import Container from "@src/components/Container";
import * as S from "./styles";
import Translate from "@src/components/translation/Translate";
import ResourceDownloadButton from "../ResourceDownloadButton";
import { resourcesLogBaseName } from "@src/utils/resources";

interface SectionProps {
  url: string;
}

const FooterSection: React.FC<SectionProps> = ({ url }) => {
  return (
    <S.Header>
      <Container>
        <S.FooterContent>
          <Title as="h1" size="3" color="white">
            <Translate path="directus.page_resources_2023.footer_heading" />
          </Title>
          <Space size="m" />
          <Heading color="white">
            <Translate path="directus.page_resources_2023.footer_tagline" />
          </Heading>
          <Space size="m" />
          <S.FooterButtonHolder>
            <ResourceDownloadButton
              path={url}
              eventName={resourcesLogBaseName + "helpdesk"}
            >
              <Translate path="directus.page_resources_2023.footer_button_label" />
            </ResourceDownloadButton>
          </S.FooterButtonHolder>
        </S.FooterContent>
      </Container>
    </S.Header>
  );
};

export default FooterSection;
