import * as React from "react";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import { Button, theme, Heading } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";
import { TranslationType } from "@src/components/translation/TranslationContext";
import SubscriptionForm, { SubscriptionFormProps } from "../SubscriptionForm";

const CtaButton = ({ href, children }) => (
  <Flex justifyContent="flex-start" paddingTop="20px">
    <Button href={href} target="_blank">
      {children}
    </Button>
  </Flex>
);

type Props = {
  contentData: {
    header?: string | TranslationType;
    features: {
      title: string | TranslationType;
      description: string | TranslationType;
      form?: SubscriptionFormProps;
      button?: {
        text: string | TranslationType;
        href: string | TranslationType;
      };
      custom?: any;
      img?: any;
    }[];
    cta?: {
      text: string | TranslationType;
      href: string | TranslationType;
    };
  };
  numbered?: boolean;
  inverted?: boolean;
  dark?: boolean;
  lightDark?: boolean;
  signupCta?: boolean;
  wide?: boolean;
  transparency?: boolean;
};
const FeaturesSection: React.FC<Props> = ({
  contentData,
  numbered,
  inverted,
  dark,
  signupCta,
  wide,
  transparency,
  lightDark,
}: Props) => {
  const modalContext = React.useContext(ModalContext);
  function openSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <Box
      as="section"
      bg={
        dark
          ? theme.colors.taro40
          : lightDark
            ? theme.colors.taro10
            : theme.colors.white
      }
    >
      <Container width={["100%", 750, 970, "100vw"]}>
        {contentData.header && (
          <Box textAlign="center">
            <S.SectionTitle dark={dark}>{contentData.header}</S.SectionTitle>
          </Box>
        )}
        {contentData.features.map((c, i) => {
          const itemIndex = i + 1;
          const isOdd = inverted ? itemIndex % 2 == 1 : itemIndex % 2 == 0;
          return (
            <S.FeatureContainer
              key={i}
              flexDirection={["column-reverse", isOdd ? "row-reverse" : "row"]}
              alignItems="center"
              justifyContent={wide ? "space-between" : "center"}
            >
              <S.FeaturesColumn>
                <S.FeaturesInfo
                  textAlign={["center", "left"]}
                  width="100%"
                  dark={dark}
                >
                  <Heading css={S.textColor(dark)}>
                    {numbered && (
                      <S.FeaturesNumber>{itemIndex}</S.FeaturesNumber>
                    )}
                    {c.title}
                  </Heading>
                  <S.FeaturesText>{c.description}</S.FeaturesText>
                  {c.button && (
                    <CtaButton href={c.button.href}>{c.button.text}</CtaButton>
                  )}
                  {c.form && <SubscriptionForm {...c.form} />}
                </S.FeaturesInfo>
              </S.FeaturesColumn>
              <S.FeaturesColumn>
                {c.custom ? (
                  <S.CustomComponentContainer>
                    {c.custom}
                  </S.CustomComponentContainer>
                ) : transparency ? (
                  <S.TranparentFeaturesBoxImgStory
                    image={c.img}
                    loading="eager"
                    alt={`${c.title} image`}
                  />
                ) : (
                  <S.FeaturesBoxImgStory
                    image={c.img}
                    loading="eager"
                    alt={`${c.title} image`}
                  />
                )}
              </S.FeaturesColumn>
            </S.FeatureContainer>
          );
        })}
        <Box maxWidth="600px" margin="30px auto 60px">
          {contentData.cta && (
            <a href={contentData.cta.href.toString()}>
              <Button kind="primary" width="100%">
                {contentData.cta.text}
              </Button>
            </a>
          )}
          {signupCta && (
            <Button
              kind="secondary"
              onClick={() => openSignupModal()}
              width="100%"
            >
              <Translate path="directus.page_landing_common_data.hero_button_text" />
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
