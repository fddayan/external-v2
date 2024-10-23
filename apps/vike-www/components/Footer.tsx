import React, { useContext } from "react";
import Container from "@src/components/Container";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import { css } from "@emotion/react";
import { GatsbyImage } from "gatsby-plugin-image";
import Translate from "./translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { getRelativePath, currentLanguage, fixLocale } from "@src/utils/routes";
import EssentialAccessibilityIcon from "@src/assets/images/essential_accessibility_icon.svg";
import ClassDojoDarkBGLogo from "@src/assets/images/classdojo-dark.svg";
import { BodyText, theme, Space, DownCaretIcon, DetailAction } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";
import { Link } from "gatsby";
import isMobile from "@src/utils/isMobile";
import { localesList } from "@src/utils/localesList";

type StyledFooterProps = { isBlog?: boolean; isIdea?: boolean };
const StyledFooter = styled.footer<StyledFooterProps>`
  margin-bottom: 0;
  padding: 60px 0 30px;
  font-family: "Proxima Nova", proxima-nova, sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  background-color: ${theme.colors.taro90};
  text-align: left;
  a {
    :hover {
      text-decoration: underline;
    }
  }
  @media print {
    display: none;
  }
`;

type LinksContainerProps = { isIdea?: boolean };
const LinksContainer = styled(Box)<LinksContainerProps>`
  padding-left: ${theme.space.dt_s}px;
  padding-right: ${theme.space.dt_s}px;

  & > ul {
    margin-bottom: ${theme.space.dt_m}px;
    min-height: 100px;
    padding: 0;
    list-style: none;
    li {
      padding: 0;
      list-style: none;
      margin-bottom: ${theme.space.dt_s}px;
      a {
        color: ${theme.colors.dt_white};
      }
    }
  }
`;
LinksContainer.defaultProps = { width: [1 / 2, 1 / 2, 1 / 6] };

const oneTrustButtonStyle = css`
  #ot-sdk-btn.ot-sdk-show-settings& {
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    background-color: transparent;
    border: 0;
    padding: 0;
    text-align: left;

    &:hover {
      background-color: transparent;
      text-decoration: underline;
    }
  }
`;

const LinkHeader = styled.h3`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 11px;
  margin-bottom: 11px;
  span {
    color: ${theme.colors.taro40};
  }
`;

const Row = styled(Flex)`
  margin-left: -15px;
  margin-right: -15px;
  ${mediaQueries[1]} {
    & > div:nth-of-type(1) {
      order: 2;
    }
    & > div:nth-of-type(2) {
      order: 3;
    }
    & > div:nth-of-type(3) {
      order: 4;
    }
    & > div:nth-of-type(4) {
      order: 5;
    }
  }
`;
Row.defaultProps = { flexWrap: "wrap" };

const LogoAndLanguage = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
  ${mediaQueries[1]} {
    order: 1;
    padding-right: 0px;
  }
`;

LogoAndLanguage.defaultProps = { width: [1, 1, 1 / 6], marginRight: [0, 0, `${100 / 6}%`] };

const AppLogos = styled(Box)`
  margin-top: 12px;
  & > div {
    align-items: center;
  }
  ${mediaQueries[1]} {
    margin-top: 64px;
  }
