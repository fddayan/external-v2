import React from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { HeaderStyles, Text } from "@src/components/Text";
import Button from "@src/components/Button";
import { graphql, useStaticQuery } from "gatsby";

const Header = styled("h2")`
  text-align: center;
  font-family: DojoDisplay !important;
  padding-top: 25px;
  margin-top: 0;
  font-weight: 800;
  font-size: 40px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const ItemWrapper = styled(Flex)`
  padding: 0 15px;
`;
ItemWrapper.defaultProps = { width: ["100%", 1 / 3] };

const Item = styled(Flex)`
  box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
  background-color: #fff;
  padding: 30px 30px 30px;
  border-radius: 5px;
  margin-bottom: 20px;
`;
Item.defaultProps = { flexDirection: "column" };

const H4 = HeaderStyles.withComponent("h4");
H4.defaultProps = { lineHeight: [1], fontSize: [3], fontWeight: 600 };

const ResourcesSection = () => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        page_privacy {
          resource_items
        }
      }
    }
  `);
  const {
    directus: {
      page_privacy: { resource_items },
    },
  } = data;

  return (
    <Flex as="section" flexDirection="column" paddingY="66px" backgroundColor="#f5f5f3">
      <Header>
        <Translate path="directus.page_privacycenter.resource_title" />
      </Header>
      <Container>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="start"
          width="100%"
          maxWidth={["100%"]}
          marginX="auto"
          paddingTop="60px"
        >
          {resource_items.map((item, index) => (
            <ItemWrapper key={`resource-${index}`}>
              <Item>
                <H4>
                  <Translate path={`directus.page_privacycenter.resource_items.title_${index + 1}`} />
                </H4>
                <Text fontSize={2} minHeight="75px">
                  <Translate path={`directus.page_privacycenter.resource_items.description_${index + 1}`} />
                </Text>
                <Flex justifyContent="center">
                  <Button as="a" href={item.link} target="_blank">
                    <Translate path="directus.page_privacycenter.resource_button_text" />
                  </Button>
                </Flex>
              </Item>
            </ItemWrapper>
          ))}
        </Flex>
      </Container>
    </Flex>
  );
};

export default ResourcesSection;
