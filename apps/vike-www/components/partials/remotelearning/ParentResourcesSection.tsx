import React from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import Button from "@src/components/Button";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";

const ItemWrapper = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
`;
ItemWrapper.defaultProps = { width: ["100%", 1 / 3] };

const ItemBox = styled(Flex)`
  position: relative;
  background: #fff;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
  border-radius: 5px;
  padding: 57px 20px 30px;
  width: 100%;
  margin-bottom: 66px;
`;

ItemBox.defaultProps = { flexDirection: "column", alignItems: "center" };

const ItemBoxImg = styled(GatsbyImage)`
  position: absolute !important;
  top: -37.5px;
  margin: 0 auto;
`;

const Header = styled("h2")`
  text-align: center;
  padding: 76px 0 25px 0;
  margin-top: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const ParentResourcesSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      backpack: file(name: { eq: "Backpack Blue" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      love: file(name: { eq: "Love" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      support: file(name: { eq: "Support" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { backpack, love, support } = data;

  return (
    <Box as="section" backgroundColor="#f5f5f3">
      <Container>
        <Header id="parents">Families</Header>
        <Text fontSize={2} marginBottom="50px" textAlign="center">
          Help your children grow even if school is closed
        </Text>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxWidth={["100%", "100%", "83%"]}
          marginX="auto"
          paddingTop="80px"
          backgroundColor="#f5f5f3"
        >
          <ItemWrapper>
            <ItemBox>
              <ItemBoxImg image={backpack.childImageSharp.gatsbyImageData} />
              <Text textAlign="center" fontWeight={[600]}>
                How do kids login?
              </Text>
              <Text textAlign="center" fontSize={2}>
                Here’s how your child can easily log in to ClassDojo at home.
              </Text>
              <Button
                as="a"
                href="https://classdojo.zendesk.com/hc/en-us/articles/115004708883-How-Does-My-Child-Log-into-Their-Student-Account-at-Home-#web"
                outline
                block
                marginTop="23px"
                padding="10px 25px"
              >
                See how
              </Button>
            </ItemBox>
          </ItemWrapper>

          <ItemWrapper>
            <ItemBox>
              <ItemBoxImg image={love.childImageSharp.gatsbyImageData} />
              <Text textAlign="center" fontWeight={[600]}>
                Go Beyond School
              </Text>
              <Text textAlign="center" fontSize={2}>
                Build important habits at home with points, goals, and more.
              </Text>
              <Button
                as="a"
                href="https://www.classdojo.com/beyondschool/"
                outline
                block
                marginTop="23px"
                padding="10px 25px"
              >
                Check it out
              </Button>
            </ItemBox>
          </ItemWrapper>

          <ItemWrapper>
            <ItemBox>
              <ItemBoxImg image={support.childImageSharp.gatsbyImageData} />
              <Text textAlign="center" fontWeight={[600]}>
                Have a question?
              </Text>
              <Text textAlign="center" fontSize={2}>
                We’re here for you when you need it. Just drop us a line.
              </Text>
              <Button
                as="a"
                href="https://classdojo.zendesk.com/hc/en-us/categories/200185365-For-parents"
                outline
                block
                marginTop="23px"
                padding="10px 25px"
              >
                Get support
              </Button>
            </ItemBox>
          </ItemWrapper>
        </Flex>
      </Container>
    </Box>
  );
};

export default ParentResourcesSection;
