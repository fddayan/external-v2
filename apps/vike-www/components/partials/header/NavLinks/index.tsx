import React, { useCallback, useEffect, useContext } from "react";
import NavListItem from "../NavListItem";
import isMobile from "@src/utils/isMobile";
import Translate from "@src/components/translation/Translate";
import { FlexProps } from "@src/components/Boxes";
import DownloadAppButton from "../DownloadAppButton";
import LoginPart from "../LoginPart";
import * as S from "./styles";
import { debounce } from "lodash";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { HeaderHTMLA } from "../HeaderLink/styles";
import { logEvent } from "@src/utils/logClient";
import { ExternalSwitches, featureSwitches } from "@src/utils/experiments/constants";

type NavLinkProps = FlexProps & {
  openLoginModal: () => void;
  openSignupModal: () => void;
  closeMenu: () => void;
  active?: boolean;
  mobile?: boolean;
};

const DojoTutorLink = () => {
  const onClick = () => {
    if (!window || !window.location) return;

    return logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.navbar.dojo_tutor.tap",
    });
  };

  return (
    <HeaderHTMLA href="https://tutor.classdojo.com/?utm_source=webnav" onClick={onClick}>
      <S.LinkText>
        <Translate path="layouts.main.tutor" />
      </S.LinkText>
    </HeaderHTMLA>
  );
};

