import React from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { css } from "@emotion/react";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";

type SubPagesNavProps = { active: string };
type LinkProps = { active: boolean; last?: boolean };

const variants = ({ active, last }: LinkProps) => {
  const all = [];
  if (active) {
    all.push(css`
      color: #fff;
      ${mediaQueries[1]} {
        &:after {
          content: "";
          width: 0;
          height: 0;
          top: 145%;
          display: block;
          position: absolute;
          bottom: -10px;
          left: 50%;
          margin-left: -10px;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          border-top: 10px solid #49a3d2;
        }
      }
    `);
  }
  if (last) {
    all.push(css`
      border-right: none;
      border-bottom: none;
    `);
  }

  return all;
};

const Link = styled.a`
  display: inline-block;
  position: relative;
  border-radius: 0;
  padding: 10px 30px;
  border-right: 1px solid #bedeef;
  font-size: 15px;
  font-weight: 600;
  color: #bedeef;
  line-height: 1.42;
  transition: color 0.2s;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
    background: 0 0;
    color: #e7f3f9;
  }

  border-right: none;
  border-bottom: 1px solid #bedeef;
  width: 100%;
  text-align: center;
  ${mediaQueries[1]} {
    margin-top: 10px;
    margin-bottom: 10px;
    width: auto;
    padding: 0px 30px;
    border-right: 1px solid #bedeef;
    border-bottom: none;
  }

  ${variants}
`;

const ListItem = styled.li`
  list-style: none;
`;

const SubPagesNav: React.FC<SubPagesNavProps> = ({ active }) => {
  return (
    <Flex as="section" boxShadow="0 2px 4px rgba(0,0,0,.5)" backgroundColor="#49a3d2" position="relative" zIndex={999}>
      <Container>
        <Flex
          flexDirection={["column", "column", "row"]}
          justifyContent="center"
          margin="0"
          alignItems="center"
          as="ul"
        >
          <ListItem>
            <Link href={getRelativePath("/about/")} active={active === "about"} aria-current={active === "about"}>
              <Translate path="components.submenu.about" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href={getRelativePath("/press/")} active={active === "press"} aria-current={active === "press"}>
              <Translate path="components.submenu.press" />
            </Link>
          </ListItem>
          <ListItem>
            <Link href={getRelativePath("/jobs/")} active={active === "jobs"} aria-current={active === "jobs"}>
              <Translate path="components.submenu.careers" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={getRelativePath("/privacycenter/")}
              active={active === "privacy"}
              aria-current={active === "privacy"}
            >
              <Translate path="components.submenu.privacy_center" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={getRelativePath("/contact/")}
              active={active === "contact"}
              aria-current={active === "contact"}
              last
            >
              <Translate path="components.submenu.contact" />
            </Link>
          </ListItem>
        </Flex>
      </Container>
    </Flex>
  );
};

export default SubPagesNav;
