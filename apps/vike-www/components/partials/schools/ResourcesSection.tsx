import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { Subheading, Button, Space, Title, theme } from "@src/components/nessie-web";
import { FolderIcon, ComputerIcon, MessagesIcon } from "@classdojo/web/nessie/icons";
import { logEvent } from "@src/utils/logClient";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const {
  colors: { dt_taro30 },
} = theme;

const ResourcesSectionContainer = styled.section`
  width: 100%;
  margin: 54px 0px;
`;

const ResourcesContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border-bottom: 2px solid ${dt_taro30};

  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;

const ResourcesTextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 36px 0;

  ${mediaQueries[1]} {
    width: 50%;
    padding: 96px 0;
  }
`;

const ResourcesImgBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mediaQueries[1]} {
    width: 50%;
    align-items: flex-end;
  }
`;

const ResourcesImage = styled.img`
  width: 100%;
  max-width: 485px;
  display: block;
`;

const TextContentWrapper = styled.div`
  width: 100%;

  ${mediaQueries[1]} {
    max-width: 450px;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: -6px;

  ${mediaQueries[0]} {
    width: fit-content;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: -6px;

  ${mediaQueries[2]} {
    flex-direction: row;
  }
`;

const ResourcesButton = styled(Button)`
  margin-right: 24px;
  width: 100%;

  ${mediaQueries[0]} {
    width: fit-content;
  }
`;

type ResourcesSectionProps = {
  resources_title: string;
  resources_button_text: string;
  resources_button_url: string;
  resources_help_text: string;
  resources_webinar_button_text: string;
  resources_webinar_button_url?: string;
  resources_message_button_text: string;
  resources_image: any;
  resources_image_alt: string;
  params: any;
  location: any;
};

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resources_title,
  resources_button_text,
  resources_button_url,
  resources_help_text,
  resources_webinar_button_text,
  resources_webinar_button_url,
  resources_message_button_text,
  resources_image,
  resources_image_alt,
  params,
  location,
}) => {
  const t = useContext(TranslationContext);

  const fireResourcesPackEvent = () => {
    logEvent({
      eventName: "teacher.classdojo_school.click_get_resource_pack",
      eventValue: location.href,
      metadata: params,
    });
  };

  const fireLiveDemoEvent = () => {
    logEvent({
      eventName: "teacher.classdojo_school.click_get_live_demo",
      eventValue: location.href,
      metadata: params,
    });
  };
  const fireMessageEvent = () => {
    logEvent({
      eventName: "teacher.classdojo_school.click_send_message",
      eventValue: location.href,
      metadata: params,
    });
  };

  return (
    <>
      <ResourcesSectionContainer>
        <Container>
          <ResourcesContent>
            <ResourcesTextBlock>
              <TextContentWrapper>
                <Title size={2}>{t.translate(resources_title)}</Title>
                <Space size="m" />
                <ButtonWrapper>
                  <Button
                    width={["100%", "fit-content"]}
                    icon={<FolderIcon />}
                    href={resources_button_url}
                    onClick={fireResourcesPackEvent}
                  >
                    {t.translate(resources_button_text)}
                  </Button>
                </ButtonWrapper>
                <Space size="xl" />
                <Subheading>{t.translate(resources_help_text)}</Subheading>
                <Space size="m" />
                <ButtonsContainer>
                  {resources_webinar_button_url && (
                    <ResourcesButton
                      href={resources_webinar_button_url}
                      size="m"
                      kind="tertiary"
                      target="_blank"
                      icon={<ComputerIcon />}
                      onClick={fireLiveDemoEvent}
                    >
                      {t.translate(resources_webinar_button_text)}
                    </ResourcesButton>
                  )}
                  <Space size="s" />
                  <ResourcesButton
                    href="https://classdojo.zendesk.com/hc/en-us/requests/new?ticket_form_id=5552100880525"
                    size="m"
                    kind="tertiary"
                    target="_blank"
                    icon={<MessagesIcon />}
                    onClick={fireMessageEvent}
                  >
                    {t.translate(resources_message_button_text)}
                  </ResourcesButton>
                </ButtonsContainer>
              </TextContentWrapper>
            </ResourcesTextBlock>
            <ResourcesImgBlock>
              <ResourcesImage src={resources_image.file.publicURL} alt={t.translate(resources_image_alt) as string} />
            </ResourcesImgBlock>
          </ResourcesContent>
        </Container>
      </ResourcesSectionContainer>
    </>
  );
};

export default ResourcesSection;
