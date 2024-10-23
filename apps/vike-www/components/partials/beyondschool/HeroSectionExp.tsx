import React, { useEffect } from "react";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { theme, Title, BodyText, Space, Action } from "@src/components/nessie-web";
import { logEvent } from "@src/utils/logClient";
import mobile_experiment_hero_img from "@src/assets/images/beyondschool/mobile_experiment_hero_img.png";
import desktop_experiment_hero_img from "@src/assets/images/beyondschool/desktop_experiment_hero_img.png";
import experiment_star from "@src/assets/images/beyondschool/experiment_star.png";
import T from "@src/components/translation/Translate";
import { defaultNormalizeStaticQueryResult } from "@src/utils/normalize-static-query-result";

const {
  colors: { dt_grape50, dt_taro90, dt_white },
} = theme;

const FeatureContainer = styled(Flex)`
  text-align: left;
  width: 100%;
  margin-bottom: 60px;
`;
FeatureContainer.defaultProps = {
  mx: "auto",
  alignItems: "center",
  flexDirection: ["column", "row"],
};

const HeroImg = styled("img")<{ position?: string }>`
  position: ${(props) => props.position};
  right: 0;
  top: 0;
  max-width: 89%;

  ${mediaQueriesMax[2]} {
    max-width: 100%;
  }
`;

const PlusIcon = styled("img")<{ marginRight?: number; alignSelf?: string; background?: string; maxWidth?: string }>`
  position: relative;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  margin-right: ${(props) => `${props.marginRight}px`};
  align-self: ${(props) => props.alignSelf};
  background: ${(props) => props.background};
`;

const FeaturesColumn = styled(Flex)`
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
`;
FeaturesColumn.defaultProps = { width: ["100%", "100%", 1 / 2], alignItems: "center", justifyContent: "center" };

const CTAButton = styled("a")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 30px;
  border: none;
  background-color: ${dt_grape50};
  cursor: pointer;

  ${mediaQueries[0]} {
    width: 360px;
  }
`;

const CTAButtonText = styled("p")`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: ${dt_white};
  align-self: center;
  margin-bottom: 0;
`;

const HeroSectionExp = ({ queryParams }: { queryParams: string }) => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        page_plus {
          classdojo_plus_brand {
            id
            filename_download
            filename_disk
          }
        }
      }
    }
  `);

  defaultNormalizeStaticQueryResult(data);

  const {
    directus: {
      page_plus: { classdojo_plus_brand },
    },
  } = data;

  useEffect(() => {
    logEvent({
      eventName: "web.common.paid_product.sales_page.exposure",
      eventValue: location.href,
      metadata: {
        entryPoint: "deeplink",
        queryParams,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctaClick = () => {
    logEvent({
      eventName: "web.common.paid_product.sales_page.cta_click.hero",
      eventValue: location.href,
      metadata: queryParams,
    });
  };

  return (
    <>
      <Box as="section" bg="transparent" position="relative" width="100vw" minHeight="500px" overflow="hidden">
        <FeatureContainer>
          <Box width="100%" display={["block", "none"]} textAlign="right">
            <HeroImg position="relative" src={mobile_experiment_hero_img} alt="Space mojo" />
          </Box>
          <Box display={["none", "block"]}>
            <HeroImg position="absolute" src={desktop_experiment_hero_img} alt="Space mojo" />
          </Box>
          <Container padding="0">
            <Flex flexDirection={["column-reverse", "row"]}>
              <FeaturesColumn width={["100%", "50%"]} paddingTop={[40, 108]}>
                <Box>
                  <Box marginBottom="30px">
                    <PlusIcon src={classdojo_plus_brand.file.publicURL} alt="" />
                  </Box>
                  <Title>
                    <T path="directus.page_plus.hero_heading" />
                  </Title>
                  <Space size="m" />
                  <BodyText>
                    <T path="directus.page_plus.hero_text" />
                  </BodyText>
                  <Space size="m" />
                  <Flex flexDirection="column" alignItems="center" width={["100%", "fit-content"]}>
                    <CTAButton href="https://home.classdojo.com/#/subscription" onClick={ctaClick}>
                      <CTAButtonText>
                        <T path="directus.page_plus.cta_button_text" />
                      </CTAButtonText>
                    </CTAButton>
                    <Space size="m" />
                    <Flex width="168px" justifyContent="space-between">
                      <img src={experiment_star} alt="rating star" />
                      <img src={experiment_star} alt="rating star" />
                      <img src={experiment_star} alt="rating star" />
                      <img src={experiment_star} alt="rating star" />
                      <img src={experiment_star} alt="rating star" />
                    </Flex>
                    <Space size="s" />
                    <Action color={dt_taro90}>
                      <T path="directus.page_plus.hero_app_review_quote" />
                    </Action>
                    <Action compact kind="inactive">
                      <T path="directus.page_plus.hero_app_review_rating" />
                    </Action>
                  </Flex>
                </Box>
              </FeaturesColumn>
              <FeaturesColumn width={["100%", "50%"]}></FeaturesColumn>
            </Flex>
          </Container>
        </FeatureContainer>
      </Box>
    </>
  );
};
export default HeroSectionExp;
