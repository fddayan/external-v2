import React from "react";

import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { Fade } from "react-slideshow-image";
import { Text } from "@src/components/Text";

const PlusIcon = styled("img")<{ marginRight?: number; alignSelf?: string; background?: string; maxWidth?: string }>`
  position: relative;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  margin-right: ${(props) => `${props.marginRight}px`};
  align-self: ${(props) => props.alignSelf};
  background: ${(props) => props.background};
`;

const SliderContainer = styled("div")`
  width: 100%;
  margin-bottom: 0;

  .each-slide > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
  }

  .each-slide span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }

  .each-fade {
    display: flex;
    justify-content: center;
  }

  .react-slideshow-container .nav {
    display: none;
  }

  .react-slideshow-container + ul.indicators {
    padding: 0;
  }

  .react-slideshow-container + ul.indicators li {
    margin: 0 3px;
  }

  .react-slideshow-container + ul.indicators button.each-slideshow-indicator:before {
    cursor: pointer;
    height: 10px;
    background: rgb(198, 198, 198) none repeat scroll 0 0;
    border-radius: 100px;
    display: inline-block;
    width: 10px;
  }

  .react-slideshow-container + ul.indicators button.each-slideshow-indicator.active:before {
    background: #8047ff none repeat scroll 0 0;
  }

  .indicators {
    margin: 20px 0 0;
  }
`;

const QuotesSection = (props: {
  quoteIcon: string;
  quotesData: unknown[];
  quotesPath: string;
  signaturePath: string;
}) => {
  const { quoteIcon, quotesData, quotesPath, signaturePath } = props;
  return (
    <Box backgroundColor="#F7F8FF">
      <Container>
        <Flex
          width={["100%"]}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          paddingBottom={[50, 54]}
          paddingTop={[50, 54]}
        >
          <Flex justifyContent="center" marginBottom="24px">
            <PlusIcon src={quoteIcon} alt="" />
          </Flex>
          <SliderContainer>
            <Fade
              {...{
                duration: 3000,
                transitionDuration: 500,
                infinite: true,
                indicators: true,
                autoplay: true,
              }}
            >
              {quotesData.map((_, index) => (
                <div key={`quotes-slider-${index}`} className="each-fade">
                  <Box color={"#6966BE"} position={"relative"} textAlign={"center"}>
                    <Text
                      color="#2C2A50"
                      textAlign="center"
                      fontSize={28}
                      fontWeight={600}
                      paddingX={["18px", "50px"]}
                      lineHeight="36px"
                      letterSpacing="0.35px"
                    >
                      <Translate path={quotesPath + (index + 1)} />
                    </Text>
                    <Text textAlign="center" fontSize={18} fontWeight={600} letterSpacing="0.25px" lineHeight="36px">
                      <Translate path={signaturePath + (index + 1)} />
                    </Text>
                  </Box>
                </div>
              ))}
            </Fade>
          </SliderContainer>
        </Flex>
      </Container>
    </Box>
  );
};

export default QuotesSection;
