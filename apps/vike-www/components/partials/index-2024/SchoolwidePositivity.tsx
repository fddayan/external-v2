import * as React from "react";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import {
  Headline1,
  SubHeadline,
  VStack,
  HStack,
  Center,
  ButtonStyled,
  Link,
  Headline2,
  Paragraph,
  Left,
  ButtonsPanel,
} from "./styles";
import styled from "@emotion/styled";
import { mediaQueriesMax, mediaQueries } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { getRelativePath } from "@src/utils/routes";
import CalendlyModal from "@src/components/CalendlyModal";

interface PositivityItemProps {
  image: {
    publicURL: string;
  };
  title: React.ReactNode;
  text: React.ReactNode;
}

const PositivityItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #2c2a50;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 23px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 27.6px */
  letter-spacing: -0.1px;
  ${mediaQueriesMax[1]} {
    margin-bottom: 10px;
  }
`;

const Headline1LeftAligned = styled(Headline1)`
  ${mediaQueries[1]} {
    text-align: left;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  ${mediaQueriesMax[1]} {
    flex-direction: column;
    p {
      text-align: center;
    }
  }
`;

const PositivityItemBody = styled.p`
  color: var(--Taro-60, #5d5d8f);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 19.5px */
  letter-spacing: 0.2px;
  margin-top: 12px;
`;

const ImageDesktop = styled.img`
  display: block;
  ${mediaQueriesMax[1]} {
    display: none;
  }
`;

const ImageMobile = styled.img`
  display: none;
  max-width: 250px;
  ${mediaQueriesMax[1]} {
    display: block;
    margin: auto;
  }
`;

const PositivityItem = ({ image, title, text }: PositivityItemProps) => (
  <div css={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
    <img src={image.publicURL} width={40} alt="" />
    <div>
      <PositivityItemTitle>{title}</PositivityItemTitle>
      <PositivityItemBody>{text}</PositivityItemBody>
    </div>
  </div>
);

const Caption = styled.p`
  color: var(--Light-Content-Primary, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
  letter-spacing: -0.1px;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
`;

const PositivityStack = styled(VStack)`
  // padding: 80px;
  gap: 15px;
  align-self: center;
  flex: 1;
  ${mediaQueriesMax[1]} {
    padding: 10px;
  }
`;

const SignUpContainer = styled(VStack)`
  align-self: center;
  gap: 0px;
  margin-bottom: 100px;
  ${mediaQueriesMax[1]} {
    margin-bottom: 50px;
  }
`;

const SchoolwidePositivity = () => {
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
      privacyLogins: file(relativePath: { eq: "index-2024/privacy-logins.png" }) {
        publicURL
      }
      loginMobile: file(relativePath: { eq: "index-2024/login-mobile.png" }) {
        publicURL
      }
      directus {
        page_homepage_2024 {
          schoolwide_illustration {
            filename_disk
          }
          districts_desktop_illustrations {
            directus_files_id {
              filename_disk
            }
          }
          districts_mobile_illustration {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    heart,
    happy,
    board,
    privacyLogins,
    loginMobile,
    directus: {
      page_homepage_2024: { schoolwide_illustration, districts_desktop_illustrations, districts_mobile_illustration },
    },
  } = data;

  const [showSchoolsCalendly, setShowSchoolsCalendly] = React.useState(false);
  const [showCalendlyDistricts, setShowCalendlyDistricts] = React.useState(false);

  const openDistrictCalendly = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.homepage-2024.schoolwide_positivity.districts.click",
    });
    setShowCalendlyDistricts(true);
  };

  const openSchoolsCalendly = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.homepage-2024.schoolwide_positivity.schools.click",
    });
    setShowSchoolsCalendly(true);
  };

  const closeDistrictCalendly = () => setShowCalendlyDistricts(false);
  const closeSchoolCalendly = () => setShowSchoolsCalendly(false);

  return (
    <>
      <Container>
        <div css={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Headline1 css={{ textAlign: "center", alignSelf: "center", marginTop: 100, maxWidth: 600 }}>
            <Translate path="directus.page_homepage_2024.schoolwide_positivity_headline" />
          </Headline1>
          <SubHeadline css={{ marginTop: 30, maxWidth: 800 }}>
            <Translate path="directus.page_homepage_2024.schoolwide_positivity_subheadline" />
          </SubHeadline>
        </div>
        <VStack>
          <HStack responsive css={{ justifyContent: "space-around", alignItems: "center" }}>
            <img
              loading="lazy"
              src={`https://static.classdojo.com/uploads/${schoolwide_illustration.filename_disk}`}
              alt=""
              css={{ maxWidth: 550, width: "100%", flex: 1, flexShrink: 0 }}
            />
            <PositivityStack css={{ flex: 1, flexShrink: 0, flexGrow: 1, maxWidth: 400 }}>
              <PositivityItem
                image={heart}
                title={<Translate path="directus.page_homepage_2024.positivity_features.title_1" />}
                text={<Translate path="directus.page_homepage_2024.positivity_features.text_1" />}
              />
              <PositivityItem
                image={happy}
                title={<Translate path="directus.page_homepage_2024.positivity_features.title_2" />}
                text={<Translate path="directus.page_homepage_2024.positivity_features.text_2" />}
              />
              <PositivityItem
                image={board}
                title={<Translate path="directus.page_homepage_2024.positivity_features.title_3" />}
                text={<Translate path="directus.page_homepage_2024.positivity_features.text_3" />}
              />
            </PositivityStack>
          </HStack>
          <SignUpContainer>
            <Center css={{ gap: 20 }}>
              <Caption>
                <Translate path="directus.page_homepage_2024.schoolwide_text_before_cta" />
              </Caption>
              <ButtonStyled onClick={openSchoolsCalendly}>
                <Translate path="directus.page_homepage_2024.schoolwide_cta_text" />
              </ButtonStyled>
              <Link href={getRelativePath("/schools")}>
                <Translate path="directus.page_homepage_2024.schoolwide_learn_more" />
              </Link>
            </Center>
          </SignUpContainer>
        </VStack>
        <FlexRow>
          <VStack css={{ flex: 1 }}>
            <Headline1LeftAligned>
              <Translate path="directus.page_homepage_2024.districts_section_headline" />
            </Headline1LeftAligned>
            <ImageMobile src={loginMobile.publicURL} alt="" />
            <Paragraph>
              <Translate path="directus.page_homepage_2024.districts_section_subheadline" />
            </Paragraph>
            <ButtonsPanel>
              <Caption>
                <Translate path="directus.page_homepage_2024.districts_section_pre_cta" />
              </Caption>
              <Center css={{ gap: 20 }}>
                <ButtonStyled onClick={openDistrictCalendly}>
                  <Translate path="directus.page_homepage_2024.districts_section_primary_cta" />
                </ButtonStyled>
                <Link href={getRelativePath("/districts")}>
                  <Translate path="directus.page_homepage_2024.districts_section_secondary_cta" />
                </Link>
              </Center>
            </ButtonsPanel>
          </VStack>
          <div
            css={{ position: "relative", flex: 1, alignSelf: "center", justifyContent: "center", textAlign: "center" }}
          >
            <ImageDesktop src={privacyLogins.publicURL} alt="" />
          </div>
        </FlexRow>
      </Container>
      {showCalendlyDistricts && (
        <CalendlyModal
          logEventContext="homepage-districts"
          calendlyLink="https://calendly.com/d/ck5s-dck-47n?utm_campaign=homepage-2024"
          closeModal={closeDistrictCalendly}
        />
      )}
      {showSchoolsCalendly && (
        <CalendlyModal
          logEventContext="homepage-schools"
          calendlyLink={`https://calendly.com/d/449-j2w-t3m?utm_campaign=homepage-2024`}
          closeModal={closeSchoolCalendly}
        />
      )}
    </>
  );
};

export default SchoolwidePositivity;
