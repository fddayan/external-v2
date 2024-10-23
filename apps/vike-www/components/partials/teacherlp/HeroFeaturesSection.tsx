import * as React from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import { useEffect, useContext, useRef } from "react";
import { AppDataContext } from "@src/components/AppDataContext";
import { useStaticQuery, graphql } from "gatsby";
import { DeprecatedDetailText, Button } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
  margin-left: 0;
  ${mediaQueries[0]} {
    margin-left: 40px;
    alignitems: center;
  }
`;
InfoBox.defaultProps = {
  flexDirection: "column",
  alignItems: ["center", "center", "start"],
};

const InfoBoxImg = styled(GatsbyImageWrapper)`
  min-width: 200px;
  display: none;
  ${mediaQueries[2]} {
    display: block;
    max-width: unset;
    width: 520px;
  }
`;

const InfoBoxItemImg = styled(GatsbyImageWrapper)`
  min-width: 60px;
  ${mediaQueries[1]} {
    min-width: 75px;
  }
`;
const InfoBoxHeader = styled("h3")`
  color: #2c2a50;
  font-size: 18px;
  line-height: 24px;
  margin-top: 0;
  font-weight: 800;
  width: 100%;
`;

const InfoBoxText = styled("p")`
  color: #2c2a50;
  font-size: 18px;
  line-height: 24px;
  width: 100%;
  margin-bottom: 10px;
`;

const Feature = ({ img, title, text }) => (
  <Flex marginBottom={["15px", "25px"]}>
    <Box minWidth={[60, 60, 75]}>
      <InfoBoxItemImg image={img} alt="Info item icon" />
    </Box>
    <Box marginLeft="20px">
      <InfoBoxHeader>{title}</InfoBoxHeader>
      <InfoBoxText>{text}</InfoBoxText>
    </Box>
  </Flex>
);
Feature.defaultProps = {};

const HeroSectionStyled = styled(Flex)`
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  padding-bottom: 60px;
  margin-top: 22px;
`;

HeroSectionStyled.defaultProps = {};

function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}

const InfoBoxTitle = styled("h1")`
  color: #2c2a50;
  font-size: 42px;
  line-height: 42px;
  margin-bottom: 20px;
  margin-top: 20px !important;
  @media (max-width: 577px) {
    font-size: 30px;
    line-height: 36px;
  }
  font-weight: 800;
  margin-top: 0;
  color: #2c2a50;
  width: 100%;
`;

const HeroFeaturesSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_teacherlp {
          classroomImg: hero_image {
            filename_disk
          }
          top1: feature_one_image {
            filename_disk
          }
          top2: feature_two_image {
            filename_disk
          }
          top3: feature_three_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_teacherlp: { classroomImg, top1, top2, top3 },
    },
  } = data;

  const modalContext = React.useContext(ModalContext);
  const t = React.useContext(TranslationContext);
  const featureFlags = useFeatureFlagsWithOverrides();

  // const referalCode = useQueryParam('fbclid', null) // key, defaultValue

  function openSignupModal() {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.from_homepage.sign_up.tap",
      metadata: featureFlags,
    });
    modalContext.showModal(ModalType.Signup);
  }

  useDidUpdateEffect(() => {
    logEvent({
      eventName: "web.external_page.homepage.page_view",
      eventValue: window.location.href,
      metadata: featureFlags,
    });
  }, [featureFlags]);

  return (
    <HeroSectionStyled>
      <Container>
        <Box textAlign="center" marginBottom={["10px", "40px"]}>
          <InfoBoxTitle>{t.translate("directus.page_teacherlp.title")}</InfoBoxTitle>
        </Box>
        <Box display={["block", "none", "none"]} textAlign="center" marginBottom="40px">
          <Button kind="primary" onClick={() => openSignupModal()} width="100%">
            <Translate path="directus.page_landing_common_data.hero_button_text" />
          </Button>
          <br />
          <DeprecatedDetailText>Loved by teachers in 95% of US schools</DeprecatedDetailText>
        </Box>
        <Flex flexDirection={["column", "column", "row"]} marginBottom={[0, 0, 80]}>
          <div>
            <InfoBoxImg image={classroomImg} alt="Teacher watching a ClassDojo video" />
          </div>
          <InfoBox mt={[0, 20]} mr={[0, 20]}>
            <Box marginBottom={20}>
              <Feature
                img={top1}
                title={t.translate("directus.page_teacherlp.feature_one_title")}
                text={t.translate("directus.page_teacherlp.feature_one_text")}
              />
              <Feature
                img={top2}
                title={t.translate("directus.page_teacherlp.feature_two_title")}
                text={t.translate("directus.page_teacherlp.feature_two_text")}
              />
              <Feature
                img={top3}
                title={t.translate("directus.page_teacherlp.feature_three_title")}
                text={t.translate("directus.page_teacherlp.feature_three_text")}
              />
            </Box>
            <Box display={["none", "block", "block"]}>
              <Button kind="primary" onClick={() => openSignupModal()} width="100%" marginBottom="20px">
                <Translate path="directus.page_landing_common_data.hero_button_text" />
              </Button>
              <br />
              <DeprecatedDetailText>{t.translate("directus.page_teacherlp.detail_text")}</DeprecatedDetailText>
            </Box>
          </InfoBox>
        </Flex>
      </Container>
    </HeroSectionStyled>
  );
};

export default HeroFeaturesSection;
