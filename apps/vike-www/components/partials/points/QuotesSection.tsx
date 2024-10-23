import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { ListItem, BodyText, theme } from "@src/components/nessie-web";
import { Flex, Box } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import Container from "@src/components/Container";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const quotesData = [
  {
    avatar: "teresa",
    name: "directus.page_points.quote_one_name",
    role: "directus.page_points.quote_one_role",
    quote: "directus.page_points.quote_one_quote",
  },
  {
    avatar: "patrick",
    name: "directus.page_points.quote_two_name",
    role: "directus.page_points.quote_two_role",
    quote: "directus.page_points.quote_two_quote",
  },
  {
    avatar: "melissa",
    name: "directus.page_points.quote_three_name",
    role: "directus.page_points.quote_three_role",
    quote: "directus.page_points.quote_three_quote",
  },
];

const QuoteContainer = ({ children }) => (
  <Flex
    flexDirection="column"
    border="2px solid"
    borderColor={theme.colors.taro30}
    borderRadius="54px"
    padding="24px"
    flexBasis={["100%", "100%", "32%"]}
    marginBottom={[12, 12, 0]}
    backgroundColor="white"
  >
    {children}
  </Flex>
);

const TextContainer = ({ children }) => <Flex paddingLeft="82px">{children}</Flex>;

const PositionText = ({ children }) => (
  <Text color={theme.colors.taro40} fontWeight="700" fontSize="18px">
    {children}
  </Text>
);

const Avatar = ({ src, ...imgProps }) => (
  <Box marginRight="12px" maxWidth="60px">
    <img src={src} {...imgProps} alt="" />
  </Box>
);
const QuotesSection = () => {
  const t = useContext(TranslationContext);

  return (
    <Box backgroundColor={theme.colors.taro10} paddingTop={24} paddingBottom={24}>
      <Container>
        <Flex flexDirection={["column", "column", "row"]} justifyContent="space-between">
          {quotesData.map((q, i) => (
            <QuoteContainer key={i}>
              <ListItem
                title={t.translate(q.name)}
                description={<PositionText>{t.translate(q.role)}</PositionText>}
                leftAccessory={
                  <Avatar
                    src={`https://static.classdojo.com/img/page_points/${q.avatar}.png`}
                    alt={`${q.avatar} picture`}
                  />
                }
              />
              <TextContainer>
                <BodyText>{t.translate(q.quote)}</BodyText>
              </TextContainer>
            </QuoteContainer>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default QuotesSection;
