import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import Container from "@src/components/Container";
import styled from "@emotion/styled";

const BookImg = styled(GatsbyImage)`
  width: 150px;
  margin-bottom: 20px;
`;
const Link = styled("a")`
  color: #00bcf2;
  font-weight: 600;
  :hover {
    color: #00a8d9;
  }
`;

function BookSection() {
  const data = useStaticQuery(graphql`
    {
      book: file(name: { eq: "unselfiebook" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 150, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);
  const { book } = data;
  return (
    <Flex backgroundColor="#9587C9" color="#fff" paddingBottom="66px" width="100%">
      <Container>
        <Flex
          marginTop="50px"
          fontSize="18px"
          justifyContent="center"
          alignItems={["center", "center", "start"]}
          flexDirection={["column", "column", "row"]}
        >
          <BookImg image={book.childImageSharp.gatsbyImageData} alt="Unselfie book cover" />
          <Box maxWidth="421px" marginLeft={[0, 0, "50px"]} textAlign={["center", "center", "left"]}>
            <Text>
              *Research and material is sourced and adapted from{" "}
              <Link
                href="https://www.amazon.com/UnSelfie-Empathetic-Succeed-All-About-Me-World/dp/1501110071"
                target="_blank"
              >
                Unselfie: Why Empathetic Kids Succeed In Our All-About-Me World.
              </Link>
            </Text>
            <Text>
              Learn more about{" "}
              <Link href="http://micheleborba.com/bio/" target="_blank">
                Dr. Michele Borba
              </Link>
            </Text>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}

export default BookSection;
