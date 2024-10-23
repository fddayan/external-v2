import React from "react";
import { Flex, Box } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const ContainerBox = styled(Container)`
  margin-bottom: 100px;
`;

const BenefitsImage = styled(GatsbyImageWrapper)`
  width: 100%;
  max-width: 457px;
`;

const BenefitsText = styled(Text)`
  ul {
    margin-left: 20px;
    padding: 0;
    li {
      font-size: 18px;
      ${mediaQueries[0]} {
        font-size: 16px;
      }
    }
  }
  p:nth-of-type(2) {
    font-size: 18px;
  }
  p:first-of-type {
    color: #423e5d;
    font-size: 22px;
    margin: 20px 0;
    text-align: center;
    ${mediaQueries[0]} {
      text-align: left;
    }
    a {
      font-weight: 600;
      color: #00bcf2;
    }
    @media (min-width: 991px) {
      max-width: 510px;
    }
  }
`;

const BenefitsTitle = styled(Text)`
  font-size: 22px;
  font-weight: 800;
  color: #423e5d;
  text-align: center;
  ${mediaQueries[0]} {
    text-align: left;
    font-size: 30px;
  }
`;

const BenefitsComponent: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_mindfulness {
          benefits_image {
            filename_disk
          }
        }
      }
    }
  `);

  return (
    <ContainerBox>
      <Flex alignItems="center" flexDirection={["column", "row"]} id="benefits" marginTop={["20px", "60px"]}>
        <Box width="100%" maxWidth={["240px", "475px"]} marginRight={[0, 30]}>
          <BenefitsImage image={data.directus.page_mindfulness.benefits_image} alt="Mojo illustration" />
        </Box>

        <Flex flexDirection="column" flexGrow={1}>
          <BenefitsTitle>
            <Translate path="directus.page_mindfulness.benefits_title" />
          </BenefitsTitle>
          <BenefitsText>
            <MarkedTranslate path="directus.page_mindfulness.benefits_text" />
          </BenefitsText>
        </Flex>
      </Flex>
    </ContainerBox>
  );
};

export default BenefitsComponent;
