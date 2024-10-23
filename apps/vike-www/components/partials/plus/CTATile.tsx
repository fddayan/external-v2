import React, { useState } from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { Link } from "gatsby";
import SwitchCheckbox from "./SwitchCheckbox";
import { BodyText, Title, DetailText, theme, Space } from "@src/components/nessie-web";
import { logEvent } from "@src/utils/logClient";
import { useLocation } from "@reach/router";
import { PublicUrlImg } from "@src/types/common";

const {
  colors: { dt_white, dt_taro10, dt_taro20, dt_taro30, dt_taro50, dt_taro90, dt_grape50 },
} = theme;

const CTACard = styled(Flex)<{ backgroundColor?: string }>`
  flex-direction: column;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "none")};
  box-sizing: border-box;
  border-radius: 30px;
  padding: 24px 30px 18px;
`;

const CTAButton = styled("a")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 30px;
  border: none;
  background-color: ${dt_grape50};
`;

const CTAButtonText = styled("p")`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: ${dt_white};
  align-self: center;
  margin-bottom: 0;
`;

const CTAButtonIcon = styled("img")<{ marginRight?: number; alignSelf?: string }>`
  position: relative;
  max-width: 100%;
  margin-right: ${(props) => (props.marginRight ? `${props.marginRight}px` : 0)};
`;

const CTALink = styled(Link)`
  color: inherit;
  text-decoration: underline;
`;

const CTATile = ({
  brand,
  plusIconWhite,
  CTATermsLinkURL,
  renderTitle,
  isLeft,
  isBackgroundWhite,
  isBorderDarker,
  priceAnnually,
  priceMonthly,
  billedAnnualy,
  billedMonthly,
  pricePeriod,
  CTAButtonContent,
  CTATerms,
  CTATermsLinkText,
  SwitchAnnually,
  SwitchMonthly,
  queryParams,
  isBottomCTA,
}: {
  brand: {
    plus: PublicUrlImg;
    logotype: PublicUrlImg;
  };
  isBackgroundWhite?: boolean;
  isBorderDarker?: boolean;
  isBottomCTA?: boolean;
  isLeft?: boolean;
  plusIconWhite: string;
  CTATermsLinkURL: string;
  renderTitle: boolean;
  priceAnnually: string;
  priceMonthly: string;
  billedAnnualy: string;
  billedMonthly: string;
  pricePeriod: string;
  CTAButtonContent: string;
  CTATerms: string;
  CTATermsLinkText: string;
  SwitchAnnually: string;
  SwitchMonthly: string;
  queryParams?: Record<string, string>;
}) => {
  const [togglePrice, setTogglePrice] = useState(priceAnnually);
  const [toggleBilled, setToggleBilled] = useState(billedAnnualy);

  const priceToggler = (value: boolean) => {
    setTogglePrice(value ? priceMonthly : priceAnnually);
    setToggleBilled(value ? billedMonthly : billedAnnualy);
  };

  const location = useLocation();

  function eventOnButtonClick() {
    logEvent({
      eventName: isBottomCTA
        ? "web.common.paid_product.sales_page.cta_click.bottom"
        : "web.common.paid_product.sales_page.cta_click.hero",
      eventValue: location.href,
      metadata: queryParams,
    });
  }

  const subscriptionPeriod = togglePrice == priceAnnually ? "12" : "1";

  const CTAActionHref = `${process.env.GATSBY_HOME_URL}/#/subscription?period=${subscriptionPeriod}`;

  return (
    <Box width={["100%", "80%"]}>
      <CTACard
        alignItems={isLeft ? "flex-start" : "center"}
        backgroundColor={isBackgroundWhite ? dt_white : dt_taro10}
        border={isBorderDarker ? `2px solid ${dt_taro30}` : `2px solid ${dt_taro20}`}
      >
        {renderTitle && (
          <Box>
            <Flex width="100%">
              <CTAButtonIcon src={brand.plus.file.publicURL} alt="" />
              <Space kind="inline" size="dt_xs" />
              <CTAButtonIcon src={brand.logotype.file.publicURL} alt="" />
            </Flex>
            <Space size="dt_m" />
          </Box>
        )}
        {/* <Box>
          <Title size={1} inline color={dt_taro90}>
            <Translate path={togglePrice} />
          </Title>
          <BodyText inline color={dt_taro90}>
            <Translate path={pricePeriod} />
          </BodyText>
        </Box>
        <Space size="dt_xs" />
        <DetailText color={dt_taro50}>
          <Translate path={toggleBilled} />
        </DetailText>
        <Space size="dt_m" /> */}
        <CTAButton href={CTAActionHref} onClick={eventOnButtonClick}>
          <CTAButtonIcon src={plusIconWhite} alt="" />
          <Space kind="inline" size="dt_xs" />
          <CTAButtonText>
            <Translate path={CTAButtonContent} />
          </CTAButtonText>
        </CTAButton>
        <Space size="dt_s" />
        <Box margin="auto">
          <DetailText color={dt_taro50}>
            <Translate path={CTATerms} />{" "}
            <CTALink to={CTATermsLinkURL}>
              <DetailText color={dt_taro50} inline>
                <Translate path={CTATermsLinkText} />
              </DetailText>
            </CTALink>
          </DetailText>
        </Box>
      </CTACard>
      {/* <SwitchCheckbox labelOne={SwitchAnnually} labelTwo={SwitchMonthly} onSwitch={priceToggler} /> */}
    </Box>
  );
};
CTATile.defaultProps = { renderTitle: true };

export default CTATile;
