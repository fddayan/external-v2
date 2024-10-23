import React, { useContext, useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import posed, { Transition } from "react-pose";
import Container from "@src/components/Container";
import { Box, Flex, FlexProps } from "@src/components/Boxes";
import Spacer from "@src/components/Spacer";
import Button from "@src/components/Button";
import BurgerButton from "@src/components/BurgerButton";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { AppDataContext } from "@src/components/AppDataContext";
import { mediaQueries } from "@src/styles/theme";
import { FaSearch } from "react-icons/fa";
import BlogSearchForm from "@src/components/blog/BlogSearchForm";
import { getSubdomainURL } from "@src/utils/getSubdomainURL";

const bottomBorder = css`
  border-bottom: 1px solid #eee;
`;

const Nav = styled.nav`
  position: fixed;
  position: fixed;
  background-color: white;
  right: 0;
  left: 0;
  z-index: 1030;
  flex: 0 0 auto;
`;

const LinkText = styled.span`
  color: #777;
  font-weight: 500;
  line-height: 22px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;

  &:hover {
    color: #00bcf2;
    text-decoration: none;
  }
`;

const SearchIcon = styled.button`
  color: #777;
  font-weight: 200;
  cursor: pointer;
  margin: 6px 5px 0;
  display: none;
  background-color: transparent;
  border: 0;
  &:hover {
    color: #00bcf2;
    text-decoration: none;
  }

  ${mediaQueries[1]} {
    display: block;
  }
`;

const LoggedInText = styled.span`
  color: #00bcf2;
  font-weight: 600;
  ${mediaQueries[1]} {
    font-size: 18px;
  }
  line-height: 22px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;

  &:hover {
    color: #00bcf2;
    color: #00a8d9;
    text-decoration: none;
  }
`;

const StyledLink = styled("div")`
  text-decoration: none;
  padding: 10px 15px;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const StyledList = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledGatsbyLink = StyledLink.withComponent(Link);
const StyledHTMLLink = StyledLink.withComponent("a");

const Logo = styled(GatsbyImage)`
  width: 60px;
`;

const SiteName = styled.span`
  color: #222;
  font-size: 22px;
  letter-spacing: -0.02em;
  font-weight: 700;
  position: relative;
  top: 2px;
  margin-left: 4px;

  ${mediaQueries[1]} {
    font-size: 31px;
  }
`;

type NavLinkProps = FlexProps & {
  openLoginModal: () => void;
  openSignupModal: () => void;
  appData: any;
  onClick: () => void;
  toggleSearch: () => void;
  searchOpen: boolean;
};
const NavLinks: React.FC<NavLinkProps> = ({ openLoginModal, openSignupModal, toggleSearch, appData, ...props }) => {
  let loginPart = null;
  if (appData.loadingSession) {
    loginPart = (
      <>
        <StyledHTMLLink href="https://teach.classdojo.com/">
          <LinkText>
            <Translate path="layouts.main.teacher_login" />
          </LinkText>
        </StyledHTMLLink>
        <StyledHTMLLink href="https://home.classdojo.com/">
          <LinkText>
            <Translate path="layouts.main.parent_login" />
          </LinkText>
        </StyledHTMLLink>
      </>
    );
  } else {
    if (appData.type) {
      loginPart = (
        <StyledHTMLLink href={getSubdomainURL(appData.type)}>
          <LoggedInText>
            {appData.name ? (
              <Translate path="components.welcome_banner.welcome_back" subs={{ name: appData.name }} />
            ) : (
              <Translate path="components.welcome_banner.welcome_back_anon" />
            )}
            <span>! </span>
            <Translate path="components.welcome_banner.come_in" />
          </LoggedInText>
        </StyledHTMLLink>
      );
    } else {
      loginPart = (
        <>
          <Spacer ml={15} />
          <Button outline gray onClick={openLoginModal} data-test-name="open-login-modal">
            <Translate path="pages.home.log_in" />
          </Button>
          <Spacer ml={15} />
          <Button onClick={openSignupModal} marginTop={["15px", "15px", 0]}>
            <Translate path="pages.home.sign_up" />
          </Button>
        </>
      );
    }
  }

  return (
    <Flex alignItems="center" {...props}>
      <StyledList>
        <li>
          <StyledGatsbyLink to={"/category/ideas-and-tips"}>
            <LinkText>Ideas and tips</LinkText>
          </StyledGatsbyLink>
        </li>
        <li>
          <StyledGatsbyLink to={"/category/updates-from-classdojo"}>
            <LinkText>Updates from ClassDojo</LinkText>
          </StyledGatsbyLink>
        </li>
        <li>
          <StyledGatsbyLink to={"/category/mentors"}>
            <LinkText>Mentors</LinkText>
          </StyledGatsbyLink>
        </li>
        <li>
          <StyledGatsbyLink to={"/category/stories"}>
            <LinkText>Stories</LinkText>
          </StyledGatsbyLink>
        </li>
      </StyledList>

      <SearchIcon onClick={toggleSearch} aria-label="Search for any blog post">
        <FaSearch />
      </SearchIcon>
      {loginPart}
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

const BlogHeader: React.FC = () => {
  const data = useStaticQuery(graphql`
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

  const appData = useContext(AppDataContext);
  const modalContext = useContext(ModalContext);

  function openLoginModal() {
    modalContext.showModal(ModalType.Login);
  }

  function openSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <Nav role="navigation">
      <Box height="88px" css={bottomBorder}>
        <Container height="100%">
          <Flex flexDirection="row" alignItems="center" height="100%">
            <Flex alignItems="center" width="100%">
              <Link to={"/"}>
                <Flex alignItems="center">
                  <Logo image={logo.childImageSharp.gatsbyImageData} loading="eager" />
                  <SiteName>The ClassDojo Blog</SiteName>
                </Flex>
              </Link>
              <BurgerButton
                ml="auto"
                display={[null, null, "none"]}
                onClick={toggleHeader}
                backgroundVisible={headerOpen}
              />
            </Flex>
            <NavLinks
              display={["none", "none", "flex"]}
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
              appData={appData.data}
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
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
              appData={appData.data}
              toggleSearch={toggleSearch}
              searchOpen={searchOpen}
              onClick={() => setHeaderOpen(false)}
            />
          </AnimatedNavLinks>
        )}
      </Transition>
      <Transition>
        <AnimatedSearch
          key="search"
          css={css`
            overflow: hidden;
            position: absolute;
            width: 100%;
            background: white;
            z-index: 100;
            transition: opacity 0.2s linear;
            opacity: ${searchOpen ? "1" : "0"};
          `}
        >
          <Flex width={"100%"} minHeight="65px" backgroundColor={"#f5f5f5"} alignItems="center" justifyContent="center">
            <BlogSearchForm closeSearch={() => setSearchOpen(false)} />
          </Flex>
        </AnimatedSearch>
      </Transition>
    </Nav>
  );
};

export default BlogHeader;
