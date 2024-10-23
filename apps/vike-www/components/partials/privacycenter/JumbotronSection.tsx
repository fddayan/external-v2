import React from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Flex } from "@src/components/Boxes";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import backgroundImage from "@src/assets/images/privacycenter/privacy_center@2x.jpg";
import { getRelativePath } from "@src/utils/routes";
import { Link } from "gatsby";

const JumbotronHeader = styled("h1")`
  display: block;
  font-size: 36px;
  margin: 0;
  text-shadow: 2px 2px 2px rgba(4, 76, 102, 0.5);
  color: #fff;
  line-height: 1.1;
  font-weight: 400;
  z-index: 3;
  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 64px;
  }
`;

const JumbotronSubHeader = styled("p")`
  display: block;
  color: #fff;
  margin: 0 auto;
  font-size: 24px;
  font-weight: 200;
  line-height: 1.4;
  text-align: center;
`;

const Shortcuts = styled("ul")`
  display: flex;
  flex-direction: row;
  li {
    list-style-type: none;
    white-space: nowrap;
    &:not(:first-child, :last-child) {
      &:after {
        content: "•";
        margin-left: 8px;
      }
    }
  }
  a {
    color: #0092e5;
  }
  a:hover {
    text-decoration: underline;
  }
  gap: 8px;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  margin-inline: auto;
  padding-inline: 24px;
  margin-bottom: 0;
`;

const ScrollableSection = styled("nav")`
  background-color: #ebf2ff;
  border-bottom: 1px solid #cce3ff;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
`;

const JumbotronSection = () => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        page_privacy {
          shortcuts
        }
      }
    }
  `);

  const shortcuts = data.directus.page_privacy.shortcuts;
  return (
    <>
      <div
        css={css`
          height: 200px;
          background-image: url(${backgroundImage});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          ${mediaQueries[0]} {
            height: 400px;
          }
        `}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          backgroundColor={["#2cbcf9", "transparent"]}
        >
          <JumbotronHeader>
            <Translate path="directus.page_privacycenter.title" />
          </JumbotronHeader>
          <JumbotronSubHeader>
            <Translate path="directus.page_privacycenter.subtitle" />
          </JumbotronSubHeader>
        </Flex>
      </div>
      <ScrollableSection css={{}}>
        <Shortcuts>
          <li>
            <Translate path="layouts.main.useful_links" />
          </li>
          <li>
            <a href={shortcuts[0].value}>
              <Translate path="directus.page_privacycenter.shortcuts.label_1" />
            </a>
          </li>
          <li>
            <Link to={getRelativePath(shortcuts[1].value)}>
              <Translate path="directus.page_privacycenter.shortcuts.label_2" />
            </Link>
          </li>
          <li>
            <Link to={getRelativePath(shortcuts[2].value)}>
              <Translate path="directus.page_privacycenter.shortcuts.label_3" />
            </Link>
          </li>
          <li>
            <Link to={getRelativePath(shortcuts[3].value)}>
              <Translate path="directus.page_privacycenter.shortcuts.label_4" />
            </Link>
          </li>
          <li>
            <Link to={getRelativePath(shortcuts[4].value)}>
              <Translate path="directus.page_privacycenter.shortcuts.label_5" />
            </Link>
          </li>
          <li>
            <Link to={getRelativePath(shortcuts[5].value)}>
              <Translate path="directus.page_privacycenter.shortcuts.label_6" />
            </Link>
          </li>
        </Shortcuts>
      </ScrollableSection>
    </>
  );
};

export default JumbotronSection;
