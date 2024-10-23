import React from "react";
import * as S from "./styles";

export type HeaderLinkProps = {
  children?: JSX.Element;
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
};
const HeaderLink = ({ children, className, ...props }: HeaderLinkProps) => {
  const { href, to } = props;
  const LinkComponent = href ? S.HeaderHTMLA : to ? S.HeaderGatsbyLink : S.HeaderButton;
  return LinkComponent ? (
    <LinkComponent to={to ?? ""} className={className} {...props}>
      {children}
    </LinkComponent>
  ) : null;
};

export default HeaderLink;
