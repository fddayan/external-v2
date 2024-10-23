import React, { useContext } from "react";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { theme } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import { useLocation } from "@reach/router";
import plus_icon_white from "@src/assets/images/plus/plus_icon_white.svg";

const {
  colors: { dt_grape20, dt_grape50, dt_taro90 },
} = theme;

const Header = styled("h2")`
  font-size: 18px;
  color: ${dt_taro90};
  line-height: 1.1;
  font-weight: 600;
  z-index: 3;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0px;
  ${mediaQueriesMax[0]} {
    font-size: 14px;
  }
`;

const CTAButton = styled("a")<{ href?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: none;
  padding: 12px 28px;
  margin: 0 10px;
  background-color: ${dt_grape50};
  ${mediaQueriesMax[0]} {
    margin: 0;
    align-self: center;
    padding: 6px 14px;
  }
`;

const CTABannerWrapper = styled(Flex)`
  width: 100%;
  max-height: 66px;
  justify-content: center;
  align-items: center;
  background-color: ${dt_grape20};
  position: fixed;
  z-index: 10;
  transition: top 0.3s ease-out;
  overflow: hidden;
  padding: 12px;
  ${mediaQueriesMax[0]} {
    max-height: unset;
  }
`;

const CTAButtonText = styled("p")`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  align-self: center;
  margin-bottom: 0;
`;

const CTAButtonIcon = styled("img")<{ marginRight?: number; alignSelf?: string }>`
  position: relative;
  max-width: 100%;
  margin-right: ${(props) => (props.marginRight ? `${props.marginRight}px` : 0)};
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  color: ${dt_taro90};
  font-size: 24px;
  z-index: 999;
  transition: opacity 0.4s;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 10px;
  ${mediaQueries[1]} {
    position: relative;
    top: unset;
    right: unset;
    font-size: 40px;
    width: 55px;
    height: 55px;
  }
`;

const CTAScrollBanner = (props: {
  bannerText: string;
  buttonText: string;
  navigateAction: () => void;
  showCtaBanner: boolean;
  closeFunction?: () => void;
  isBeyondSchoolBanner: boolean;
  queryParams?: Record<string, string>;
}) => {
  const { bannerText, buttonText, navigateAction, showCtaBanner, closeFunction, isBeyondSchoolBanner, queryParams } =
    props;
  const t = useContext(TranslationContext);

  const location = useLocation();

  function handleClick() {
    logEvent({
      eventName: "web.common.paid_product.sales_page.cta_click.sticky",
      eventValue: location.href,
      metadata: queryParams,
    });
    navigateAction();
  }

  return (
    <CTABannerWrapper top={showCtaBanner ? (isBeyondSchoolBanner ? 0 : 88) : isBeyondSchoolBanner ? -70 : 0}>
      <Box margin="0 auto">
        <Flex flexDirection={["column", "row"]} margin={["6px 0", "0"]}>
          <Flex
            display={closeFunction ? ["flex"] : ["none", "flex"]}
            marginBottom={[2, 0]}
            alignItems="center"
            padding={["0 30px", "0"]}
          >
            <Header>{t.translate(bannerText)}</Header>
          </Flex>
          <CTAButton onClick={handleClick}>
            <CTAButtonIcon marginRight={9} src={plus_icon_white} alt="" />
            <CTAButtonText>
              <Text marginBottom="0">{t.translate(buttonText)}</Text>
            </CTAButtonText>
          </CTAButton>
        </Flex>
      </Box>
      {closeFunction ? (
        <CloseButton aria-label={t.translate("layouts.main.close")?.toString() ?? undefined} onClick={closeFunction}>
          ×
        </CloseButton>
      ) : (
        ""
      )}
    </CTABannerWrapper>
  );
};

export default CTAScrollBanner;
