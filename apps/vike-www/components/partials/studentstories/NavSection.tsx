import React, { useContext } from "react";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import { Flex } from "@src/components/Boxes";
import { mediaQueries } from "@src/styles/theme";
import scrollTo from "gatsby-plugin-smoothscroll";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import Translate from "@src/components/translation/Translate";

const Nav = styled("nav")`
  line-height: 50px;
  background-color: #fff;
  height: 50px;
  position: fixed;
  width: 100vw;
  text-align: center;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  z-index: 10;
  margin: 0;
  opacity: 0.9;
  font-weight: 800;
  top: 88px;
  display: none;
  ${mediaQueries[0]} {
    display: flex;
  }
`;

const NavLink = styled("a")`
  box-sizing: border-box;
  color: #c6c6c6;
  cursor: pointer;
  float: left;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
  width: 25%;
  :hover {
    color: #00aeef;
  }
`;

function NavSection() {
  const modalContext = useContext(ModalContext);

  function showSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <Nav>
      <NavLink onClick={() => scrollTo("#fits-classroom")}>
        <Translate path="directus.page_student_stories.nav_item_1" />
      </NavLink>
      <NavLink onClick={() => scrollTo("#parents-see")}>
        <Translate path="directus.page_student_stories.nav_item_2" />
      </NavLink>
      <NavLink onClick={() => scrollTo("#students-post")}>
        <Translate path="directus.page_student_stories.nav_item_3" />
      </NavLink>
      <Flex width="25%" alignItems="center" justifyContent="center">
        <Button onClick={showSignupModal}>Digital Portfolio for Students</Button>
      </Flex>
    </Nav>
  );
}

export default NavSection;
