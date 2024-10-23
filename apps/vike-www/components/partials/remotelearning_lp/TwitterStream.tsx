import React from "react";
import Helmet from "react-helmet";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import { fontSize, space, textAlign, SpaceProps } from "styled-system";

const ItemHeader = styled<SpaceProps>("h2")`
  padding: 76px 0 25px 0;
  margin-top: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  text-align: center;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
  ${space}
  ${fontSize}
`;

const TwitterSection = () => {
  return (
    <Box as="section" backgroundColor="#f5f5f3" paddingBottom="60px">
      <Container>
        <Flex
          flexDirection="column"
          justifyContent="center"
          width="100%"
          maxWidth={["100%", "100%", "83%"]}
          marginX="auto"
          backgroundColor="#fff"
          padding={["50px 15px", "50px"]}
          marginBottom="30px"
          css={css`
            border: 1px solid transparent;
            box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
          `}
        >
          <ItemHeader
            padding="0"
            textAlign={["center", "center", "left"]}
            fontSize={3}
          >
            #remotelearning<span aria-hidden={true}>📚</span>{" "}
            #remoterelationships❤️
          </ItemHeader>
          <a
            data-height="1000"
            className="twitter-timeline"
            href="https://twitter.com/ClassDojo/timelines/1238574132792643588?ref_src=twsrc%5Etfw"
            data-dnt="true"
          >
            #RemoteRelationships - Curated tweets by ClassDojo
          </a>
          <Helmet>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </Helmet>
        </Flex>
      </Container>
    </Box>
  );
};

export default TwitterSection;
