import React, { useState, FC, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import HeaderLink, { HeaderLinkProps } from "./HeaderLink";
import { getRelativePath } from "@src/utils/routes";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import { mediaQueries } from "@src/styles/theme";
import { ChevronDownIcon, BodyText, DetailText, theme, ChevronUpIcon } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { HeaderButton } from "@src/components/partials/header/HeaderLink/styles";

interface NavListItemProps extends HeaderLinkProps {
  path: string;
  eventName: string;
  isNarrow?: boolean;
  sublinks?: {
    path: string;
    ctaTranslated: string;
    descriptionTranslated?: string;
    eventName: string;
  }[];
  translationPath?: string;
  condition?: boolean;
  highlighted?: boolean;
  [key: string]: any;
}

const ListItem = styled("li")`
  padding: 10px 15px;
  list-style: none;
  margin-top: 0;
  ${mediaQueries[2]} {
    padding: 0;
  }
`;

const TransparentButton = styled(HeaderButton)<{ highlighted?: boolean }>`
  display: flex;
  font-weight: 500;
  font-family: DojoText, Helvetica, Arial, sans-serif;
  flex-direction: row;
  padding: 10px 15px;
  gap: 4px;
  align-items: flex-end;
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  color: #2c2a50;
  &.highlighted {
    color: #7d40ff;
    svg {
      fill: #7d40ff;
    }
  }
  &:hover {
    color: #00b2f7;
    svg {
      fill: #00b2f7;
    }
  }
`;

const ResourcesMenu = styled("div")<{ isNarrow?: boolean }>`
  margin: 12px 24px;
  padding: 18px;
  border-top: solid 1px ${theme.colors.taro30};
  border-bottom: solid 1px ${theme.colors.taro30};
  a {
    display: block;
    padding: 10px 0px;
    span {
      color: ${theme.colors.taro50};
    }
    &:hover {
      strong {
        color: ${theme.colors.aqua50};
        text-decoration: underline;
      }
    }
  }
  ${mediaQueries[2]} {
    position: absolute;
    top: 40px;
    width: ${(props) => (props.isNarrow ? "200px" : "360px")};
    left: 50%;
    transform: translate(-50%);
    border-radius: 18px;
    margin: 0;
    background: white;
    border: 2px solid ${theme.colors.taro30};
    box-shadow: 0 6px 0 rgba(45, 64, 150, 0.06);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const NavListItem: FC<NavListItemProps> = ({
  path,
  eventName,
  sublinks,
  translationPath,
  condition,
  highlighted,
  isNarrow,
  ...linkProps
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onClick = () => {
    if (!window || !window.location) return;

    return logEvent({
      eventValue: window.location.href,
      eventName,
    });
  };

  const toggleDropdown = (event: string) => {
    logEvent({
      eventName: event,
      eventValue: window.location.href,
    });
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (condition !== undefined && !condition) {
    return null;
  }

  return (
    <ListItem>
      {sublinks ? (
        <DropdownContainer ref={dropdownRef}>
          <TransparentButton className={highlighted ? "highlighted" : ""} onClick={() => toggleDropdown(eventName)}>
            <Translate path={translationPath} />
            {isDropdownOpen ? <ChevronUpIcon size="xs" /> : <ChevronDownIcon size="xs" />}
          </TransparentButton>
          {isDropdownOpen && (
            <ResourcesMenu isNarrow={isNarrow}>
              {sublinks.map((link, index) => (
                <HeaderLink key={index} to={getRelativePath(link.path)} onClick={() => toggleDropdown(link.eventName)}>
                  <>
                    <BodyText as="strong">
                      <Translate path={link.ctaTranslated} />
                    </BodyText>
                    <DetailText>
                      <Translate path={link.descriptionTranslated} />
                    </DetailText>
                  </>
                </HeaderLink>
              ))}
            </ResourcesMenu>
          )}
        </DropdownContainer>
      ) : (
        <HeaderLink to={getRelativePath(path)} onClick={onClick} {...linkProps} />
      )}
    </ListItem>
  );
};

export default NavListItem;
