import * as React from "react";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import { ButtonStyled, Center, HStack, Headline1, Headline2, Paragraph, VStack } from "./styles";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import { navigateTo } from "@src/utils/location";
import { getRelativePath } from "@src/utils/routes";
import { logEvent } from "@src/utils/logClient";

const Background = styled(VStack)`
  background: linear-gradient(184deg, #c9b7f2 17.3%, #8047ff 79.82%);
  align-items: center;
`;

const Privacy = () => {
  const data = useStaticQuery(graphql`
    {
      heart: file(relativePath: { eq: "plasticines/heart_01_new.png" }) {
        publicURL
      }
      happy: file(relativePath: { eq: "plasticines/happy.png" }) {
        publicURL
      }
      board: file(relativePath: { eq: "plasticines/board.png" }) {
        publicURL
      }
      privacyBackground: file(relativePath: { eq: "new-index/privacy-background.svg" }) {
        publicURL
      }
      shield: file(relativePath: { eq: "new-index/shield.png" }) {
        publicURL
      }
      star: file(relativePath: { eq: "new-index/star.png" }) {
        publicURL
      }
      magnifying: file(relativePath: { eq: "new-index/magnifying.png" }) {
        publicURL
      }
      ovalTop: file(relativePath: { eq: "index-2024/oval-top.svg" }) {
        publicURL
      }
      ovalEnding: file(relativePath: { eq: "index-2024/oval-ending.svg" }) {
        publicURL
      }
      directus {
        page_homepage_2024 {
          privacy_compliance_logos {
            directus_files_id {
              filename_disk
            }
          }
        }
      }
    }
  `);

  const {
    heart,
    happy,
    board,
    privacyBackground,
    shield,
    star,
    magnifying,
    ovalTop,
    ovalEnding,
    directus: {
      page_homepage_2024: { privacy_compliance_logos },
    },
  } = data;

  // url("${star.publicURL}") 243px 163px / 54% 84% no-repeat;

  const Panel = styled.div`
    position: relative;
    display: flex;
    max-width: 482px;
    padding: var(--XXL, 48px) 34px;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--XL, 30px);
    border-radius: var(--XL, 30px);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    flex: 1 0 0;
    text-align: left;
  `;

  const StarPanel = styled(Panel)`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 100%),
      url("${star.publicURL}") top -50px right -60px / 50% no-repeat;
  `;

  const AmpliPanel = styled(Panel)`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 100%),
      url("${magnifying.publicURL}") top -50px right -60px / 50% no-repeat;
  `;

  const handleLearnMore = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.homepage-2024.hero_a.privacycenter.click",
    });
    navigateTo(getRelativePath("/privacycenter"));
  };

  return (
    <Background>
      <img src={ovalTop.publicURL} alt="" width="100%" loading="lazy" />
      <Container padding={[20, 20, 50]}>
        <Center>
          <img src={shield.publicURL} alt="shield" css={{ height: 148 }} loading="lazy" />
        </Center>
        <VStack css={{ position: "relative", alignItems: "center", gap: 20 }}>
          <Headline1 css={{ color: "white" }}>
            <Translate path="directus.page_homepage_2024.privacy_headline" />
          </Headline1>
          <Paragraph css={{ color: "white", fontSize: 28, textAlign: "center" }}>
            <Translate path="directus.page_homepage_2024.privacy_subheadline" />
          </Paragraph>
          <HStack css={{ gap: 50 }} responsive>
            <StarPanel>
              <Headline2 css={{ color: "white", fontSize: 35, paddingRight: 60 }}>
                <Translate path="directus.page_homepage_2024.privacy_compliance" />
              </Headline2>
              <HStack css={{ flexWrap: "wrap" }}>
                {privacy_compliance_logos.map(({ directus_files_id: { filename_disk } }, index) => (
                  <img
                    loading="lazy"
                    key={index}
                    src={`https://static.classdojo.com/uploads/${filename_disk}`}
                    alt=""
                    css={{ maxWidth: 400 }}
                  />
                ))}
              </HStack>
            </StarPanel>
            <AmpliPanel>
              <Headline2 css={{ color: "white", fontSize: 35, textAlign: "left" }}>
                <Translate path="directus.page_homepage_2024.third_party_heading" />
              </Headline2>
              <Paragraph css={{ color: "white", fontSize: 20, textAlign: "left" }}>
                <Translate path="directus.page_homepage_2024.third_party_copy" />
              </Paragraph>
            </AmpliPanel>
          </HStack>
        </VStack>
      </Container>
      <ButtonStyled onClick={handleLearnMore}>
        <Translate path="directus.page_homepage_2024.privacy_cta" />
      </ButtonStyled>
      <img src={ovalEnding.publicURL} alt="" css={{ display: "block", marginTop: 50 }} width="100%" loading="lazy" />
    </Background>
  );
};

export default Privacy;
