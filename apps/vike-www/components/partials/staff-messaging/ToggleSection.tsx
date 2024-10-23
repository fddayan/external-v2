import React, { ReactNode, useState, useEffect, useContext } from "react";
import { theme, DetailText } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import window from "global/window";

const {
  colors: { dt_taro10, dt_taro20, dt_taro50 },
} = theme;

const ToggleSectionContainer = styled.section`
  width: 100%;
  overflow: hidden;
  background-color: ${dt_taro10};
`;

const ToggleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ToggleSwitch = styled.div<{ toggle: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 54px 15px;
  height: 66px;
  border-radius: 33px;
  padding: 12px;
  flex-direction: ${(props) => (props.toggle ? "row-reverse" : "row")};
  cursor: pointer;

  ${mediaQueries[0]} {
    max-width: 540px;
    margin: 54px 0px;
  }
`;

const SwitchNamesWrapper = styled.div`
  width: calc(100% - 30px);
  display: flex;
  margin: 54px auto;
  height: 66px;
  position: absolute;
  pointer-events: none;
  padding: 12px;

  ${mediaQueries[0]} {
    max-width: 540px;
    margin: 54px 0px;
  }
`;

const SwitchNames = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleSwitchButton = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${dt_taro20};
  height: 42px;
  border-radius: 21px;
`;

type ToggleSectionProps = {
  ChildrenA: ReactNode;
  ChildrenB: ReactNode;
  defaultContentCondition?: boolean;
  defaultSwitchText: string;
  defaultSwitchTextMobile: string;
  alternateSwitchText: string;
  alternateSwitchTextMobile: string;
};

const ToggleSection: React.FC<ToggleSectionProps> = ({
  ChildrenA,
  ChildrenB,
  defaultContentCondition,
  defaultSwitchText,
  defaultSwitchTextMobile,
  alternateSwitchText,
  alternateSwitchTextMobile,
}) => {
  const t = useContext(TranslationContext);

  const [alternateContent, setAlternateContent] = useState(false);

  const alternateContentHandler = () => {
    setAlternateContent(!alternateContent);
  };

  useEffect(() => {
    if (defaultContentCondition === true) {
      setAlternateContent(true);
    } else {
      setAlternateContent(false);
    }
  }, [defaultContentCondition]);

  const [desktopText, setDesktopText] = useState(false);
  let screenWidth = window.innerWidth;

  const toggleToggleText = () => {
    if (screenWidth > 768) {
      setDesktopText(true);
    } else {
      setDesktopText(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      screenWidth = window.innerWidth;
      toggleToggleText();
    });

    toggleToggleText();
  }, []);

  return (
    <ToggleSectionContainer>
      <ToggleContainer>
        <ToggleSwitch toggle={alternateContent} onClick={alternateContentHandler}>
          <ToggleSwitchButton />
        </ToggleSwitch>
        <SwitchNamesWrapper>
          <SwitchNames>
            <DetailText color={dt_taro50}>
              {desktopText ? t.translate(defaultSwitchText) : t.translate(defaultSwitchTextMobile)}
            </DetailText>
          </SwitchNames>

          <SwitchNames>
            <DetailText color={dt_taro50}>
              {desktopText ? t.translate(alternateSwitchText) : t.translate(alternateSwitchTextMobile)}
            </DetailText>
          </SwitchNames>
        </SwitchNamesWrapper>
      </ToggleContainer>
      {alternateContent ? ChildrenB : ChildrenA}
    </ToggleSectionContainer>
  );
};

export default ToggleSection;
