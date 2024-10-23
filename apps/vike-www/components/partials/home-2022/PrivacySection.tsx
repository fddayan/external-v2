import React from "react";
import Translate from "@src/components/translation/Translate";
import { Space, Title, BodyText, Button } from "@src/components/nessie-web";
import PrivacyMojo from "@src/assets/images/index/privacy-mojo.svg";
import COPPA from "@src/assets/images/privacycenter/iKeepSafe-COPPA-seal.png";
import FERPA from "@src/assets/images/privacycenter/iKeepSafe-FERPA-seal.png";
import StudentPrivacyPledge from "@src/assets/images/privacycenter/student-privacy-pledge-signatory-badge.png";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";

const PrivacySectionWrap = styled.section`
  width: 100%;
  margin: auto;
  margin-top: 54px;
  padding-top: 0;

  ${mediaQueries[0]} {
    width: 750px;
    padding: 108px 15px 0px;
    margin-top: 0;
  }

  ${mediaQueries[1]} {
    width: 970px;
  }

  ${mediaQueries[2]} {
    width: 1170px;
  }
`;

const PrivacyPairBlock = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
  grid-template-areas: "text" "img";
  padding-bottom: 54px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    grid-template-areas: "img text";
    padding-bottom: 128px;
  }
`;

const PrivacyTextBlock = styled.div`
  width: 100%;
  padding: 0 15px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 30px;
  grid-area: text;

  ${mediaQueries[0]} {
    text-align: left;
    margin-bottom: 0;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PrivacyImgBlock = styled.div`
  grid-area: img;

  ${mediaQueries[0]} {
    width: 100%;
    margin-left: unset;
    transform: unset;
  }
`;

const PrivacyTextContent = styled.div`
  ${mediaQueries[0]} {
    max-width: 360px;
  }
`;

const PrivacyImage = styled.img`
  display: block;
  margin: auto;
`;

const PrivacyButton = styled(Button)`
  margin-left: -18px;
  width: 100%;

  ${mediaQueries[0]} {
    width: fit-content;
  }
`;

const PrivacyBadges = styled.div`
  display: flex;
  align-items: center;
`;

const PrivacyBadge = styled.img`
  margin-right: 12px;
  &:nth-of-type(1) {
    max-width: calc(20% - 12px);
  }
  &:nth-of-type(2) {
    max-width: calc(20% - 12px);
  }
  &:nth-of-type(3) {
    max-width: 25%;
  }
`;

const badges = [
  { src: COPPA, alt: "iKeepSafe COPPA seal" },
  { src: FERPA, alt: "iKeepSafe FERPA seal" },
  { src: StudentPrivacyPledge, alt: "student privacy pledge signatory badge" },
];

type PrivacySectionProps = {
  privacy_title: string;
  privacy_subtitle: string;
  privacy_link: string;
  privacy_link_label: string;
};

const PrivacySection: React.FC<PrivacySectionProps> = ({
  privacy_title,
  privacy_subtitle,
  privacy_link,
  privacy_link_label,
}) => {
  return (
    <PrivacySectionWrap>
      <PrivacyPairBlock>
        <PrivacyImgBlock>
          <PrivacyImage src={PrivacyMojo} alt="privacy-mojo" />
        </PrivacyImgBlock>
        <PrivacyTextBlock>
          <PrivacyTextContent>
            <Title size={1}>
              <Translate path={privacy_title} />
            </Title>
            <Space size="s" />
            <BodyText>
              <Translate path={privacy_subtitle} />
            </BodyText>
            <Space size="m" />
            <PrivacyButton
              href={privacy_link}
              onClick={() => {
                logEvent("web.external_page.privacy_center_click");
              }}
              size="m"
              kind="tertiary"
              target="_blank"
            >
              <Translate path={privacy_link_label} />
            </PrivacyButton>
            <Space size="m" />
            <PrivacyBadges>
              {badges.map((badge, index) => (
                <PrivacyBadge key={index} src={badge.src} alt={badge.alt} />
              ))}
            </PrivacyBadges>
          </PrivacyTextContent>
        </PrivacyTextBlock>
      </PrivacyPairBlock>
    </PrivacySectionWrap>
  );
};

export default PrivacySection;
