import React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { css } from "@emotion/react";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries } from "@src/styles/theme";

const ActivityContainerWrapper = styled("div")`
  padding: 0 15px 0;
  width: 100%;
  margin-bottom: 20px;

  ${mediaQueries[0]} {
    width: 33%;
    margin-bottom: 0;
  }
`;
const ActivityContainer = styled("a")`
  border: 1px solid #d3d3d3;
  border-radius: 26px;
  color: #000;
  cursor: pointer;
  height: 300px;
  overflow: hidden;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const SummerKindnessModalContent = ({ header1, text1, text2, header2, items }) => {
  const data = useStaticQuery(graphql`
    {
      pdfIcon: file(name: { eq: "pdf-icon" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      templateIcon: file(name: { eq: "template-icon" }, relativePath: { regex: "/summer-kindness-series/" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { pdfIcon, templateIcon } = data;
  return (
    <Flex flexDirection="column" padding="20px" marginTop="30px" color="#363636" width="100%">
      <Text as="h3" fontSize="24px" fontWeight={800} lineHeight="40px">
        {header1}
      </Text>
      <Text fontSize="18px" marginTop="30px">
        {text1}
      </Text>
      <Text fontSize="18px" marginTop="30px">
        {text2}
      </Text>
      <Text as="h3" fontSize="21px" fontWeight={800} lineHeight="24px" marginTop="30px">
        {header2}
      </Text>
      <Flex width="100%" flexWrap="wrap">
        {items &&
          items.map((item, index) => (
            <ActivityContainerWrapper key={`activityitem-${index}`}>
              <ActivityContainer href={item.href} target="_blank">
                {item.youtubeUrl && (
                  <iframe
                    title="Youtube video"
                    src={item.youtubeUrl}
                    allow="autoplay; encrypted-media"
                    allowFullScreen={true}
                    width="560"
                    height="315"
                    frameBorder="0"
                    css={css`
                      width: 100%;
                    `}
                  />
                )}
                {!item.youtubeUrl && (
                  <>
                    {item.icon === "pdf" && (
                      <GatsbyImage image={pdfIcon.childImageSharp.gatsbyImageData} alt="Activity icon" />
                    )}
                    {item.icon === "template" && (
                      <GatsbyImage image={templateIcon.childImageSharp.gatsbyImageData} alt="Cards icon" />
                    )}
                    <Box px="30px">
                      <Text as="h3" color="#00bcf2" fontWeight={600} fontSize="21px" marginTop="20px">
                        {item.text}
                      </Text>
                    </Box>
                  </>
                )}
              </ActivityContainer>
            </ActivityContainerWrapper>
          ))}
      </Flex>
    </Flex>
  );
};

export default SummerKindnessModalContent;
