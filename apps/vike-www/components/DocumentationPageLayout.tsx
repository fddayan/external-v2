import React, { useRef, useState } from "react";
import { getRelativePath } from "@src/utils/routes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import { Box, Flex } from "@src/components/Boxes";
import infoSvg from "@src/assets/images/info-circle-solid.svg";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SEO from "@src/components/SEO";
import Spacer from "@src/components/Spacer";
import Link from "@src/components/UTMLink";
import Button from "@src/components/Button";
import isMobile from "@src/utils/isMobile";
import useOnClickOutside from "@src/utils/useClickOutside";
import FocusTrap from "focus-trap-react";

const Legal = styled("div")``;
const PrintButtonContainer = styled("div")`
  @media print {
    display: none;
  }
`;

const JumbotronSection = styled("div")`
  background-color: #00aeef;
  box-sizing: border-box;
  height: 90px;
  padding: 30px 15px;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mediaQueries[1]} {
    height: 250px;
    margin-bottom: 30px;
    padding: 48px 0;
  }
  @media print {
    display: none;
  }
`;

const PageTitle = styled("h1")`
  box-sizing: border-box;
  color: #fff;
  font-size: 31px;
  font-weight: 400;
  line-height: 1.1;
  margin: 0;
  text-shadow: rgba(4, 76, 102, 0.5) 2px 2px 2px;
  text-align: center;

  ${mediaQueries[0]} {
    font-size: 52.8px;
    font-weight: 800;
  }
`;

const PageBody = styled("div")`
  padding-top: 0;
  padding-bottom: 16px;
  *:target {
    padding-top: 220px;
    margin-top: -220px !important;
  }
  h1 + p {
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0 0 22px;
  }
  a {
    background-color: transparent;
    box-sizing: border-box;
    color: #00bcf2;
    font-weight: 600;
    text-decoration: none currentcolor solid;
  }
  a > img {
    max-height: 60px;
    margin-right: 10px;
  }
  hr {
    border: 0 none currentcolor;
    border-image: none 100% 1 0 stretch;
    border-top: 1px solid #eee;
    box-sizing: content-box;
    height: 0;
    margin: 30px 0 20px;
    @media (max-width: 767px) {
      margin: 10px 0;
    }
  }
  h1 {
    box-sizing: border-box;
    font-size: 48px;
    font-weight: 800;
    line-height: 52px;
    margin: 22px 0 11px;
    color: #363636;
  }
  h2 {
    box-sizing: border-box;
    font-size: 24px;
    font-weight: 800;
    line-height: 40px;
    margin-bottom: 11px;
    margin-top: 22px;
    color: #363636;
  }
  h3 {
    box-sizing: border-box;
    font-size: 21px;
    font-weight: 800;
    line-height: 24px;
    margin-bottom: 11px;
    margin-top: 22px;
    color: #363636;
  }
  h4 {
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 11px;
    margin-top: 11px;
  }
  blockquote {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    quotes: none;
    color: inherit;
    :before {
      content: " ";
      height: 16px;
      width: 16px;
      background-image: url("${infoSvg}");
      background-size: 16px 16px;
      color: #00bcf2;
      display: inline-block;
    }

    p:first-child {
      display: inline-block;
    }

    p:not(:first-child) {
      font-size: 20px;
    }
  }
  .legal-toggle {
    @media (max-width: 767px) {
      margin: 0;
      font-size: 18px;
      line-height: 30px;
    }
    a {
      background-color: transparent;
      border: 0 none currentcolor;
      border-image: none 100% 1 0 stretch;
      box-sizing: border-box;
      color: #333;
      cursor: text;
      font-weight: 600;
      text-decoration: none currentcolor solid;
      ${mediaQueries[0]} {
        cursor: text;
      }
      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }
    }
  }
  .legal-body {
    ${mediaQueries[0]} {
      display: block !important;
      visibility: visible !important;
      height: auto !important;
    }
  }
`;

const Nav = styled("nav")<{ isOpen: boolean }>`
  z-index: 5;
  position: sticky;
  top: 0;
  display: block;
  height: ${(props) => (props.isOpen ? "auto" : "52px")};
  overflow: hidden;
  visibility: visible;
  //position: relative;
  width: 100%;
  padding-right: 30px;
  border-bottom: 1px solid #eee;
  background-color: #fff;

  hr {
    margin-top: 0;
  }

  ${mediaQueries[1]} {
    padding-right: 0;
    height: max-content;
    top: 175px;
    width: 25%;
  }
  @media print {
    display: none;
  }
`;

