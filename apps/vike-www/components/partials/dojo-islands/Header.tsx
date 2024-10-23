import React, { useEffect, useState, useContext } from "react";
import Translate from "@src/components/translation/Translate";
import { AppDataContext } from "@src/components/AppDataContext";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { logEvent } from "@src/utils/logClient";
import { DropDown, DropDownItem } from "@src/components/Dropdown";

export interface HeaderProps {
  scrollY: number;
  logo: string;
  cta: {
    label: string;
    parent: string;
    teacher: string;
    student: string;
  };
}

const Header: React.FC<HeaderProps> = (props) => {
  const theme = useTheme();
  const appData = useContext(AppDataContext);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > props.scrollY) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.scrollY]);

  const headerCss = (isSticky: boolean) => ({
    height: 96,
    backgroundColor: "white",
    padding: 18,
    transition: "transform 0.5s ease-in-out",
    position: "fixed",
    top: 0,
    width: "100%",
    transform: `translateY(${isSticky ? 0 : "-100%"})`,
    zIndex: 500,
  });

  const containerCSS = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoCss = {
    width: 100,
  };

  const buttonCss = {
    ...theme.__new.typography.Headline3Bold,
    padding: "18px 32px",
    backgroundColor: theme.__new.colors.contentAccent,
    color: theme.__new.colors.contentLight,
    display: "block",
    textAlign: "center",
    borderRadius: 99,
    border: "none",
    cursor: "pointer",
  };

  const logButtonEvent = (userType: string) => {
    logEvent({
      eventName: `web.external_page.dojo_islands.header_button.tap.${userType}`,
      eventValue: window.location.href,
    });
  };

  const TriggerButton = ({
    "aria-expanded": ariaExpanded,
    onClick,
  }: {
    "aria-expanded": boolean;
    onClick: () => void;
  }) => (
    <button aria-expanded={ariaExpanded} onClick={onClick} css={buttonCss}>
      <Translate path={props.cta.label} />
    </button>
  );

  return (
    <div css={headerCss(isSticky)}>
      <Container css={containerCSS}>
        <img css={logoCss} src={props.logo} alt="Dojo Islands logo" />
        <DropDown Trigger={TriggerButton}>
          <DropDownItem>
            <a href={props.cta.teacher} onClick={() => logButtonEvent("teachers")}>
              <Translate path="layouts.main.teachers" />
            </a>
          </DropDownItem>
          <DropDownItem>
            <a href={props.cta.student} onClick={() => logButtonEvent("students")}>
              <Translate path="layouts.main.students" />
            </a>
          </DropDownItem>
          <DropDownItem>
            <a href={props.cta.parent} onClick={() => logButtonEvent("parents")}>
              <Translate path="layouts.main.parents" />
            </a>
          </DropDownItem>
        </DropDown>
      </Container>
    </div>
  );
};

export default Header;
