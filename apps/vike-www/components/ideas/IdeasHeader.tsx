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
import { AppDataContext, AppDataContextType } from "@src/components/AppDataContext";
import { mediaQueries } from "@src/styles/theme";
import IdeasNavbarUser from "@src/components/ideas/IdeasNavbarUser";
import { getRelativePath } from "@src/utils/routes";

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

const StyledLink = styled("div")`
  text-decoration: none;
  padding: 10px 15px;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const StyledHTMLLink = StyledLink.withComponent("a");

const Logo = styled(GatsbyImage)`
  width: 50px;
`;

const SiteName = styled.span`
  color: #222;
  font-size: 20px;
  letter-spacing: -0.02em;
  font-weight: 600;
  position: relative;
  margin-left: 14px;

  ${mediaQueries[1]} {
    font-size: 26px;
  }
`;

type NavLinkProps = FlexProps & {
  openLoginModal: () => void;
  openSignupModal: () => void;
  appData: AppDataContextType;
  onClick: () => void;
};
const NavLinks: React.FC<NavLinkProps> = ({ openLoginModal, openSignupModal, appData, ...props }) => {
  let loginPart = null;
  if (appData.data.loadingSession) {
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
    if (appData.data.type) {
      if (appData.data.type === "teacher")
        loginPart = <IdeasNavbarUser user={appData.data.userData} logout={appData.services.logout} />;
      else loginPart = null;
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
      {loginPart}
    </Flex>
  );
};

const AnimatedNavLinks = posed.div({
  enter: { height: "auto" },
  exit: { height: 0 },
  transition: { default: { ease: "tween", duration: 1000 } },
});

const IdeasHeader: React.FC = () => {
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

  const appData = useContext(AppDataContext);
  const modalContext = useContext(ModalContext);

  function openLoginModal() {
    modalContext.showModal(ModalType.TeacherLogin, { form: { noRedirect: true } });
  }

  function openSignupModal() {
    modalContext.showModal(ModalType.TeacherSignup);
  }

  return (
    <Nav role="navigation">
      <Box height="88px" css={bottomBorder}>
        <Container height="100%">
          <Flex flexDirection="row" alignItems="center" height="100%">
            <Flex alignItems="center" width="100%">
              <Link to={getRelativePath("/")}>
                <Flex alignItems="center">
                  <Logo image={logo.childImageSharp.gatsbyImageData} loading="eager" />
                  <SiteName>ClassDojo</SiteName>
                </Flex>
              </Link>
              <BurgerButton onClick={toggleHeader} active={headerOpen} />
            </Flex>
            <NavLinks
              display={["none", "none", "flex"]}
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
              appData={appData}
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
              appData={appData}
              onClick={() => setHeaderOpen(false)}
            />
          </AnimatedNavLinks>
        )}
      </Transition>
    </Nav>
  );
};

export default IdeasHeader;
