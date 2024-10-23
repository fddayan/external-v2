import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { theme, Space, Heading, BodyText } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro50, dt_taro90 },
} = theme;

const FeatureSection = styled.section`
  width: 100%;
  margin: auto;
  ${mediaQueries[0]} {
    background: url("https://static.classdojo.com/img/staff-messaging/a-plus-highlight.svg") no-repeat 10% 25% / 45px,
      url("https://static.classdojo.com/img/staff-messaging/back-forth-highlight.svg") no-repeat 98% 72% / 95px,
      url("https://static.classdojo.com/img/staff-messaging/caret-highlight.svg") no-repeat 27% 77% / 38px;
  }
  ${mediaQueries[1]} {
    background: url("https://static.classdojo.com/img/staff-messaging/a-plus-highlight.svg") no-repeat 10% 22%,
      url("https://static.classdojo.com/img/staff-messaging/back-forth-highlight.svg") no-repeat 98% 68%,
      url("https://static.classdojo.com/img/staff-messaging/caret-highlight.svg") no-repeat 27% 77%;
  }

  ${mediaQueries[0]} {
    width: 750px;
    padding: 108px 15px 0px;
  }

  ${mediaQueries[1]} {
    width: 970px;
  }

  ${mediaQueries[2]} {
    width: 1170px;
  }
`;

const FeatureTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;

  ${mediaQueries[0]} {
    padding: 0;
    max-width: 680px;
    margin: 0 auto;
  }
`;

const FeatureTitle = styled.h2<{ bgImage: string }>`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -1px;
  text-align: center;
  color: ${dt_taro90};
  margin: 0;
  max-width: 260px;

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 50px;
    line-height: 100%;
    text-align: center;
    letter-spacing: -0.5px;
    max-width: unset;
  }

  span {
    white-space: nowrap;
    position: relative;
    display: inline-block;

    &:after {
      content: " ";
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url("${(props) => props.bgImage}");
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 110%;
      height: 110%;
    }
  }
`;

const FeatureHeading = styled.p`
  font-weight: 800;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  color: ${dt_taro50};
  margin: 0;

  ${mediaQueries[0]} {
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.25px;
    max-width: 540px;
  }
`;

const FeaturesWrapper = styled.div`
  ${mediaQueries[0]} {
    padding-top: 108px;
  }
`;

const FeaturePairBlock = styled.div<{ alternate: number; textOnTop: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
  grid-template-areas: ${(props) => (props.textOnTop ? '"text" "img"' : '"img" "text"')};

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    grid-template-areas: "img text";
    padding-bottom: 128px;

    &:nth-child(odd) {
      grid-template-areas: "text img";
    }
  }
`;

const FeatureTextBlock = styled.div`
  width: 100%;
  padding: 0 15px;
  text-align: center;
  margin-bottom: 54px;
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

const FeatureImgBlock = styled.div`
  width: 108%;
  margin-left: -8%;
  transform: translateX(4%);
  grid-area: img;

  ${mediaQueries[0]} {
    width: 100%;
    margin-left: unset;
    transform: unset;
  }
`;

const FeatureTextContent = styled.div`
  ${mediaQueries[0]} {
    max-width: 360px;
  }
`;
const FeatureIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const FeatureImage = styled.img``;

type AlternatedFeaturesSectionProps = {
  content: { title: string; text: string; image_url: string; icon_url?: string }[];
  title: string;
  text: string;
  page: string;
  featureRepeater: string;
  featureTitle: string;
  featureText: string;
  textOnTop?: boolean;
  oval_highlight?: any;
};

const AlternatedFeaturesSection: React.FC<AlternatedFeaturesSectionProps> = ({
  content,
  title,
  text,
  page,
  featureRepeater,
  featureTitle,
  featureText,
  textOnTop,
  oval_highlight,
}) => {
  const t = useContext(TranslationContext);

  return (
    <FeatureSection>
      <FeatureTitleWrapper>
        <FeatureTitle bgImage={oval_highlight.file.publicURL}>{t.translate(title)}</FeatureTitle>
        <Space size="m" />
        {text && (
          <>
            <FeatureHeading>{t.translate(text)}</FeatureHeading>
            <Space size="l" />
          </>
        )}
      </FeatureTitleWrapper>

      <FeaturesWrapper>
        {content.map((feature, index) => (
          <FeaturePairBlock textOnTop={textOnTop} key={index} alternate={index + 1}>
            <FeatureImgBlock>
              <FeatureImage src={feature.image_url} alt="test" />
            </FeatureImgBlock>
            <FeatureTextBlock>
              <FeatureTextContent>
                {feature.icon_url && <FeatureIcon src={feature.icon_url} alt="test" />}
                <Heading>{t.translate(`directus.${page}.${featureRepeater}.${featureTitle}${index + 1}`)}</Heading>
                <Space size="s" />
                <BodyText>{t.translate(`directus.${page}.${featureRepeater}.${featureText}${index + 1}`)}</BodyText>
              </FeatureTextContent>
            </FeatureTextBlock>
          </FeaturePairBlock>
        ))}
      </FeaturesWrapper>
    </FeatureSection>
  );
};

export default AlternatedFeaturesSection;
