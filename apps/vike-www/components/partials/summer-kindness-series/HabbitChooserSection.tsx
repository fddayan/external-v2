import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Container from "@src/components/Container";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";
import BookSection from "./BookSection";

const ChooserContainerWrapper = styled("div")`
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
  ${mediaQueries[1]} {
    width: 33%;
    margin-bottom: 70px;
    margin-top: 70px;
  }
`;
const ChooserContainer = styled(Link)`
  color: #000;
  padding: 30px;
  cursor: pointer;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 26px;
  border: 1px solid lightgrey;
  :hover {
    border: 2px solid #00aeef;
  }

  ${mediaQueries[1]} {
    height: 300px;
  }
`;

const ChooserHeader = styled("h3")`
  margin-top: 55px;
  margin-bottom: 20px;
  font-size: 21px;
  line-height: 24px;
  font-weight: 800;
`;

const ChooserText = styled("p")`
  margin: 0;
  font-size: 18px;
  text-align: center;
  color: black;
  font-weight: 600;
`;
const ChooserImg = styled(GatsbyImage)`
  width: 60%;
  left: 20%;

  ${mediaQueries[1]} {
    position: absolute !important;
    top: -35%;
  }
`;

const QuoteHeader = styled("h2")`
  color: #000;
  font-size: 26px;
  font-weight: 900;
  line-height: 40px;
  margin-bottom: 11px;
  margin-top: 50px;
  text-align: center;

  ${mediaQueries[1]} {
    font-size: 36px;
  }
`;
const QuoteFooter = styled("h3")`
  font-size: 28px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 11px;
  margin-top: 20px;
  text-align: center;
  ${mediaQueries[1]} {
    font-size: 36px;
  }
`;
const QuoteImg = styled(GatsbyImage)`
  max-width: 289px;
  width: 100%;
`;

function HabbitChooserSection() {
  const data = useStaticQuery(graphql`
    {
      habbit1: file(name: { eq: "summer-header" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit2: file(name: { eq: "week2-small" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit3: file(name: { eq: "week3resize" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit4: file(name: { eq: "mojo-week-4" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit5: file(name: { eq: "strongemotions_web" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit6: file(name: { eq: "week6_web" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit7: file(name: { eq: "teamwork_web" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit8: file(name: { eq: "courage_500x387" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      habbit9: file(name: { eq: "leadership500x387" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 250, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      quote: file(name: { eq: "mojo_katie" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 320, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { habbit1, habbit2, habbit3, habbit4, habbit5, habbit6, habbit7, habbit8, habbit9, quote } = data;
  return (
    <>
      <Container>
        <Flex flexDirection={["column", "column", "row"]} marginTop="50px">
          <Flex px="15px" flexDirection="column" width="100%">
            <Text fontWeight={600} fontSize="21px" marginTop="22px">
              How does the series work?
            </Text>
            <Text fontSize="15px" marginTop="30px">
              Together, parents and kids discover the 9 essential habits that work together to unlock empathy and
              inspire kind action. Every Thursday from June 21 — August 16, we’ll send an email that introduces a new
              kindness habit to practice. Each weekly update includes research-based tips, ideas and activities to help
              families build the benefits of kindness, together!
            </Text>
          </Flex>
          <Flex px="15px" flexDirection="column" width="100%">
            <Text fontWeight={600} fontSize="21px" marginTop="22px">
              Why is empathy important?
            </Text>
            <Text fontSize="15px" marginTop="30px">
              Empathy — the ability to understand and care for others — is at the root of kindness. Kids who tune-in to
              feelings and want to help others are happier, more successful, and more resilient. Empathy reduces
              conflicts, builds supportive communities, and motivates kids be kind actors, even when nobody's watching
              :)
            </Text>
          </Flex>
        </Flex>

        <Flex flexDirection={["column", "column", "row"]} flexWrap="wrap" width="100%" marginTop="70px">
          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week1")}>
              <ChooserImg image={habbit1.childImageSharp.gatsbyImageData} alt="Reading emotions" />
              <ChooserHeader>
                Kindness Habit 1: <br /> Reading Emotions
              </ChooserHeader>
              <ChooserText>
                Recognize and value the <br /> feelings and needs of others
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week2")}>
              <ChooserImg image={habbit2.childImageSharp.gatsbyImageData} alt="Find your inner hero" />
              <ChooserHeader>
                Kindness Habit 2: <br />
                Find Your Inner Hero
              </ChooserHeader>
              <ChooserText>
                Adopt caring values and
                <br /> the drive to help others
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week3")}>
              <ChooserImg image={habbit3.childImageSharp.gatsbyImageData} alt="Explore new perspectives" />
              <ChooserHeader>
                Kindness Habit 3: <br />
                Explore New Perspectives
              </ChooserHeader>
              <ChooserText>
                Step into someone
                <br /> else's shoes
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week4")}>
              <ChooserImg image={habbit4.childImageSharp.gatsbyImageData} alt="Stretch your imagination" />
              <ChooserHeader>
                Kindness Habit 4:
                <br /> Stretch Your Imagination
              </ChooserHeader>
              <ChooserText>
                Get inspired by great <br />
                stories
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week5")}>
              <ChooserImg image={habbit5.childImageSharp.gatsbyImageData} alt="Keep your cool" />
              <ChooserHeader>
                Kindness Habit 5:
                <br /> Keep Your Cool
              </ChooserHeader>
              <ChooserText>
                Learn to manage strong
                <br />
                emotions
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week6")}>
              <ChooserImg image={habbit6.childImageSharp.gatsbyImageData} alt="Practice kindness" />
              <ChooserHeader>
                Kindness Habit 6:
                <br />
                Practice Kindness
              </ChooserHeader>
              <ChooserText>
                Actions speak lounder
                <br />
                than words
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week7")}>
              <ChooserImg image={habbit7.childImageSharp.gatsbyImageData} alt="All about teamwork" />
              <ChooserHeader>
                Kindness Habit 7: <br /> All About Teamwork
              </ChooserHeader>
              <ChooserText>
                Work together towards <br />a shared goal
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week8")}>
              <ChooserImg image={habbit8.childImageSharp.gatsbyImageData} alt="Show courage" />
              <ChooserHeader>
                Kindness Habit 8:
                <br />
                Show Courage
              </ChooserHeader>
              <ChooserText>
                Stand up, speak out and <br /> help others
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>

          <ChooserContainerWrapper>
            <ChooserContainer to={getRelativePath("/summer-kindness-series-week9")}>
              <ChooserImg image={habbit9.childImageSharp.gatsbyImageData} alt="Kindness leadership" />
              <ChooserHeader>
                Kindness Habit 9:
                <br />
                Kindness Leadership
              </ChooserHeader>
              <ChooserText>
                Make a difference for others,
                <br />
                no matter how small
              </ChooserText>
            </ChooserContainer>
          </ChooserContainerWrapper>
        </Flex>

        <Flex flexDirection="column" justifyContent="center" alignItems="center" position="relative">
          <QuoteHeader>
            "The more you work at being kind <br />
            the kinder you'll be."
          </QuoteHeader>
          <QuoteFooter>- Dr. Michele Borba</QuoteFooter>
          <QuoteImg image={quote.childImageSharp.gatsbyImageData} alt="Mojo and Katie doing a high five" />
          <Box backgroundColor="#9587C9" height="95px" position="absolute" bottom="0" width="100vw" zIndex={-1}></Box>
        </Flex>
      </Container>

      <BookSection />
    </>
  );
}

export default HabbitChooserSection;
