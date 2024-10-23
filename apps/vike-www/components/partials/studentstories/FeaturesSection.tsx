import React from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import { HeaderStyles, Text } from "@src/components/Text";
import { mediaQueries } from "@src/styles/theme";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import Translate from "@src/components/translation/Translate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";
import { defaultNormalizeStaticQueryResult } from "@src/utils/normalize-static-query-result";

const Header = styled("h1")`
  box-sizing: border-box;
  font-size: 28px;
  margin: 120px auto 60px;
  font-weight: 800;
  line-height: 50px;
  text-align: center;
  color: #363636;

  ${mediaQueries[0]} {
    font-size: 36px;
    margin: 60px auto 80px;
  }
`;

const HeaderImage = styled(GatsbyImageWrapper)<{ left?: boolean }>(
  css`
    z-index: -2;
    top: 0;
    position: absolute !important;
    display: block;
    max-width: 192px;
    width: 100%;
    height: auto;
  `,
  (props) =>
    props.left
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `,
);

const IconBox = styled(Flex)`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
`;
IconBox.defaultProps = {
  width: ["100%", 1 / 3],
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
};
const Icon = styled("img")``;
const IconHeader = styled("h3")`
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 11px;
  margin-top: 22px;
  color: #363636;
`;

const BigPicImg = styled(GatsbyImageWrapper)`
  display: block;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 838px;
`;
const BigPicSideImg = styled(GatsbyImageWrapper)<{ left?: boolean }>(
  css`
    position: absolute !important;
    bottom: 2.5%;
    z-index: -1;
    width: 100%;
    max-width: 335px;
  `,
  (props) =>
    props.left
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `,
);

const BigPicContainer = styled(Flex)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 35%;
  text-align: center;
  width: 100%;
  ${mediaQueries[0]} {
    top: 40%;
  }
`;
BigPicContainer.defaultProps = { flexWrap: "wrap" };
const BigPicBox = styled(Flex)`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #fff;
  margin-bottom: 40px;
  ${mediaQueries[0]} {
    background-color: transparent;
  }
`;
BigPicBox.defaultProps = {
  width: ["100%", 1 / 2],
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
};
const BigPicBoxImg = styled(GatsbyImageWrapper)`
  display: none !important;
  ${mediaQueries[0]} {
    display: block !important;
  }
`;
const BigPicBoxHeader = styled("h4")`
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 800;
  line-height: 24px;
  margin-bottom: 11px;
  margin-top: 11px;
  color: #363636;
`;

const ParentFeatureBox = styled(Flex)``;
ParentFeatureBox.defaultProps = {
  width: "100%",
  flexDirection: ["column", "row"],
  alignItems: "center",
  justifyContent: "start",
  marginTop: "60px",
};
const ParentFeatureBoxHeader = styled("h4")`
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 11px;
  margin-top: 20px;
  color: #363636;
`;
const ParentFeatureBoxImg = styled(GatsbyImageWrapper)`
  margin-left: auto;
  margin-right: auto;
`;

const StudentSectionHeader = styled("h2")`
  font-size: 28px;
  font-weight: 800;
  line-height: 40px;
  margin-bottom: 0;
  margin-top: 76px;
  text-align: center;
  color: #363636;
`;
const StudentSectionSubHeader = styled("h4")`
  margin-bottom: 50px;
  font-size: 18px;
  line-height: 24px;
  margin-top: 11px;
  font-weight: 600;
  text-align: center;
  color: #363636;
