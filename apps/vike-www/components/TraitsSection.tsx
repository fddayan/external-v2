import React, { useContext, useEffect } from "react";
import Container from "@src/components/Container";
import { useInView } from "react-intersection-observer";
import { Space, Heading, Subheading, theme, BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_taro10, dt_taro20, dt_taro90, dt_aqua20 },
} = theme;

const TraitsSectionContainer = styled.section<{ colored_bg: boolean; dojo_islands_style: boolean }>`
  background-color: ${(props) => (props.dojo_islands_style ? dt_aqua20 : props.colored_bg ? dt_taro10 : "transparent")};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TraitsWrapper = styled.div<{ border_on_top: boolean; dojo_islands_style: boolean; inView: boolean }>`
  padding: 54px 0px;
  border-top: ${(props) => (props.border_on_top ? `2px solid ${dt_taro20}` : "none")};

  ${mediaQueries[1]} {
    padding: ${(props) => (props.dojo_islands_style ? "24px 0px" : props.border_on_top ? "54px 0px 108px" : "108px 0")};
  }
`;

const TraitsTitle = styled.h2<{ title_size: boolean; dojo_islands_style: boolean }>`
  font-size: ${(props) => (props.title_size ? "30px" : "24px")};
  line-height: ${(props) => (props.title_size ? "36px" : "30px")};
  letter-spacing: ${(props) => (props.title_size ? "-0.35px" : "-0.25px")};
  font-weight: 800;
  text-align: center;
  color: ${dt_taro90};
  margin-bottom: 54px;
  ${(props) =>
    props.dojo_islands_style
      ? `
  margin-top: 0px
  `
      : "auto"};

  ${mediaQueries[0]} {
    font-size: ${(props) => (props.title_size ? "50px" : "30px")};
    line-height: ${(props) => (props.title_size ? "50px" : "36px")};
    letter-spacing: ${(props) => (props.title_size ? "-0.5px" : "-0.35px")};
    max-width: 100%;
  }
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease-in-out;

  &.animate-title-true {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease-in-out;
  }
`;

const TraitsContent = styled.div<{ dojo_islands_style: boolean }>`
  width: 100%;
  display: grid;
  ${(props) =>
    props.dojo_islands_style
      ? "grid-template-columns: 1fr 1fr;"
      : `
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;`};
  grid-gap: 30px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-bottom: none;
  }

  &.animate-true {
    > .trait-item {
      transition: all 0.6s ease-in-out;
      opacity: 1;
      transform: translateY(0);
      &:nth-of-type(1) {
        transition-delay: 0.3s
      }
      &:nth-of-type(2) {
        transition-delay: 0.6s
      }
      &:nth-of-type(3) {
        transition-delay: 0.9s
      }
      &:nth-of-type(4) {
        transition-delay: 1.2s
      }
  }
`;

const Trait = styled.div<{ dojo_islands_style: boolean }>`
  text-align: center;
  padding: ${(props) => (props.dojo_islands_style ? "0px 10px" : "0 40px")};

  ${mediaQueries[1]} {
    text-align: ${(props) => (props.dojo_islands_style ? "center" : "left")};
    padding: 0;
  }
  opacity: 0;
  transform: translateY(50px);
`;

const TraitIcon = styled.img<{ dojo_islands_style: boolean }>`
  width: ${(props) => (props.dojo_islands_style ? "130px" : "80px")};
  height: ${(props) => (props.dojo_islands_style ? "130px" : "80px")};
`;

const SecondaryHeading = styled.h3`
  color: ${dt_taro90};
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  margin-top: 18px;
`;

const SecondaryContent = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${dt_taro90};
  text-align: center;
  letter-spacing: -0.25px;
`;

type TraitsSectionProps = {
  traits_title: string;
  content: { title: string; text: string; icon_url: string }[];
  translationPath: string;
  colored_bg: boolean;
  border_on_top: boolean;
  title_size: boolean;
  dojo_islands_style?: boolean;
};

const TraitsSection: React.FC<TraitsSectionProps> = ({
  traits_title,
  content,
  translationPath,
  colored_bg,
  border_on_top,
  title_size,
  dojo_islands_style,
}) => {
  const t = useContext(TranslationContext);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <TraitsSectionContainer colored_bg={colored_bg} dojo_islands_style={dojo_islands_style}>
      <Container>
        <TraitsWrapper border_on_top={border_on_top} dojo_islands_style={dojo_islands_style} inView={inView}>
          <TraitsContent dojo_islands_style={dojo_islands_style} ref={ref} className={`animate-${inView}`}>
            {content.map((trait, index) => (
              <Trait key={index} dojo_islands_style={dojo_islands_style} className="trait-item">
                <TraitIcon src={trait.icon_url} alt="icon" dojo_islands_style={dojo_islands_style} />
                {dojo_islands_style ? (
                  <>
                    <SecondaryHeading>{t.translate(`${translationPath}title_${index + 1}`)}</SecondaryHeading>
                    <SecondaryContent>{t.translate(`${translationPath}text_${index + 1}`)}</SecondaryContent>
                  </>
                ) : (
                  <>
                    <Space size="m" />
                    <Heading size="s">{t.translate(`${translationPath}title_${index + 1}`)}</Heading>
                    <Space size={dojo_islands_style ? "s" : "m"} />
                    <BodyText>{t.translate(`${translationPath}text_${index + 1}`)}</BodyText>
                    <Space size="m" />
                  </>
                )}
              </Trait>
            ))}
          </TraitsContent>
        </TraitsWrapper>
      </Container>
    </TraitsSectionContainer>
  );
};

export default TraitsSection;
