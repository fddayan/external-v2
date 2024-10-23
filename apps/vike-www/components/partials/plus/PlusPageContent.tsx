import React, { useState, useRef, useEffect } from "react";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import { Text } from "@src/components/Text";
import QuotesSection from "@src/components/partials/plus/QuotesSection";
import CTAScrollBanner from "@src/components/partials/plus/CTAScrollBanner";
import FeaturesSection from "@src/components/partials/plus/FeaturesSection";
import CTATile from "@src/components/partials/plus/CTATile";
import { DetailText, theme } from "@src/components/nessie-web";
import plus_icon_white from "@src/assets/images/plus/plus_icon_white.svg";
import { ImgFile } from "./HeroSection";
import FooterBanner from "./FooterBanner";
import { defaultNormalizeStaticQueryResult } from "@src/utils/normalize-static-query-result";

const {
  colors: { dt_white, dt_taro10, dt_taro90, dt_grape20, dt_grape50 },
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

const PlansHeader = styled("h3")<{ textAlign?: string }>`
  font-weight: 800;
  font-size: 24px;
  text-align: ${(props) => `${props.textAlign}`};
  line-height: 30px;
  letter-spacing: -0.25px;
  color: ${dt_taro90};
  width: 100%;
  margin: 0;

  span {
    color: ${dt_grape50};
  }
`;

const AlternateTable = styled("table")`
  border: none;
`;
const AlternateThead = styled("thead")`
  border: none;
`;
const AlternateTbody = styled("tbody")`
  border: none;

  tr:nth-of-type(odd) td {
    background-color: ${dt_grape20};
  }
  tr:nth-of-type(odd) td:first-of-type {
    border-radius: 5px 0 0 5px;
  }
  tr:nth-of-type(odd) td:last-of-type {
    border-radius: 0 5px 5px 0;
  }
`;
const AlternateTr = styled("tr")`
  border: none;
`;
const AlternateTd = styled("td")`
  border: none;
  padding: 0;
  background-color: unset;
`;

type PlusPageContentProps = {
  isBeyondSchoolBanner: boolean;
};

const PlusPageContent: React.FC<PlusPageContentProps> = ({ isBeyondSchoolBanner }) => {
  const [showCtaBanner, setShowCtaBanner] = useState(false);
  const featuresRef = useRef(null);

  const intersectionObserverCallBack = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setShowCtaBanner(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, [featuresRef]);

  const data = useStaticQuery<{
    directus: {
      page_plus: Record<
        | "check_icon_color"
        | "plus_icon_color"
        | "classdojo_plus_brand"
        | "plus_brand"
        | "hero_image_desktop"
        | "hero_image_mobile"
        | "check_icon"
        | "close_icon"
        | "quote_icon"
        | "feature_one_image"
        | "feature_two_image"
        | "feature_three_image"
        | "footer_banner_cta_url",
        ImgFile
      > & {
        hero_text: string;
        hero_features: unknown[];
        cta_terms_link_url: string;
        quotes: unknown[];
        feature_one_features: { feature_icon_url: string; feature_link_url: string; footnote: string }[];
        feature_two_features: { feature_icon_url: string; feature_link_url: string; footnote: string }[];
        feature_three_features: { feature_icon_url: string; feature_link_url: string; footnote: string }[];
        plans_features: { isBase: boolean }[];
        plan_base_title: string;
        plan_plus_title: string;
      };
    };
  }>(graphql`
    query {
      directus {
        page_plus {
          check_icon {
            id
            filename_download
            filename_disk
          }
          close_icon {
            id
            filename_download
            filename_disk
          }
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
          plus_brand {
            id
            filename_download
            filename_disk
          }
          cta_terms_link_url
          quotes
          quote_icon {
            id
            filename_download
            filename_disk
          }
          feature_one_features
          feature_one_image {
            id
            filename_download
            filename_disk
          }
          feature_two_features
          feature_two_image {
            id
            filename_download
            filename_disk
          }
          feature_three_features
          feature_three_image {
            id
            filename_download
            filename_disk
          }
          plans_features
          plan_base_title
          plan_plus_title
          footer_banner_cta_url
        }
      }
    }
  `);

  defaultNormalizeStaticQueryResult(data);

  const {
    directus: {
      page_plus: {
        check_icon,
        close_icon,
        check_icon_color,
        plus_icon_color,
        plus_brand,
        cta_terms_link_url,
        quotes,
        quote_icon,
        feature_one_image,
        feature_one_features,
        feature_two_image,
        feature_two_features,
        feature_three_image,
        feature_three_features,
        plans_features,
        plan_base_title,
        plan_plus_title,
        footer_banner_cta_url,
      },
    },
  } = data;

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
    isBackgroundWhite: true,
    isBorderDarker: true,
    isLeft: true,
  };

  const CTAScrollBannerProps = {
    bannerText: "directus.page_plus.scroll_banner_text",
    buttonText: "directus.page_plus.scroll_banner_button_text",
    navigateAction: () => (window.location.href = "https://home.classdojo.com/#/subscription"),
    showCtaBanner: showCtaBanner,
    isBeyondSchoolBanner,
  };

  const footerBannerProps = {
    imageSrc: plus_icon_color,
    imageAlt: "directus.page_plus.plus_icon_alt",
    bannerText: "directus.page_plus.footer_banner_text",
    buttonLabel: "directus.page_plus.footer_banner_cta_label",
    buttonUrl: footer_banner_cta_url,
  };

  return (
    <>
      <QuotesSection
        quoteIcon={quote_icon.file.publicURL}
        quotesData={quotes}
        quotesPath={"directus.page_plus.quotes.quote_"}
        signaturePath={"directus.page_plus.quotes.signature_"}
      />

      <div ref={featuresRef}>
        <CTAScrollBanner {...CTAScrollBannerProps} />
        <FeaturesSection
          isLeft={true}
          iterable={feature_one_features}
          image={feature_one_image}
          bgColor={dt_white}
          featureHeader={"directus.page_plus.feature_one_title"}
          featureTitlePath={"directus.page_plus.feature_one_features.feature_title_"}
          featureTextPath={"directus.page_plus.feature_one_features.feature_text_"}
          featureLinkLabel={"directus.page_plus.feature_one_features.feature_link_label_"}
        />
        <FeaturesSection
          isLeft={false}
          iterable={feature_two_features}
          image={feature_two_image}
          bgColor={dt_taro10}
          featureHeader={"directus.page_plus.feature_two_title"}
          featureTitlePath={"directus.page_plus.feature_two_features.feature_title_"}
          featureTextPath={"directus.page_plus.feature_two_features.feature_text_"}
          featureLinkLabel={"directus.page_plus.feature_two_features.feature_link_label_"}
        />
        <FeaturesSection
          isLeft={true}
          iterable={feature_three_features}
          image={feature_three_image}
          bgColor={dt_white}
          featureHeader={"directus.page_plus.feature_three_title"}
          featureTitlePath={"directus.page_plus.feature_three_features.feature_title_"}
          featureTextPath={"directus.page_plus.feature_three_features.feature_text_"}
          featureLinkLabel={"directus.page_plus.feature_three_features.feature_link_label_"}
        />
      </div>

      <Box
        as="section"
        backgroundColor={dt_taro10}
        position="relative"
        width="100vw"
        paddingTop={["54px", "108px"]}
        paddingBottom={["54px", "108px"]}
        minHeight="500px"
      >
        <FeatureContainer>
          <Container maxWidth="946px" padding="0">
            <Flex justifyContent="center">
              <Box maxWidth="560px" marginBottom={[24, 54]} padding={["0 15px", 0]}>
                <PlansHeader textAlign="center">
                  <Translate path={`directus.page_plus.plans_text_start`} />
                  &nbsp;
                  <span>
                    <Translate path={`directus.page_plus.plans_text_highlight`} />
                  </span>{" "}
                  &nbsp;
                  <Translate path={`directus.page_plus.plans_text_end`} />
                </PlansHeader>
              </Box>
            </Flex>
            <Flex flexDirection={["column", "row"]}>
              <FeaturesColumn width={["100%", "50%"]}>
                <AlternateTable>
                  <AlternateThead>
                    <AlternateTr>
                      <AlternateTd>
                        <Box></Box>
                      </AlternateTd>
                      <AlternateTd>
                        <Flex
                          backgroundColor={dt_grape20}
                          borderRadius="6px"
                          alignItems="center"
                          justifyContent="center"
                          minWidth={["48px", "67px"]}
                          marginBottom={["10px", "12px"]}
                          marginLeft={["4px", "30px"]}
                          padding={["5px 0", "6px 0"]}
                        >
                          <Text
                            fontWeight="600"
                            fontSize={["12px", "15px"]}
                            lineHeight={["12.6px", "18px"]}
                            color={dt_taro90}
                            textAlign="center"
                            margin="0"
                          >
                            {plan_base_title}
                          </Text>
                        </Flex>
                      </AlternateTd>
                      <AlternateTd>
                        <Flex
                          backgroundColor={dt_grape50}
                          borderRadius="6px"
                          alignItems="center"
                          justifyContent="center"
                          minWidth={["48px", "67px"]}
                          marginBottom={["10px", "12px"]}
                          marginLeft={["4px", "30px"]}
                          padding={["5px 0", "6px 0"]}
                        >
                          <PlusIcon src={plus_icon_white} marginRight={3} maxWidth="25%" alt="" />
                          <Text
                            fontWeight="600"
                            fontSize={["12px", "15px"]}
                            lineHeight={["12.6px", "18px"]}
                            color={dt_white}
                            textAlign="center"
                            margin="0"
                          >
                            {plan_plus_title}
                          </Text>
                        </Flex>
                      </AlternateTd>
                    </AlternateTr>
                  </AlternateThead>
                  <AlternateTbody>
                    {plans_features.map((item, index) => {
                      return (
                        <AlternateTr key={index}>
                          <AlternateTd>
                            <Flex alignItems="center" padding="8px 0 6px 6px">
                              <DetailText lineHeight="18px" fontSize="16px" fontWeight="600">
                                <Translate
                                  key={index}
                                  path={`directus.page_plus.plans_features.feature_${index + 1}`}
                                />
                              </DetailText>
                            </Flex>
                          </AlternateTd>
                          <AlternateTd>
                            <Flex justifyContent="center" alignItems="center" marginLeft={["4px", "30px"]}>
                              <PlusIcon
                                src={item.is_base ? check_icon.file.publicURL : close_icon.file.publicURL}
                                alt=""
                              />
                            </Flex>
                          </AlternateTd>
                          <AlternateTd>
                            <Flex justifyContent="center" alignItems="center" marginLeft={["4px", "30px"]}>
                              <PlusIcon
                                src={item.is_plus ? check_icon_color.file.publicURL : close_icon.file.publicURL}
                                alt=""
                              />
                            </Flex>
                          </AlternateTd>
                        </AlternateTr>
                      );
                    })}
                  </AlternateTbody>
                </AlternateTable>
              </FeaturesColumn>
              <FeaturesColumn width={["100%", "50%"]} flexDirection="column" justifyContent="flex-start">
                <Flex justifyContent={["center", "flex-end"]} marginTop={[30, 0]} width="100%">
                  <CTATile {...CTATileProps} />
                </Flex>
              </FeaturesColumn>
            </Flex>
          </Container>
        </FeatureContainer>
      </Box>
      <FooterBanner {...footerBannerProps} />
    </>
  );
};

export default PlusPageContent;
