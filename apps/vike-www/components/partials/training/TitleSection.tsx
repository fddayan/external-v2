import React from "react";
import Container from "@src/components/Container";
import { Flex, Box } from "@src/components/Boxes";
import { Text, H1 } from "@src/components/Text";
import { theme } from "@src/components/nessie-web";
import { GatsbyImage } from "gatsby-plugin-image";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { useStaticQuery, graphql } from "gatsby";

const TitleSection = ({ data }) => {
  const imagesData = useStaticQuery(graphql`
    {
      blobs: file(name: { eq: "bg-blobs" }) {
        childImageSharp {
          gatsbyImageData(quality: 90, placeholder: NONE, layout: FULL_WIDTH)
        }
      }
      portfolios: file(name: { eq: "portfolios-dojo" }) {
        childImageSharp {
          gatsbyImageData(width: 380, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const modalContext = React.useContext(ModalContext);

  const { page_heading, page_description } = data;

  function openVideoModal(id) {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: id });
  }

  return (
    <Box>
      <Container>
        <Flex flexDirection={["column", "column", "row"]} alignItems="center" justifyContent="center">
          <Flex
            textAlign="center"
            flexDirection="column"
            flexGrow={1}
            alignItems="center"
            marginRight={["20px", "60px"]}
          >
            <H1 color={theme.colors.taro90} fontWeight="900" fontSize="8">
              {page_heading}
            </H1>
            <Text color="#7174A0" fontSize="18px" fontWeight="700">
              {page_description}
            </Text>
          </Flex>
          <Box minWidth="380px" position="relative">
            <GatsbyImage image={imagesData.portfolios.childImageSharp.gatsbyImageData} alt="Mojo illustration" />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default TitleSection;
