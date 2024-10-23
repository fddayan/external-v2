import React from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { scrollWithOffset } from "@src/components/AnchorScroll";
import { navigate } from "gatsby";

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

type TextNav = {
  links: Array<{
    text: string;
    isAnchor: boolean;
    link: string;
  }>;
};
const TextNav: React.FC<TextNav> = ({ links }) => {
  return (
    <Flex
      as="section"
      flexDirection={["column", "row"]}
      justifyContent="center"
      alignItems="center"
      paddingTop={["10px", "20px"]}
      paddingBottom={["10px", "20px"]}
    >
      {links.map((link, index) => (
        <NavLink
          key={`NavLink-${index}`}
          onClick={() => (link.isAnchor ? scrollWithOffset(`${link.link}`) : navigate(link.link))}
        >
          {link.text}
        </NavLink>
      ))}
    </Flex>
  );
};

export default TextNav;