const NavLinks: React.FC<NavLinkProps> = ({ openLoginModal, openSignupModal, closeMenu, ...props }) => {
  const handleOpenLogin = useCallback(() => {
    closeMenu();
    openLoginModal();
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.navbar.login.tap",
      experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
    });
  }, [closeMenu, openLoginModal]);

  const handleOpenSignup = useCallback(() => {
    closeMenu();
    openSignupModal();
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.navbar.signup.tap",
      experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
    });
  }, [closeMenu, openSignupModal]);

  const { translationLocaleAsString } = useContext(TranslationContext);
  const currentLocale = translationLocaleAsString();

  const isCountryUS = currentLocale === "en";
  const isUserInMobile = isMobile().any;

  const mobileMenuData = [
    {
      path: "/teachers/",
      eventName: "web.external_page.navbar.teachers.tap",
      translationPath: "layouts.main.teachers",
    },
    {
      path: "/schools/",
      eventName: "web.external_page.navbar.schools.tap",
      translationPath: "layouts.main.schools",
    },
    {
      path: "/districts/",
      eventName: "web.external_page.navbar.districts.tap",
      translationPath: "layouts.main.districts",
      condition: isCountryUS,
    },
    {
      path: "/resources/",
      eventName: "web.external_page.navbar.resources.tap",
      translationPath: "layouts.main.support.resources",
    },
    {
      path: "/dojo-islands/",
      eventName: "web.external_page.navbar.dojo_islands.tap",
      translationPath: "layouts.main.islands",
    },
    // {
    //   path: "https://tutor.classdojo.com/?utm_source=webnav",
    //   eventName: "web.external_page.navbar.dojo_tutor.tap",
    //   translationPath: "layouts.main.tutor",
    //   condition: isCountryUS,
    // },
  ];

  const desktopMenuData = [
    {
      eventName: "web.external_page.navbar.whatsnew.tap",
      translationPath: "layouts.main.whatsnew",
      condition: isCountryUS,
      highlighted: true,
      isNarrow: true,
      sublinks: [
        {
          ctaTranslated: "layouts.main.submenu_whatsnew.for_teachers",
          eventName: "web.external_page.navbar.whatsnew.teachers",
          path: "/dojoglow/?utm_source=newnav",
        },
        {
          ctaTranslated: "layouts.main.submenu_whatsnew.for_sl",
          eventName: "web.external_page.navbar.whatsnew.sl",
          path: "/sayhello/?utm_source=newnav",
        },
        {
          ctaTranslated: "layouts.main.submenu_whatsnew.for_mentors",
          eventName: "web.external_page.navbar..whatsnew.mentors",
          path: "/mentor-bts-2024/?utm_source=newnav",
        },
      ],
    },
    {
      path: "/teachers/",
      eventName: "web.external_page.navbar.teachers.tap",
      translationPath: "layouts.main.teachers",
    },
    {
      path: "/schools/",
      eventName: "web.external_page.navbar.schools.tap",
      translationPath: "layouts.main.schools",
    },
    {
      path: "/districts/",
      eventName: "web.external_page.navbar.districts.tap",
      translationPath: "layouts.main.districts",
      condition: isCountryUS,
    },
    {
      eventName: "web.external_page.navbar.resources.tap",
      translationPath: "layouts.main.support.resources",
      sublinks: [
        {
          ctaTranslated: "layouts.main.submenu_training.cta",
          descriptionTranslated: "layouts.main.submenu_training.description",
          path: "/training/?utm_source=newnav",
        },
        {
          ctaTranslated: "layouts.main.submenu_resources.cta",
          descriptionTranslated: "layouts.main.submenu_resources.description",
          path: "/resources/?utm_source=newnav",
        },
        {
          ctaTranslated: "layouts.main.submenu_big_ideas.cta",
          descriptionTranslated: "layouts.main.submenu_big_ideas.description",
          path: "https://ideas.classdojo.com/?utm_source=newnav",
        },
        {
          ctaTranslated: "layouts.main.submenu_activity_corner.cta",
          descriptionTranslated: "layouts.main.submenu_activity_corner.description",
          path: "/activity-corner/?utm_source=newnav",
        },
        {
          ctaTranslated: "layouts.main.submenu_sl_resources.cta",
          descriptionTranslated: "layouts.main.submenu_sl_resources.description",
          path: "/schoolleader-resources/?utm_source=newnav",
        },
      ],
    },
    {
      path: "/dojo-islands/",
      eventName: "web.external_page.navbar.dojo_islands.tap",
      translationPath: "layouts.main.islands",
    },
    // {
    //   path: "https://tutor.classdojo.com/?utm_source=webnav",
    //   eventName: "web.external_page.navbar.dojo_tutor.tap",
    //   translationPath: "layouts.main.tutor",
    //   condition: isCountryUS,
    // },
  ];

  // This is necessary so the focus doesn't stay trapped in the nav
  // if the menu is open on small screen and the user resizes it to a bigger width
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      closeMenu();
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let downloadButtonHref, downloadTranslationPath;

  if (isMobile().apple.tablet) {
    downloadButtonHref = "https://itunes.apple.com/us/app/classdojo/id552602056?mt=8";
    downloadTranslationPath = "header.nav.get_ipad_app";
  } else if (isMobile().apple.phone) {
    downloadButtonHref = "https://itunes.apple.com/us/app/classdojo/id552602056?mt=8";
    downloadTranslationPath = "header.nav.get_iphone_app";
  } else if (isMobile().android.device) {
    downloadButtonHref = "https://play.google.com/store/apps/details?id=com.classdojo.android";
    downloadTranslationPath = "header.nav.get_android_app";
  }

  const handleKeyDown = (event: { key: string; preventDefault: () => void; stopPropagation: () => void }) => {
    if (event.key === "Escape") closeMenu();
    const currentListItem = document.activeElement?.parentElement as HTMLLIElement;
    const parentList = currentListItem.parentNode;
    const previousElement = currentListItem.previousElementSibling;
    const nextElement = currentListItem.nextElementSibling;

    let targetListItem;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (previousElement) targetListItem = previousElement;
      else targetListItem = parentList?.lastElementChild;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (nextElement) targetListItem = nextElement;
      else targetListItem = parentList?.firstElementChild;
    }
    if (targetListItem) (targetListItem.firstElementChild as HTMLElement)?.focus();
    event.stopPropagation();
  };

  return (
    <S.NavLinksContainer active={props.active} aria-hidden={!props.active} onKeyDown={handleKeyDown}>
      {(isUserInMobile ? mobileMenuData : desktopMenuData).map(
        ({ path, eventName, translationPath, sublinks, condition, highlighted, isNarrow }, i) => (
          <NavListItem
            translationPath={translationPath}
            path={path}
            onClick={closeMenu}
            eventName={eventName}
            sublinks={sublinks}
            key={i}
            condition={condition}
            highlighted={highlighted}
            isNarrow={isNarrow}
          >
            <S.LinkText>
              <Translate path={translationPath} />
            </S.LinkText>
          </NavListItem>
        ),
      )}
      {isCountryUS && <DojoTutorLink />}
      <LoginPart openLoginModal={handleOpenLogin} openSignupModal={handleOpenSignup} />
      {/* TODO extract this device checking to a central place */}
      {typeof window !== "undefined" && (
        <>
          {downloadButtonHref && downloadTranslationPath && (
            <DownloadAppButton buttonHref={downloadButtonHref} translationPath={downloadTranslationPath} />
          )}
        </>
      )}
    </S.NavLinksContainer>
  );
};

export default NavLinks;
