import React, { useEffect } from "react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { Text } from "@src/components/Text";
import CTATile from "@src/components/partials/plus/CTATile";
import { theme } from "@src/components/nessie-web";
import plus_icon_white from "@src/assets/images/plus/plus_icon_white.svg";
import { logEvent } from "@src/utils/logClient";
import { PublicUrlImg } from "@src/types/common";
import { defaultNormalizeStaticQueryResult } from "@src/utils/normalize-static-query-result";

const {
  colors: { dt_taro90 },
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

const HeroHeader = styled("h1")`
  font-weight: 600;
  font-size: 34px;
  text-align: left;
  line-height: 42px;
  letter-spacing: -0.35px;
  color: ${dt_taro90};
  width: 100%;
  margin-bottom: 30px;
`;
export type ImgFile = { id: string; filename_download: string } & PublicUrlImg;
const HeroSection = ({ isBottomCTA, queryParams }: { isBottomCTA: boolean; queryParams: Record<string, string> }) => {
  const data = useStaticQuery<{
    directus: {
      page_plus: Record<
        | "check_icon_color"
        | "plus_icon_color"
        | "classdojo_plus_brand"
        | "plus_brand"
        | "hero_image_desktop"
        | "hero_image_mobile",
        ImgFile
      > & {
        hero_text: string;
        hero_features: unknown[];
        cta_terms_link_url: string;
      };
    };
  }>(graphql`
    query {
      directus {
        page_plus {
          check_icon_color {
            id
            filename_download
            filename_disk
          }
          plus_icon_color {
            id
            filename_download
            filename_disk
          }
          classdojo_plus_brand {
            id
            filename_download
            filename_disk
          }
          plus_brand {
            id
            filename_download
            filename_disk
          }
          hero_image_desktop {
            id
            filename_download
            filename_disk
          }
          hero_image_mobile {
            id
            filename_download
            filename_disk
          }
          hero_text
          hero_features
          cta_terms_link_url
        }
      }
    }
  `);

  defaultNormalizeStaticQueryResult(data);

  const {
    directus: {
      page_plus: {
        check_icon_color,
        plus_icon_color,
        classdojo_plus_brand,
        plus_brand,
        hero_image_desktop,
        hero_image_mobile,
        hero_features,
        cta_terms_link_url,
      },
    },
  } = data;

  useEffect(() => {
    logEvent({
      eventName: "web.common.paid_product.sales_page.exposure",
      eventValue: location.href,
      metadata: {
        entryPoint: "web_home_navigation",
        queryParams,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CTATileProps = {
    brand: {
      plus: plus_icon_color,
      logotype: plus_brand,
    },
    plusIconWhite: plus_icon_white,
    CTATermsLinkURL: cta_terms_link_url,
    priceAnnually: "directus.page_plus.cta_price_annualy",
    priceMonthly: "directus.page_plus.cta_price_monthly",
    billedAnnualy: "directus.page_plus.cta_billed_annualy",
    billedMonthly: "directus.page_plus.cta_billed_monthly",
    pricePeriod: "directus.page_plus.cta_price_period",
    CTAButtonContent: "directus.page_plus.cta_button_text",
    CTATerms: "directus.page_plus.cta_terms",
    CTATermsLinkText: "directus.page_plus.cta_terms_link_text",
    SwitchAnnually: "directus.page_plus.cta_switch_annualy",
    SwitchMonthly: "directus.page_plus.cta_switch_monthly",
    queryParams,
    isBottomCTA,
  };

  return (
    <>
      <Box as="section" bg="transparent" position="relative" width="100vw" minHeight="500px" overflow="hidden">
        <FeatureContainer>
          <Box width="100%" display={["block", "none"]}>
            <HeroImg position="relative" src={hero_image_mobile.file.publicURL} alt="" />
          </Box>
          <Box display={["none", "block"]}>
            <HeroImg position="absolute" src={hero_image_desktop.file.publicURL} alt="" />
          </Box>
          <Container padding="0">
            <Flex flexDirection={["column-reverse", "row"]}>
              <FeaturesColumn width={["100%", "50%"]} paddingTop={[40, 108]}>
                <Box>
                  <Box marginBottom="30px">
                    <PlusIcon src={classdojo_plus_brand.file.publicURL} alt="" />
                  </Box>
                  <HeroHeader>
                    <Translate path="directus.page_plus.hero_text" />
                  </HeroHeader>
                  {hero_features.map((_, index) => {
                    return (
                      <Flex key={index}>
                        <PlusIcon marginRight={15} src={check_icon_color.file.publicURL} alt="" />
                        <Text lineHeight={[1.2]} fontSize={[18]} letterSpacing={[-0.25]}>
                          <Translate key={index} path={`directus.page_plus.hero_features.hero_feature_${index + 1}`} />
                        </Text>
                      </Flex>
                    );
                  })}
                  <Box marginTop={[30, 35]}>
                    <CTATile renderTitle={false} {...CTATileProps} />
                  </Box>
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
export default HeroSection;
