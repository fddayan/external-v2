import React from "react";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const Divider = styled("hr")`
  max-width: 420px;
  border-color: #8878f2;
  margin: auto;
`;

const TextJoin = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  ${mediaQueries[0]} {
    padding: 40px 0;
  }
  .title {
    text-transform: capitalize;
    font-size: 36px;
    color: #423e5d;
    font-weight: 800;
    ${mediaQueries[0]} {
      font-size: 3em;
    }
  }
  .subtitle {
    color: #8878f2;
    margin: 0 auto;
    max-width: 680px;
    font-size: 22px;
    text-align: center;
    font-weight: 800;
    ${mediaQueries[0]} {
      font-size: 2rem;
    }
  }
  .logos {
    font-size: 24px;
    margin-top: 50px;
  }
`;
const LogoImage = styled(GatsbyImageWrapper)``;
const TextVideo = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  ${mediaQueries[0]} {
    padding: 10px 110px 40px;
  }
  .title {
    font-size: 1.8em;
    color: #423e5d;
    font-weight: 800;
    text-align: center;
  }
  .subtitle {
    font-size: 1.6em;
    color: #423e5d;
    text-align: center;
  }
  .left {
    margin-right: 20px;
    position: relative;
    .play-video {
      position: absolute;
      bottom: 7px;
      right: -6px;
    }
  }
  .right {
    .title,
    .subtitle {
      text-align: left;
      line-height: 25px;
    }
    .title {
      font-size: 24px;
    }
    .subtitle {
      font-size: 18px;
    }
  }
`;

const HeaderSubMenu: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_mindfulness {
          hero_image {
            filename_disk
          }
        }
      }
    }
  `);

  return (
    <Flex flexDirection="column">
      <Container>
        <TextJoin>
          <Text className="title" textAlign="center">
            <Translate path="directus.page_mindfulness.title" />
          </Text>
          <Text className="subtitle">
            <Translate path="directus.page_mindfulness.subtitle" />
          </Text>

          <Flex className="logos" flexWrap="wrap" justifyContent="center">
            <span aria-hidden={true}>❤️</span>{" "}
            <LogoImage image={data.directus.page_mindfulness.hero_image} alt="Yale University logo" />{" "}
            <span aria-hidden={true}>❤️</span>
          </Flex>
          <Divider />
        </TextJoin>
      </Container>
      <Container>
        <TextVideo>
          <Text className="title">
            <Translate path="directus.page_mindfulness.title_two" />
          </Text>
          <Text className="subtitle">
            <Translate path="directus.page_mindfulness.subtitle_two" />
          </Text>
        </TextVideo>
      </Container>
    </Flex>
  );
};

export default HeaderSubMenu;
