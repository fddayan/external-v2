import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import * as S from "./styles";
import Translate from "@src/components/translation/Translate";

const HeaderSection: React.FC = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const targetId = target.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = 88;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const data = useStaticQuery(graphql`
    {
      left: file(name: { eq: "teacher_resources-left@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 387, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      right: file(name: { eq: "teacher_resources-right@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 387, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);
  return (
    <>
      <S.Header>
        <Container>
          <S.HeroTitle as="h1" size="3" color="white">
            <Translate path="directus.page_resources_2023.hero_tagline" />
          </S.HeroTitle>
          <S.Navmenu>
            <ul>
              <li>
                <a href="#get-started" onClick={handleAnchorClick}>
                  <Translate path="directus.page_resources_2023.nav_links.Item_name_1" />
                </a>
              </li>
              <li>
                <a href="#customize" onClick={handleAnchorClick}>
                  <Translate path="directus.page_resources_2023.nav_links.Item_name_2" />
                </a>
              </li>
              <li>
                <a href="#share" onClick={handleAnchorClick}>
                  <Translate path="directus.page_resources_2023.nav_links.Item_name_3" />
                </a>
              </li>
              <li>
                <a href="#surprise" onClick={handleAnchorClick}>
                  <Translate path="directus.page_resources_2023.nav_links.Item_name_4" />
                </a>
              </li>
            </ul>
          </S.Navmenu>
        </Container>
      </S.Header>
    </>
  );
};

export default HeaderSection;
