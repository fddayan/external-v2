import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";

const HeaderSub = styled("h3")`
  color: #000;
  font-size: 28px;
  font-weight: 800;
  line-height: 24px;
  margin-bottom: 0;
  margin-top: 22px;
`;
const Header = styled("h1")`
  font-size: 48px;
  font-weight: 900;
  line-height: 52px;
  margin: 10px 0 11px;
`;

const LeadershipImg = styled(GatsbyImage)`
  max-height: 380px;
  max-width: 500px;
  width: 100%;
`;

const IntroHeader = styled("h2")`
  font-size: 24px;
  font-weight: 800;
  line-height: 40px;
  margin-bottom: 11px;
  margin-top: 22px;
`;

const Link = styled("a")`
  background-color: transparent;
  color: #00a8d9;
  font-weight: 600;
  :hover {
    color: #00a8d9;
  }
`;
const EmailInput = styled("input")`
  border: 1px solid currentcolor;
  border-image: none 100% 1 0 stretch;
  border-radius: 50px;
  font-size: 20px;
  margin: 0 auto 0;
  padding: 6px 20px;
  display: block;
  height: 42px;
`;

const EmailForm = styled("form")`
  margin-top: 40px;
`;

const EmailImg = styled(GatsbyImage)`
  max-width: 376px;
  width: 100%;
  margin: 40px auto 0;
  display: none !important;
  ${mediaQueries[1]} {
    display: block !important;
  }
`;

const buttonOverride = css`
  font-size: 16px;
  border-radius: 30px;
  padding: 10px 25px;
  display: inline-block;
`;

function WelcomeSection() {
  const data = useStaticQuery(graphql`
    {
      leadership: file(name: { eq: "leadership500x387" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 500, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      email: file(name: { eq: "section3-img" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 376, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { leadership, email } = data;
  return (
    <>
      <Container as="section">
        <Flex alignItems="start" flexWrap="wrap" my="70px">
          <Flex width={["100%", "100%", 5 / 12]} flexDirection="column" px="15px">
            <HeaderSub>Kindness Habit 9:</HeaderSub>
            <Header>Kindness Leadership</Header>
            <Text fontSize="18px" marginBottom="30px" marginTop="15px">
              Make a difference for others, no matter how small
            </Text>
            <Box>
              <Button as={GatsbyLink} to={getRelativePath("/summer-kindness-series-week9")} css={buttonOverride}>
                Check it out
              </Button>
            </Box>
          </Flex>
          <Flex width={["100%", "100%", 7 / 12]} px="15px">
            <LeadershipImg image={leadership.childImageSharp.gatsbyImageData} alt="Kindness leadership image" />
          </Flex>
        </Flex>
      </Container>

      <Box as="section" backgroundColor="#FFDC61" paddingY="50px" paddingX="40px">
        <Container>
          <Flex flexWrap="wrap">
            <Flex flexDirection="column" px="15px" width={["100%", "100%", 1 / 2]}>
              <IntroHeader>
                Welcome to the Summer <br />
                Kindness Series!
              </IntroHeader>
              <Text fontSize={["14px", "14px", "18px"]} fontWeight={[600, 600, 400]} marginTop="30px">
                ClassDojo and child development expert Dr. Michele Borba have teamed up to create The Summer Kindness
                Series for K-6 families!
              </Text>
              <Text fontSize={["14px", "14px", "18px"]} fontWeight={[600, 600, 400]} marginTop="30px">
                From June 21 - August 16, we’ll send a weekly email that introduces a new habit and easy ways to
                practice it at home. Join in anytime as we launch new content every week and share the
                #SummerKindnessSeries!
              </Text>
              <Text fontSize={["14px", "14px", "18px"]} fontWeight={[600, 600, 400]} marginTop="30px">
                Questions, or curious to learn more before getting started? Download our FAQs{" "}
                <Link href="https://static.classdojo.com/img/2018-summer_kindness/SummerFAQ.pdf" target="_blank">
                  here
                </Link>
                !
              </Text>
            </Flex>
            <Flex flexDirection="column" px="15px" width={["100%", "100%", 1 / 2]}>
              <Text fontSize={["14px", "14px", "18px"]} fontWeight={600} textAlign="center" marginTop="22px">
                Get it free, straight to your inbox
              </Text>
              <EmailForm
                name="emailForm"
                acceptCharset="UTF-8"
                autoComplete="off"
                encType="multipart/form-data"
                method="post"
                noValidate
                action="https://classdojo1.wufoo.com/forms/mg15v2o1uuos1b/#public"
              >
                <div className="form-group">
                  <EmailInput
                    id="Field1"
                    name="Field1"
                    type="email"
                    spellCheck="false"
                    maxLength={255}
                    placeholder="Your Email"
                  />
                  <br />
                  <Flex justifyContent="center">
                    <Button type="submit" name="saveForm" mx="auto" css={buttonOverride}>
                      Get the series
                    </Button>
                  </Flex>
                </div>
                <Box display="none">
                  <label htmlFor="comment">Do Not Fill This Out</label>
                  <textarea name="comment" id="comment" rows={1} cols={1}></textarea>
                  <input
                    type="hidden"
                    id="idstamp"
                    name="idstamp"
                    value="x8qBn0zC6TA9yL3nqcerXt3qFiyMV9dOsmrZV9jei4g="
                  />
                </Box>
              </EmailForm>
              <EmailImg
                image={email.childImageSharp.gatsbyImageData}
                alt="ClassDojo family characters sitting on a couch"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default WelcomeSection;