`;
const StudentFeatureBox = styled(Flex)``;
StudentFeatureBox.defaultProps = {
  width: "100%",
  flexDirection: ["column", "row"],
  alignItems: ["center", "start"],
  justifyContent: ["center", "start"],
  marginTop: "60px",
};

function FeaturesSection() {
  const data = useStaticQuery(graphql`
    {
      right: file(name: { eq: "section1-right" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      left: file(name: { eq: "section1-left" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      bigPic: file(name: { eq: "section4-main-img" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 838, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      bigPicLeft: file(name: { eq: "section4-img-left-bottom" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 335, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      bigPicRight: file(name: { eq: "section4-img-right-bottom" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 335, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      one: file(name: { eq: "section5-number-1" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      two: file(name: { eq: "section5-number-2" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      three: file(name: { eq: "section5-number-3" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      directus {
        page_student_stories {
          feature_one_icon {
            id
            filename_download
            filename_disk
          }
          feature_two_icon {
            id
            filename_download
            filename_disk
          }
          feature_three_icon {
            id
            filename_download
            filename_disk
          }
          flow_one_image {
            id
            filename_disk
          }
          flow_two_image {
            id
            filename_disk
          }
          flow_three_icon {
            id
            filename_disk
          }
          feature_left_icon {
            filename_disk
          }
          feature_right_icon {
            filename_disk
          }
          feature_bellow_one_icon {
            filename_disk
          }
          feature_bellow_two_icon {
            filename_disk
          }
          feature_bellow_three_icon {
            filename_disk
          }
        }
      }
    }
  `);

  defaultNormalizeStaticQueryResult(data);

  const {
    left,
    right,
    bigPic,
    bigPicLeft,
    bigPicRight,
    one,
    two,
    three,
    directus: {
      page_student_stories: {
        feature_one_icon,
        feature_two_icon,
        feature_three_icon,
        feature_left_icon,
        feature_right_icon,
        feature_bellow_one_icon,
        feature_bellow_two_icon,
        feature_bellow_three_icon,
        flow_one_image,
        flow_two_image,
        flow_three_icon,
      },
    },
  } = data;
  return (
    <Box as="section" position="relative">
      <HeaderImage left image={left} alt="" />
      <HeaderImage image={right} alt="" />
      <Container id="fits-classroom">
        <Header>
          <MarkedTranslate path="directus.page_student_stories.features_title" />
        </Header>
        <Flex flexWrap="wrap">
          <IconBox>
            <Icon src={feature_one_icon.file.publicURL} alt="" />
            <IconHeader>
              <Translate path="directus.page_student_stories.feature_one_title" />
            </IconHeader>
            <Text>
              <Translate path="directus.page_student_stories.feature_one_text" />
            </Text>
          </IconBox>
          <IconBox>
            <Icon src={feature_two_icon.file.publicURL} alt="" />
            <IconHeader>
              <Translate path="directus.page_student_stories.feature_two_title" />
            </IconHeader>
            <Text>
              <Translate path="directus.page_student_stories.feature_two_text" />
            </Text>
          </IconBox>
          <IconBox>
            <Icon src={feature_three_icon.file.publicURL} alt="" />
            <IconHeader>
              <Translate path="directus.page_student_stories.feature_three_title" />
            </IconHeader>
            <Text>
              <Translate path="directus.page_student_stories.feature_three_text" />
            </Text>
          </IconBox>
        </Flex>
      </Container>

      <Flex position="relative">
        <BigPicImg image={bigPic} alt="Images being transfered between two tabs running classdojo apps" />
        <BigPicSideImg left image={bigPicLeft} alt="Houses on a hill" />
        <BigPicSideImg image={bigPicRight} alt="Houses on a hill" />
        <BigPicContainer>
          <BigPicBox>
            <BigPicBoxImg image={feature_left_icon} alt="Mojo and Katie playing with glue" />
            <BigPicBoxHeader>
              <Translate path="directus.page_student_stories.feature_left_title" />
            </BigPicBoxHeader>
            <Text>
              <MarkedTranslate path="directus.page_student_stories.feature_left_text" debug />
            </Text>
          </BigPicBox>
          <BigPicBox id="parents-see">
            <BigPicBoxImg image={feature_right_icon} alt="Student portfolio folders" />
            <BigPicBoxHeader>
              <Translate path="directus.page_student_stories.feature_right_title" />
            </BigPicBoxHeader>
            <Text>
              <MarkedTranslate path="directus.page_student_stories.feature_left_text" />
            </Text>
          </BigPicBox>
        </BigPicContainer>
      </Flex>

      <Container>
        <ParentFeatureBox>
          <Flex width={["100%", "40%"]} justifyContent="center">
            <ParentFeatureBoxImg image={feature_bellow_one_icon} alt="Chat between teacher and parent" />
          </Flex>
          <Box width={["100%", "50%"]} paddingLeft={[0, "60px"]}>
            <ParentFeatureBoxHeader>
              <Translate path="directus.page_student_stories.feature_bellow_one_title" />
            </ParentFeatureBoxHeader>
            <Text>
              <Translate path="directus.page_student_stories.feature_bellow_one_text" />
            </Text>
          </Box>
        </ParentFeatureBox>
        <ParentFeatureBox>
          <Flex width={["100%", "40%"]} justifyContent="center">
            <ParentFeatureBoxImg image={feature_bellow_two_icon} alt="Katie and her dad celebrating" />
          </Flex>
          <Box width={["100%", "50%"]} paddingLeft={[0, "60px"]}>
            <ParentFeatureBoxHeader>
              <Translate path="directus.page_student_stories.feature_bellow_one_title" />
            </ParentFeatureBoxHeader>
            <Text>
              <Translate path="directus.page_student_stories.feature_bellow_two_text" />
            </Text>
          </Box>
        </ParentFeatureBox>
        <ParentFeatureBox>
          <Flex width={["100%", "40%"]} justifyContent="center">
            <ParentFeatureBoxImg image={feature_bellow_three_icon} alt="Mojo and Katie behind sales booths" />
          </Flex>
          <Box width={["100%", "50%"]} paddingLeft={[0, "60px"]}>
            <ParentFeatureBoxHeader>
              <Translate path="directus.page_student_stories.feature_bellow_three_title" />
            </ParentFeatureBoxHeader>
            <Text>
              <Translate path="directus.page_student_stories.feature_bellow_three_text" />
            </Text>
          </Box>
        </ParentFeatureBox>
      </Container>

      <Container maxWidth="720px" marginY="120px" id="students-post">
        <StudentSectionHeader>
          <Translate path="directus.page_student_stories.flow_title" />
        </StudentSectionHeader>
        <StudentSectionSubHeader>
          <Translate path="directus.page_student_stories.flow_subtitle" />
        </StudentSectionSubHeader>

        <StudentFeatureBox>
          <Flex width={["100%", 1 / 3]} justifyContent="center" alignItems={["center", "start"]} flexDirection="column">
            <GatsbyImageWrapper image={one} alt="number one" />
            <HeaderStyles
              as="h4"
              fontSize="18px"
              fontWeight={700}
              textAlign={["center", "left"]}
              marginTop="35px"
              marginBottom="10px"
            >
              <Translate path="directus.page_student_stories.flow_one_title" />
            </HeaderStyles>
            <Text maxWidth="80%" textAlign={["center", "left"]}>
              <Translate path="directus.page_student_stories.flow_one_text" />
            </Text>
          </Flex>
          <Box width={["auto", 2 / 3]} mx="auto" marginTop={["30px", 0]}>
            <img src={flow_one_image.file.publicURL} alt="Child using the classdojo app" />
          </Box>
        </StudentFeatureBox>
        <StudentFeatureBox>
          <Flex width={["100%", 1 / 3]} justifyContent="center" alignItems={["center", "start"]} flexDirection="column">
            <GatsbyImageWrapper image={two} alt="Number two" />
            <HeaderStyles
              as="h4"
              fontSize="18px"
              fontWeight={700}
              textAlign={["center", "left"]}
              marginTop="35px"
              marginBottom="10px"
            >
              <Translate path="directus.page_student_stories.flow_two_title" />
            </HeaderStyles>
            <Text maxWidth="80%" textAlign={["center", "left"]}>
              <Translate path="directus.page_student_stories.flow_two_text" />
            </Text>
          </Flex>
          <Box width={["100%", 2 / 3]} mx="auto" marginTop={["30px", 0]}>
            <img src={flow_two_image.file.publicURL} alt="Story examples" />
          </Box>
        </StudentFeatureBox>
        <StudentFeatureBox>
          <Flex width={["100%", 1 / 3]} justifyContent="center" alignItems={["center", "start"]} flexDirection="column">
            <GatsbyImageWrapper image={three} alt="Number three" />
            <HeaderStyles
              as="h4"
              fontSize="18px"
              fontWeight={700}
              textAlign={["center", "left"]}
              marginTop="35px"
              marginBottom="10px"
            >
              <Translate path="directus.page_student_stories.flow_three_title" />
            </HeaderStyles>
            <Text maxWidth="80%" textAlign={["center", "left"]}>
              <Translate path="directus.page_student_stories.flow_three_text" />
            </Text>
          </Flex>
          <Box width={["auto", 2 / 3]} mx="auto" marginTop={["30px", 0]}>
            <img src={flow_three_icon.file.publicURL} alt="Kid celebrating" />
          </Box>
        </StudentFeatureBox>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
