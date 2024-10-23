import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import {
  Space,
  Heading,
  BodyText,
  MessagesIcon,
  StoryIcon,
  CalendarIcon,
  StudentIcon,
  PaintBrushIcon,
} from "@src/components/nessie-web";
import * as S from "./styles";

type AlternatedFeaturesSectionProps = {
  invert_desktop_order?: boolean;
  content: {
    title: string;
    text: string;
    image_url: string;
    icon_url?: "messages" | "story" | "calendar" | "student" | "paintBrush";
  }[];
  title?: string;
  text?: string;
  title_marked?: string;
  highlight_url?: string;
  textOnTop?: boolean;
  home_variation?: boolean;
};

const homeIcons = {
  messages: { icon: MessagesIcon, color: "dt_aqua50" },
  story: { icon: StoryIcon, color: "dt_tangerine50" },
  calendar: { icon: CalendarIcon, color: "dt_grape50" },
  student: { icon: StudentIcon, color: "dt_kiwi50" },
  paintBrush: { icon: PaintBrushIcon, color: "dt_watermelon50" },
};

function HomeIcon(slug: keyof typeof homeIcons) {
  const Icon = homeIcons[slug].icon;
  return (
    <S.RoundedIcon color={homeIcons[slug].color}>
      <Icon color="white" size="l" />
    </S.RoundedIcon>
  );
}

const AlternatedFeaturesSection: React.FC<AlternatedFeaturesSectionProps> = ({
  invert_desktop_order,
  content,
  title,
  text,
  title_marked,
  highlight_url,
  textOnTop,
  home_variation,
}) => {
  const t = useContext(TranslationContext);

  return (
    <S.FeatureSection homeVariation={home_variation}>
      {title && (
        <S.FeatureTitleWrapper>
          <S.Title>
            {t.translate(title)}
            {title_marked && (
              <S.HighlightText bgImage={highlight_url ?? ""}>{" " + t.translate(title_marked)}</S.HighlightText>
            )}
          </S.Title>
          <Space size="m" />
          {text && (
            <>
              <S.FeatureHeading>{t.translate(text)}</S.FeatureHeading>
              <Space size="l" />
            </>
          )}
        </S.FeatureTitleWrapper>
      )}
      <S.FeaturesWrapper homeVariation={home_variation}>
        {content.map((feature, index) => (
          <S.FeaturePairBlock
            textOnTop={textOnTop ?? false}
            invert_desktop_order={invert_desktop_order ?? false}
            key={index}
            className={home_variation ? "home-variation" : ""}
          >
            <S.FeatureImgBlock>
              <S.FeatureImage src={feature.image_url} alt="test" className={home_variation ? "home-variation" : ""} />
            </S.FeatureImgBlock>
            <S.FeatureTextBlock>
              <S.FeatureTextContent>
                {feature.icon_url &&
                  (home_variation ? HomeIcon(feature.icon_url) : <S.FeatureIcon src={feature.icon_url} alt="test" />)}
                <Heading>{t.translateIfAble?.(feature.title)}</Heading>
                <Space size="s" />
                <BodyText>{t.translateIfAble?.(feature.text)}</BodyText>
              </S.FeatureTextContent>
            </S.FeatureTextBlock>
          </S.FeaturePairBlock>
        ))}
      </S.FeaturesWrapper>
    </S.FeatureSection>
  );
};

export default AlternatedFeaturesSection;
