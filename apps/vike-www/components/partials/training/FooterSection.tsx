import React from "react";
import { Flex, Box } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { theme } from "@src/components/nessie-web";
import { Button } from "@src/components/nessie-web";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { useStaticQuery, graphql } from "gatsby";

const FooterSection = () => {
  const imagesData = useStaticQuery(graphql`
    {
      teacher: file(name: { eq: "teacher-basics" }) {
        childImageSharp {
          gatsbyImageData(width: 300, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  return (
    <Box backgroundColor={theme.colors.taro50} padding="80px 0">
      <Container>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Box maxWidth="600px">
            <Text color="white" fontSize="24px" lineHeight={1.25} fontWeight="700">
              Didn't find what you were looking for?
            </Text>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji*/}
            <Text color="white" fontSize="18px" fontWeight="600" marginBottom="40px">
              We'd ❤️ to know what kinds of resources you'd like to see us create next! Let us know by submitting a
              request below.
            </Text>
            <a href="https://www.surveymonkey.com/r/ClassDojo-Resources" target="_blank" rel="noreferrer">
              <Button kind="secondary">Request a resource</Button>
            </a>
          </Box>
          <Box>
            <GatsbyImage
              image={imagesData.teacher.childImageSharp.gatsbyImageData}
              alt="Teacher character in front of a computer"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default FooterSection;