const NavCollapse = styled("div")`
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 175px);
    overflow-y: auto;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }
  ul > li > a {
    color: #333;
    margin: 15px 0;
    padding: 0 10px 0 5px;
    line-height: 1.42857143;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    display: block;
  }

  ul > li.active > a {
    color: #00aeef;
  }

  ul > li .sub-menu {
    max-height: unset;
  }
  ul > li .sub-menu li {
    margin-bottom: 10px;
    margin-left: 15px;
  }
  ul > li .sub-menu a {
    font-size: 14px;
    color: #000;
    font-weight: 400;
    margin: 0;
  }
  @media print {
    display: none;
  }
`;

const MenuButton = styled("button")`
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 10px;
  height: 52px;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  ${mediaQueries[1]} {
    display: none;
  }
  @media print {
    display: none;
  }
`;

type DocumentationPageLayoutProps = {
  content: {
    menu: string;
    content?: string;
    componentContent?: any;
  };
  title: string;
  seoTitle: string;
  seoDescription: string;
  type: string;
};
const DocumentationPageLayout: React.FC<DocumentationPageLayoutProps> = ({
  content,
  title,
  seoTitle,
  seoDescription,
  type,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobileView = isMobile().any;

  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Escape" && isMobileView) setIsOpen(false);
  };

  return (
    <Legal>
      <SEO title={seoTitle} description={seoDescription} />
      <JumbotronSection>
        <PageTitle>{title}</PageTitle>
      </JumbotronSection>
      <Container>
        <PrintButtonContainer style={{ textAlign: "right" }}>
          <Button onClick={() => window.print()} style={{ position: "static" }}>
            Print policy
          </Button>
        </PrintButtonContainer>
        <Flex flexWrap="wrap">
          <Nav isOpen={isOpen} onKeyDown={handleKeyDown}>
            <MenuButton aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} type="button">
              {!isOpen && <FaAngleDown size="24px" />}
              {isOpen && <FaAngleUp size="24px" />}
            </MenuButton>
            {isMobileView && !isOpen ? null : (
              <FocusTrap active={isMobileView && isOpen}>
                <NavCollapse>
                  <ul className="nav" ref={ref}>
                    <li className={type === "privacy" ? "active" : ""}>
                      <Link to={getRelativePath("/privacy")}>Privacy Policy</Link>
                      {type === "privacy" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "website" ? "active" : ""}>
                      <Link to={getRelativePath("/website-privacy")}>Website Privacy Policy</Link>
                      {type === "website" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "terms" ? "active" : ""}>
                      <Link to={getRelativePath("/terms")}>Terms of Service</Link>
                      {type === "terms" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "data" ? "active" : ""}>
                      <Link to={getRelativePath("/transparency/")}>Information Transparency</Link>
                      {type === "data" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "cookies" ? "active" : ""}>
                      <Link to={getRelativePath("/cookies-policy")}>Cookies Policy</Link>
                      {type === "cookies" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "premium" ? "active" : ""}>
                      <Link to={getRelativePath("/premium-features-terms")}>Premium Features Terms</Link>
                      {type === "premium" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "third" ? "active" : ""}>
                      <Link to={getRelativePath("/third-party-service-providers")}>Third Party Service Providers</Link>
                      {type === "third" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                    <li className={type === "childPrivacy" ? "active" : ""}>
                      <Link to={getRelativePath("/child-privacy")}>Child Privacy Terms</Link>
                      {type === "childPrivacy" && (
                        <ul className="sub-menu" dangerouslySetInnerHTML={{ __html: content.menu }} />
                      )}
                    </li>
                  </ul>
                </NavCollapse>
              </FocusTrap>
            )}
          </Nav>
          <Box width={["100%", "100%", 9 / 12]} paddingLeft={[0, 0, "15px"]}>
            <PageBody>
              <div>
                {/*<hr />*/}
                <Spacer marginBottom="20px" />
                {content.content && <div dangerouslySetInnerHTML={{ __html: content.content }} />}
                {content.componentContent && content.componentContent}
              </div>
            </PageBody>
          </Box>
        </Flex>
      </Container>
    </Legal>
  );
};

export default DocumentationPageLayout;
