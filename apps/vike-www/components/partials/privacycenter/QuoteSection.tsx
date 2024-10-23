import React from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import { TranslationType } from "@src/components/translation/TranslationContext";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

type BlockQuoteProps = {
  ltr?: boolean;
};
const BlockQuote = styled("blockquote")<BlockQuoteProps>`
  padding: 11px 22px;
  margin: 20px 0 0 0;
  ${mediaQueries[0]} {
    margin: ${(props) => (props.ltr === true ? "0 0 0 70px" : "0 70px 0 0")};
  }
  font-size: 20px;
  border-left: ${(props) => (props.ltr === true ? 0 : "5px solid #eee;")};
  border-right: ${(props) => (props.ltr === true ? "5px solid #eee;" : 0)};
  footer {
    color: #777 !important;
    font-size: 80%;
  }
`;

type QuoteSectionProps = {
  ltr?: boolean;
  image: any;
  text: TranslationType;
  subtext: TranslationType;
};

const QuoteSection: React.FC<QuoteSectionProps> = ({ ltr, image, text, subtext }) => {
  return (
    <Flex as="section" paddingY="66px" backgroundColor="#f5f5f3">
      <Container>
        <Flex
          flexDirection={ltr ? ["column-reverse", "row-reverse"] : ["column-reverse", "row"]}
          alignItems="center"
          justifyContent="left"
          maxWidth={["100%", "100%", "86%"]}
          width="100%"
          mx="auto"
        >
          <BlockQuote ltr={ltr}>
            <Text color="#363636" fontSize={4}>
              {text}
            </Text>
            <footer>
              &#8212; &nbsp;
              {subtext}
            </footer>
          </BlockQuote>
          <GatsbyImageWrapper
            image={image}
            css={css`
              border-radius: 50%;
              width: 150px;
              min-width: 150px;
              ${mediaQueries[0]} {
                width: 213px;
                min-width: 213px;
              }
            `}
            alt="Photo of the quote author"
          />
        </Flex>
      </Container>
    </Flex>
  );
};

export default QuoteSection;
