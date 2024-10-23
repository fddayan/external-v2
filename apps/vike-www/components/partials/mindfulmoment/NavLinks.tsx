import React from "react";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { Flex } from "@src/components/Boxes";
import Translate from "@src/components/translation/Translate";
import { AnchorScroll } from "@src/components/AnchorScroll";

const Hero = styled(Flex)`
  color: #423e5d;
  position: relative;
  ${mediaQueries[0]} {
    padding: 60px 0;
  }
`;

const NavUl = styled("ul")`
  background-color: #fff8;
  font-size: 21px;
  display: none;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  ${mediaQueries[0]} {
    display: flex;
  }
`;
const NavLi = styled("li")`
  padding: 20px 0;
  font-size: 18px;
  list-style: none;
  font-weight: 600;
`;
const NavLink = styled.a`
  display: inline-block;
  line-height: 30px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  color: #00bcf2;
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #00a8d9;
  }
  margin-left: 30px;
  margin-right: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;
const NavScrollLink = styled(AnchorScroll)<{ id: string }>``;

const menuItems = [
  {
    id: "series-link",
    link: "#episodes",
    text: "pages.mindfulmoment.nav_links.first",
  },
  {
    id: "benefits-link",
    link: "#benefits",
    text: "pages.mindfulmoment.nav_links.second",
  },
  {
    id: "resources-link",
    link: "#resources",
    text: "pages.mindfulmoment.nav_links.third",
  },
  {
    id: "timeline-link",
    link: "#timeline",
    text: "pages.mindfulmoment.nav_links.fifth",
  },
];

const NavLinks = () => {
  return (
    <Hero>
      <NavUl>
        {menuItems.map((item, index) => (
          <NavLi key={index}>
            {item.link.indexOf("#") > -1 ? (
              <NavScrollLink id={item.id} href={item.link}>
                <Translate path={item.text} />
              </NavScrollLink>
            ) : (
              <NavLink id={item.id} href={item.link}>
                <Translate path={item.text} />
              </NavLink>
            )}
          </NavLi>
        ))}
      </NavUl>
    </Hero>
  );
};

export default NavLinks;
