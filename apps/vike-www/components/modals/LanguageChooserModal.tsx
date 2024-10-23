import React, { useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { Location } from "@reach/router";
import { Flex } from "../Boxes";
import { setLanguageCookie } from "@src/utils/cookies";
import Translate from "../translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import CommonModal, { CommonModalProps } from "./CommonModal";
import window from "global/window";
import { localesList } from "@src/utils/localesList";

const modalStyle = css`
  ${mediaQueries[1]} {
    max-width: 900px;
  }
`;

type LanguageButtonProps = {
  active: boolean;
  key: string;
};
const LanguageButton = styled.button<LanguageButtonProps>`
  ${({ active }) => {
    if (active) {
      return css`
        color: white;
        background-color: #00aeef;
        border: 1px solid #00aeef;
      `;
    }
    return css`
      cursor: pointer;
      border: 1px solid #f5f5f5;
      background-color: transparent;
      color: #adadad;

      &:hover {
        background-color: #f5f5f5;
        color: black;
      }
    `;
  }}
  padding: 0;
  text-align: center;
  display: block;
  padding: 10px;
  text-decoration: none;
  font-weight: 600;
  width: 50%;
  ${mediaQueries[1]} {
    width: 25%;
  }
`;

const LanguageButtonContaniner = styled(Flex)`
  width: 100%;
`;
LanguageButtonContaniner.defaultProps = { flexWrap: "wrap" };

const LanguageChooserModal = (props: CommonModalProps) => {
  const t = useContext(TranslationContext);

  function selectLanguage(
    language: string,
    currentLanguage: string,
    location: { location: { pathname: string; search: string } },
  ) {
    let preparedLanguage;

    if (language.toLowerCase() === "en-us" || language.toLowerCase() === "en") {
      preparedLanguage = "";
    } else {
      preparedLanguage = `/${language.toLowerCase()}`;
    }
    let path = location.location.pathname;
    if (currentLanguage) {
      if (path.startsWith(`/${currentLanguage.toLowerCase()}`)) {
        path = `${path.substring(currentLanguage.length + 1)}`;
      }
    }
    setLanguageCookie(language);
    let finalpath = preparedLanguage.toLowerCase() + path;
    if (finalpath.endsWith("//")) {
      finalpath = finalpath.substr(0, finalpath.length - 1);
    }

    const search = location.location.search || "";

    window.location.href = `${finalpath}${search}`;
  }

  return (
    <CommonModal headerText={t.translate("components.signup_modal.title")} modalDialogStyle={modalStyle} {...props}>
      <Location>
        {(locationProps) => (
          <LanguageButtonContaniner>
            <TranslationContext.Consumer>
              {(value: any) =>
                value.translations.allLanguages.map((language: string) => (
                  <LanguageButton
                    key={language}
                    active={language === value.translations.currentLocale}
                    onClick={() => selectLanguage(language, value.translations.currentLocale, locationProps)}
                  >
                    {localesList[language]}
                  </LanguageButton>
                ))
              }
            </TranslationContext.Consumer>
          </LanguageButtonContaniner>
        )}
      </Location>
    </CommonModal>
  );
};

export default LanguageChooserModal;
