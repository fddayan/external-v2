import React, { useContext } from "react";
import { EntityType, getSubdomainURL } from "@src/utils/getSubdomainURL";
import HeaderLink from "../HeaderLink";
import Translate from "@src/components/translation/Translate";
import { Button } from "@src/components/nessie-web";
import { incrementMetric } from "@src/utils/logClient";
import { navigate } from "gatsby";
import * as S from "./styles";
import { AppDataContext } from "@src/components/AppDataContext";

const LoginPart = (props: { openLoginModal: () => void; openSignupModal: () => void }) => {
  const { openLoginModal, openSignupModal } = props;
  const { data: appData } = useContext(AppDataContext);
  function openWelcomeBackLink() {
    incrementMetric("external_site.welcome_back_click");
    navigate(getSubdomainURL(appData.type));
  }
  let LoginPartRender = null;
  if (appData.loadingSession) {
    LoginPartRender = (
      <>
        <S.NoBulletLi>
          <HeaderLink href="https://teach.classdojo.com/">
            <S.LinkText>
              <Translate path="layouts.main.teacher_login" />
            </S.LinkText>
          </HeaderLink>
        </S.NoBulletLi>
        <S.NoBulletLi>
          <HeaderLink href="https://home.classdojo.com/">
            <S.LinkText>
              <Translate path="layouts.main.parent_login" />
            </S.LinkText>
          </HeaderLink>
        </S.NoBulletLi>
      </>
    );
  } else {
    if (appData.userData) {
      LoginPartRender = (
        <S.NoBulletLi>
          <HeaderLink onClick={openWelcomeBackLink}>
            <S.LoggedInText>
              {appData.name ? (
                <Translate path="components.welcome_banner.hi" subs={{ name: appData.name }} />
              ) : (
                <Translate path="components.welcome_banner.welcome_back_anon" />
              )}
              <span>! </span>
              <Translate path="components.welcome_banner.come_in" />
            </S.LoggedInText>
          </HeaderLink>
        </S.NoBulletLi>
      );
    } else {
      LoginPartRender = (
        <>
          <S.NoBulletLi>
            <HeaderLink onClick={openLoginModal} data-test-name="open-login-modal">
              <S.LinkText>
                <Translate path="pages.home.log_in" />
              </S.LinkText>
            </HeaderLink>
          </S.NoBulletLi>
          <S.NoBulletLi>
            <Button size="s" kind="primary" onClick={openSignupModal} data-test-name="open-signup-modal">
              <Translate path="pages.home.sign_up" />
            </Button>
          </S.NoBulletLi>
        </>
      );
    }
  }

  return <>{LoginPartRender}</>;
};

export default LoginPart;
