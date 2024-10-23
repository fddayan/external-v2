import * as React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { BodyText, Title } from "@src/components/nessie-web";
import HeroMojo from "@src/assets/images/beyond-lp/memories.svg";
import Evasmemories from "@src/assets/images/beyond-lp/evasmemories.svg";
import GrapeBg from "@src/assets/images/beyond-lp/bg-simpler.svg";
import Translate from "@src/components/translation/Translate";

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
  margin-left: 0;
  ${mediaQueries[0]} {
    margin-left: 40px;
    align-items: center;
  }
`;
InfoBox.defaultProps = {
  flexDirection: "column",
  alignItems: ["center", "center", "start"],
};

const HeroSectionStyled = styled(Box)`
  padding-bottom: 40px;
  background-image: url(${GrapeBg});
  background-color: #eaecf5;
  background-position: center top;
  background-size: 6000px;
  background-repeat: no-repeat;
  overflow: hidden;
  ${mediaQueries[1]} {
    background-size: auto;
  }
  ${mediaQueries[2]} {
    background-size: auto;
  }
`;

HeroSectionStyled.defaultProps = {};

const InfoBoxTitle = styled("h1")`
  color: white;
  font-size: 36px;
  text-align: center;
  padding-top: 50px;
  font-weight: 800;
  ${mediaQueries[2]} {
    min-width: 550px;
  }
`;

const HeroSection = () => {
  return (
    <HeroSectionStyled>
      <Container>
        <Flex justifyContent="space-between" flexDirection={["column", "row", "row"]}>
          <Box>
            <InfoBoxTitle>
              <Translate path="directus.page_memories.hero" />
            </InfoBoxTitle>
          </Box>
          <Box marginTop={60}>
            <img src={HeroMojo} alt="Astronaut Mojo" />
          </Box>
        </Flex>
      </Container>
      <Container marginTop={[`120, 40`]}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={["column", "column", "row-reverse"]}
          marginTop="100px"
        >
          <Box marginLeft={[0, 0, 60]} textAlign={["center", "left", "left"]}>
            <Translate path="directus.page_memories.title" />
            <br />
            <BodyText>
              <Translate path="directus.page_memories.description" />
            </BodyText>
          </Box>
          <Box width="400px" minWidth="400px" marginTop={[40, 0, 0]} textAlign={["center", "right"]}>
            <img src={Evasmemories} alt="Eva's Memories!" />
          </Box>
        </Flex>
      </Container>
    </HeroSectionStyled>
  );
};

export default HeroSection;
