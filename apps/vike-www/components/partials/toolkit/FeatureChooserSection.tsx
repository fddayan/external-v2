import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import { mediaQueries } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";
import Translate from "@src/components/translation/Translate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const Header = styled("h1")`
  font-size: 43px;
  font-weight: 800;
  line-height: 52px;
  margin: 0 0 25px;
  text-align: center;
`;

const TagLine = styled("p")`
  font-size: 18px;
  margin: 0 auto 37px;
  max-width: none;
  text-align: center;
`;

const ConfettiLeftImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  top: -20px;
  left: 0;
  width: 100%;
  max-width: 733px;
`;
const ConfettiRightImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  top: -20px;
  right: 0;
  width: 100%;
  max-width: 364px;
`;

const ChooserBox = styled(Link)`
  color: #363636;
  transition: all 0.2s;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);
  display: inline-block;
  border: 1px solid #efefef;
  border-radius: 20px;
  padding: 16px;
  text-align: center;
  font-size: 14px;
  margin-left: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
  width: 130px;
  height: auto;
  ${mediaQueries[0]} {
    width: 160px;
    font-size: 18px;
  }
  ${mediaQueries[1]} {
    width: 170px;
  }
  :hover {
    box-shadow: 0 3px 16px rgba(0, 0, 0, 0.07);
  }
`;

const ChooserBoxImg = styled(GatsbyImageWrapper)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  width: 100%;
  max-width: 65px;
  ${mediaQueries[0]} {
    max-width: 80px;
  }
`;

function FeatureChooserSection() {
  const data = useStaticQuery(graphql`
    {
      confettiLeft: file(name: { eq: "confetti-LHS@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 480, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      confettiRight: file(name: { eq: "confetti-RHS@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 480, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      directus {
        page_toolkit {
          picker_music_icon {
            filename_disk
          }
          picker_directions_icon {
            filename_disk
          }
          picker_timer_icon {
            filename_disk
          }
          picker_share_icon {
            filename_disk
          }
          picker_monitor_icon {
            filename_disk
          }
          picker_generator_icon {
            filename_disk
          }
          picker_meeting_icon {
            filename_disk
          }
          picker_selector_icon {
            filename_disk
          }
        }
      }
    }
  `);
  const {
    confettiLeft,
    confettiRight,
    directus: {
      page_toolkit: {
        picker_music_icon,
        picker_directions_icon,
        picker_timer_icon,
        picker_share_icon,
        picker_monitor_icon,
        picker_generator_icon,
        picker_meeting_icon,
        picker_selector_icon,
      },
    },
  } = data;
  return (
    <Box as="section" position="relative" color="#363636">
      <ConfettiLeftImg image={confettiLeft.childImageSharp.gatsbyImageData} alt="Confetti" />
      <ConfettiRightImg image={confettiRight.childImageSharp.gatsbyImageData} alt="Confetti" />
      <Container>
        <Flex width={["100%", 8 / 12]} mx="auto" alignItems="center" flexDirection="column" paddingTop="75px">
          <Header>
            <Translate path="directus.page_toolkit.title" />
          </Header>
          <TagLine>
            <Translate path="directus.page_toolkit.tagline" />
          </TagLine>
          <Box>
            <Button big as={Link} to={getRelativePath("/toolkit/directions")}>
              <Translate path="directus.page_toolkit.button_text" />
            </Button>
          </Box>
        </Flex>
        <Flex flexWrap="wrap" paddingTop="75px" justifyContent="center" maxWidth={["320px", "760px"]} mx="auto">
          <ChooserBox to={getRelativePath("/toolkit/directions")}>
            <ChooserBoxImg image={picker_directions_icon} alt="Directions icon" />
            <Translate path="directus.page_toolkit.picker_directions_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/groupmaker")}>
            <ChooserBoxImg image={picker_generator_icon} alt="Generator icon" />
            <Translate path="directus.page_toolkit.picker_generator_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/music")}>
            <ChooserBoxImg image={picker_music_icon} alt="Music icon" />
            <Translate path="directus.page_toolkit.picker_music_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/noisemeter")}>
            <ChooserBoxImg image={picker_monitor_icon} alt="Monitor icon" />
            <Translate path="directus.page_toolkit.picker_monitor_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/thinkpairshare")}>
            <ChooserBoxImg image={picker_share_icon} alt="Share icon" />
            <Translate path="directus.page_toolkit.picker_share_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/random")}>
            <ChooserBoxImg image={picker_selector_icon} alt="Selector icon" />
            <Translate path="directus.page_toolkit.picker_selector_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/timer")}>
            <ChooserBoxImg image={picker_timer_icon} alt="Timer icon" />
            <Translate path="directus.page_toolkit.picker_timer_text" />
          </ChooserBox>
          <ChooserBox to={getRelativePath("/toolkit/today")}>
            <ChooserBoxImg image={picker_meeting_icon} alt="Meeting icon" />
            <Translate path="directus.page_toolkit.picker_meeting_text" />
          </ChooserBox>
        </Flex>
      </Container>
    </Box>
  );
}

export default FeatureChooserSection;
