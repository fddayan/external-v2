import React, { useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import posed, { Transition } from "react-pose";
import Container from "@src/components/Container";
import { Box, Flex, FlexProps } from "@src/components/Boxes";
import Button from "@src/components/Button";
import BurgerButton from "@src/components/BurgerButton";
import { FaSearch } from "react-icons/fa";
import BlogSearchForm from "@src/components/blog/BlogSearchForm";
import { DetailText, Title, Space } from "../nessie-web";
import Translate from "../translation/Translate";

const bottomBorder = css`
  border-bottom: 1px solid #eee;
`;

const Nav = styled.nav`
  position: fixed;
  background-color: white;
  right: 0;
  left: 0;
  z-index: 1030;
  flex: 0 0 auto;
`;

const SearchIcon = styled.button`
  color: #777;
  font-size: 18px;
  font-weight: 200;
  cursor: pointer;
  margin: 6px 20px 0;
  display: block;
  background-color: transparent;
  border: 0;
  &:hover {
    color: #00bcf2;
    text-decoration: none;
  }
`;

const Logo = styled(GatsbyImage)`
  width: 60px;
`;

type NavLinkProps = FlexProps & {
  onClick: () => void;
  toggleSearch: () => void;
  searchOpen?: boolean;
};
const NavLinks: React.FC<NavLinkProps> = ({ toggleSearch, searchOpen, ...props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <Link to="/about">
        <DetailText>
          <Translate path="layouts.main.about" />
        </DetailText>
      </Link>
      <Space kind="inline" size="m" />
      <Space size="s" />
      <Button as="a" href="https://www.classdojo.com/jobs/" target="_blank">
        We're hiring!
      </Button>
      <SearchIcon
        onClick={toggleSearch}
        aria-expanded={searchOpen}
        aria-label="Search for an engineering blog post"
        id="searchBlog"
      >
        <FaSearch />
      </SearchIcon>
    </Flex>
  );
};

const AnimatedNavLinks = posed.div({
  enter: { height: "auto" },
  exit: { height: 0 },
  transition: { default: { ease: "tween", duration: 1000 } },
});

const AnimatedSearch = posed.div({
  enter: { height: "auto" },
  exit: { height: 0 },
  transition: { default: { ease: "tween", duration: 1000 } },
});

const DevBlogHeader: React.FC = () => {
  const data = useStaticQuery<{ logo: { childImageSharp: GatsbyImageFluidProps } }>(graphql`
    {
      logo: file(name: { eq: "classdojo-logo-round-120x120" }) {
        childImageSharp {
          gatsbyImageData(width: 60, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { logo } = data;

  const [headerOpen, setHeaderOpen] = useState<boolean>(false);
  const toggleHeader = () => setHeaderOpen(!headerOpen);

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      document.getElementById("blog-search-input")?.focus();
    }
  };

  return (
    <Nav role="navigation">
      <Box height="88px" css={bottomBorder}>
        <Container height="100%">
          <Flex flexDirection="row" alignItems="center" height="100%">
            <Flex alignItems="center" width="100%">
              <Link to={"/"}>
                <Flex alignItems="center">
                  <Logo image={logo.childImageSharp.gatsbyImageData} loading="eager" />
                  <Space kind="inline" size="m" />
                  <Title>ClassDojo Engineering</Title>
                </Flex>
              </Link>
              <BurgerButton ml="auto" display={[null, "none"]} onClick={toggleHeader} backgroundVisible={headerOpen} />
            </Flex>
            <NavLinks
              display={["none", "flex"]}
              toggleSearch={toggleSearch}
              searchOpen={searchOpen}
              onClick={() => setHeaderOpen(false)}
            />
          </Flex>
        </Container>
      </Box>
      <Transition>
        {headerOpen && (
          <AnimatedNavLinks
            key="navlinks"
            css={css`
              overflow: hidden;
              position: absolute;
              width: 100%;
              background: white;
              z-index: 100;
            `}
          >
            <NavLinks
              flexDirection="column"
              display={["flex", "flex", "none"]}
              py={3}
              css={bottomBorder}
              width="100%"
              toggleSearch={toggleSearch}
              onClick={() => setHeaderOpen(false)}
            />
          </AnimatedNavLinks>
        )}
      </Transition>
      <Transition>
        {searchOpen && (
          <AnimatedSearch
            key="search"
            css={css`
              overflow: hidden;
              position: absolute;
              width: 100%;
              background: white;
              z-index: 100;
            `}
          >
            <Flex
              width={"100%"}
              minHeight="65px"
              backgroundColor={"#f5f5f5"}
              alignItems="center"
              justifyContent="center"
            >
              <BlogSearchForm closeSearch={() => setSearchOpen(false)} />
            </Flex>
          </AnimatedSearch>
        )}
      </Transition>
    </Nav>
  );
};

export default DevBlogHeader;