`;

const LanguageButton = styled("button")`
  padding: 12px 12px 12px 18px;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #fff;
  background-color: ${theme.colors.taro50};
  text-align: left;
  border: 0;
  border-radius: 30px;
  width: 100%;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mediaQueries[1]} {
    padding: 6px 12px 6px 18px;
    border-radius: 18px;
  }
  &:hover {
    color: #fff;
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.1);
  }
  & > span:not(.currentLocale) {
    top: 2px;
    min-width: 24px;
  }
  & > span.currentLocale {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Logo = styled(GatsbyImage)`
  width: 114px;
  margin-right: 5px;
  margin-top: 10px;
`;

const SubFooter = styled.ul`
  padding: 0;
  padding-top: 24px;
  margin-top: 24px;
  ${mediaQueries[1]} {
    margin-top: 30px;
  }
  border-top: 1px solid #1a192d;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

const SubFooterItem = styled.li`
  text-align: center;
  margin-bottom: 12px;
  ${mediaQueries[0]} {
    text-align: left;
    margin-bottom: 0px;
    margin-right: 27px;
  }
  &:last-of-type {
    margin-right: 0;
  }
  color: ${theme.colors.taro30};
  a {
    color: inherit;
    & > span {
      color: inherit;
    }
  }
`;

type FooterProps = { isBlog?: boolean; isIdea?: boolean };

const Footer: React.FC<FooterProps> = ({ isBlog, isIdea }) => {
  const data = useStaticQuery(graphql`
    {
      appleLogo: file(name: { eq: "app-store-btn" }) {
        childImageSharp {
          gatsbyImageData(width: 400, quality: 100, layout: CONSTRAINED)
        }
      }
      googleLogo: file(name: { eq: "google-play-btn" }) {
        childImageSharp {
          gatsbyImageData(width: 400, quality: 100, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { appleLogo, googleLogo } = data;

  const modalContext = useContext(ModalContext);

  function openLangModal() {
    modalContext.showModal(ModalType.LanguageChooser);
  }

  function clientButNotApple() {
    if (!global.window || !global.window.location) return false;

    const isApple = isMobile().apple.device;
    if (isApple) return false;
    return !global.window.location.search.includes("ios=true");
  }

  const returnRightLink = (isInternal: boolean, pathlink: string) => {
    if (!isInternal) {
      return pathlink;
    } else if (isBlog || isIdea) {
      return `https://www.classdojo.com${pathlink}`;
    } else {
      return getRelativePath(pathlink);
    }
  };

  const footerData = [
    {
      id: "company",
      string: "footer.menu.1.title",
      items: [
        {
          link: "/about/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.aboutus",
          id: "about_us",
        },
        {
          link: "/press/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.press",
          id: "press",
        },
        {
          link: "/jobs/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.careers",
          id: "jobs",
        },
        {
          link: "https://engineering.classdojo.com",
          isInternal: false,
          doesTranslate: true,
          string: "layouts.main.engineering",
          id: "engineering",
        },
        {
          link: "/accessibility/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.accessibility",
          id: "accessibility",
        },
      ],
    },
    {
      id: "resources",
      string: "footer.menu.2.title",
      items: [
        {
          link: "https://ideas.classdojo.com",
          isInternal: false,
          doesTranslate: true,
          string: "layouts.main.bigideas",
          id: "big_ideas",
        },
        {
          link: "/points",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.points",
          id: "points",
        },
        {
          link: "/resources/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.support.resources",
          id: "resources",
        },
        {
          link: "/training/",
          isInternal: true,
          doesTranslate: true,
          string: "footer.menu.2.training",
          id: "training",
        },
        {
          link: "/remotelearning/",
          isInternal: true,
          doesTranslate: true,
          string: "footer.menu.2.remote_learning",
          id: "remoteLearning",
        },
        {
          link: "/plus/",
          isInternal: true,
          doesTranslate: false,
          string: "ClassDojo Plus",
          id: "plus",
        },
      ],
    },
    {
      id: "support",
      string: "footer.menu.3.title",
      items: [
        {
          link: "https://classdojo.zendesk.com",
          isInternal: false,
          doesTranslate: true,
          string: "layouts.main.helpdesk",
          id: "helpdesk",
        },
        {
          link: "/contact/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.contact",
          id: "contact",
        },
        {
          link: "",
          isInternal: true,
          doesTranslate: true,
          string: "footer.menu.3.cookie_settings",
          id: "ot-sdk-btn",
        },
        {
          link: "/transparency/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.notice_at_collection",
          id: "notice-at-collect",
        },
        {
          link: "/privacycenter/",
          isInternal: true,
          doesTranslate: true,
          string: "layouts.main.privacy_center",
          id: "privacy-center",
        },
      ],
    },
    {
      id: "community",
      string: "footer.menu.4.title",
      items: [
        {
          link: "https://www.facebook.com/groups/classdojoteachers",
          isInternal: false,
          doesTranslate: true,
          string: "footer.menu.4.2",
          id: "fb_community",
        },
        {
          link: "https://www.facebook.com/classdojo",
          isInternal: false,
          doesTranslate: false,
          string: "Facebook",
          id: "facebook",
        },
        {
          link: "https://www.twitter.com/classdojo",
          isInternal: false,
          doesTranslate: false,
          string: "Twitter",
          id: "twitter",
        },
        {
          link: "https://www.instagram.com/classdojo",
          isInternal: false,
          doesTranslate: false,
          string: "Instagram",
          id: "instagram",
        },
        {
          link: "/wall-of-love/",
          isInternal: true,
          doesTranslate: true,
          string: "footer.menu.4.1",
          id: "wallOfLove",
        },
      ],
    },
  ];
  const privacyLinks = [
    {
      string: "layouts.main.terms",
      link: "/terms/",
      id: "terms",
      isInternal: true,
    },
    {
      string: "layouts.main.privacy",
      link: "/privacy/",
      id: "terms",
      isInternal: true,
    },
    {
      string: "layouts.main.web_privacy",
      link: "/website-privacy/",
      id: "terms",
      isInternal: true,
    },
  ];
  return (
    <StyledFooter isBlog={isBlog}>
      <nav aria-label="Footer navigation">
        <Container>
          <Row justifyContent={isIdea ? "center" : "start"}>
            {footerData.map((column, index) => {
              return (
                <LinksContainer isIdea={isIdea} key={index}>
                  <BodyText color="dt_taro40">
                    <Translate path={column.string} />
                  </BodyText>
                  <Space size="s" />
                  <ul>
                    {column.items.map((listItem, index) => {
                      if (listItem.id === "ot-sdk-btn") {
                        return (
                          <li key={listItem.id}>
                            <button
                              id="ot-sdk-btn"
                              className={`ot-sdk-show-settings oneTrustButtonStyle`}
                              css={oneTrustButtonStyle}
                              onClick={() => {
                                logEvent({
                                  eventName: `web.external_page.footer.click.${listItem.id}`,
                                });
                              }}
                            >
                              <span>
                                <Translate path={listItem.string} />
                              </span>
                            </button>
                            <Space size="xs" />
                          </li>
                        );
                      } else if (!listItem.isInternal || isBlog || isIdea) {
                        return (
                          <li key={index}>
                            <a
                              href={returnRightLink(listItem.isInternal, listItem.link)}
                              rel={listItem.isInternal ? "" : "noopener noreferrer"}
                              onClick={() => {
                                logEvent({
                                  eventName: `web.external_page.footer.click.${listItem.id}`,
                                });
                              }}
                            >
                              <DetailAction color="dt_white">
                                {listItem.doesTranslate ? <Translate path={listItem.string} /> : `${listItem.string}`}
                              </DetailAction>
                            </a>
                            <Space size="xs" />
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            <Link
                              to={getRelativePath(listItem.link)}
                              onClick={() => {
                                logEvent({
                                  eventName: `web.external_page.footer.click.${listItem.id}`,
                                });
                              }}
                            >
                              <DetailAction color="dt_white">
                                {listItem.doesTranslate ? <Translate path={listItem.string} /> : `${listItem.string}`}
                              </DetailAction>
                            </Link>
                            <Space size="xs" />
                          </li>
                        );
                      }
                    })}
                  </ul>
                </LinksContainer>
              );
            })}
            <LogoAndLanguage>
              <Box display={["none", "block", "block"]}>
                <img src={ClassDojoDarkBGLogo} alt="ClassDojo Logo" />
              </Box>
              <Space size="m" />
              {!isBlog && (
                <LanguageButton onClick={openLangModal}>
                  <span className="currentLocale">{localesList[fixLocale(currentLanguage())]}</span>
                  <DownCaretIcon color="white" size="m" />
                </LanguageButton>
              )}
            </LogoAndLanguage>
          </Row>
          <AppLogos>
            <Flex flexDirection="row">
              <a
                href="https://itunes.apple.com/us/app/classdojo/id552602056?mt=8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Logo image={appleLogo.childImageSharp.gatsbyImageData} loading="eager" alt="AppStore badge" />
                {clientButNotApple() ? (
                  <a
                    href="https://play.google.com/store/apps/details?id=com.classdojo.android"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "12px" }}
                  >
                    <Logo image={googleLogo.childImageSharp.gatsbyImageData} loading="eager" alt="Play Store badge" />
                  </a>
                ) : null}
              </a>
              <div style={{ width: "100px", marginTop: "10px", marginLeft: "12px" }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.essentialaccessibility.com/class-dojo?utm_source=classdojohomepage&utm_medium=iconlarge&utm_term=eachannelpage&utm_content=header&utm_campaign=classdojo"
                >
                  <img
                    src={EssentialAccessibilityIcon}
                    alt="This icon serves as a link to download the eSSENTIAL Accessibility assistive technology app for individuals with physical disabilities. It is featured as part of our commitment to diversity and inclusion."
                  />
                </a>
              </div>
            </Flex>
          </AppLogos>
          <SubFooter>
            <SubFooterItem>
              <span>© ClassDojo, Inc</span>
              <Space size="xs" />
            </SubFooterItem>
            {privacyLinks.map((content, index) => {
              return (
                <SubFooterItem key={index}>
                  <a href={returnRightLink(content.isInternal, content.link)}>
                    <DetailAction>
                      <Translate path={content.string} />
                    </DetailAction>
                  </a>
                  <Space size="xs" />
                </SubFooterItem>
              );
            })}
          </SubFooter>
        </Container>
      </nav>
    </StyledFooter>
  );
};

export default Footer;
