import React from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import { graphql, useStaticQuery } from "gatsby";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import { css } from "@emotion/react";

const Header = styled("h4")`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0;
  text-align: center;
`;

const Hr = styled("hr")`
  margin: 30px 0;
  border-top: 1px solid #eee;
`;

const linkCss = css`
  display: inline-block;
  line-height: 18px;
  font-weight: 600;
  text-decoration: none;
  margin: 0 0 0;
  color: #00bcf2;
  text-align: center;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #00a8d9;
    text-decoration: none;
  }
`;

const ContactBox = styled(Flex)``;
ContactBox.defaultProps = {
  flexDirection: "column",
  width: ["100%", 1 / 3],
  paddingLeft: "15px",
  paddingRight: "15px",
  alignItems: "center",
};

const ContactDetailsSection = () => {
  const data = useStaticQuery<{ contact: { page_contact: { support_items: unknown[] } } }>(graphql`
    query {
      contact: directus {
        page_contact {
          support_items
        }
      }
    }
  `);

  const { contact } = data;

  return (
    <Container as="section">
      <Flex
        justifyContent="center"
        alignItems="start"
        flexWrap="wrap"
        paddingBottom="66px"
        paddingTop="66px"
        width={["100%", 10 / 12]}
        mx="auto"
        css={css`
          a {
            ${linkCss};
          }
          p {
            margin-bottom: 11px;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}
      >
        <ContactBox>
          <Header>
            <Translate path="directus.page_contact.support_title" />
          </Header>
          <Hr />
          <ul>
            <li>
              <a href="https://classdojo.zendesk.com/hc/en-us/categories/200185275">Teacher Helpdesk</a>
            </li>
            <li>
              <a href="https://classdojo.zendesk.com/hc/en-us/categories/200185365">Parent Helpdesk</a>
            </li>
          </ul>
        </ContactBox>
        <ContactBox>
          <Header>
            <Translate path="directus.page_contact.address_title" />
          </Header>
          <Hr />
          <Text textAlign="center">
            <MarkedTranslate path={`directus.page_contact.address_text`} />
            <a href="mailto:hello@classdojo.com">hello@classdojo.com</a>
          </Text>
        </ContactBox>
        <ContactBox>
          <Header>
            <Translate path="directus.page_contact.security_title" />
          </Header>
          <Hr />
          <Text textAlign="center">
            <MarkedTranslate path={`directus.page_contact.security_text`} />
          </Text>
        </ContactBox>
      </Flex>
    </Container>
  );
};

export default ContactDetailsSection;
