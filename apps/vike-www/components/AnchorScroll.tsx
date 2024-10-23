import React from "react";
import styled from "@emotion/styled";
import window from "global/window";

const Link = styled.a`
  display: inline-block;
  line-height: 30px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  color: #00bcf2;
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #00a8d9;
  }
  margin-left: 30px;
  margin-right: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;

function scrollWithOffset(href: string, offset = 192) {
  const element = document.querySelector(href);
  const coordinate = element?.getBoundingClientRect().top;

  const pageTitle = document.title;
  const pagePath = document.location.pathname;

  window.scrollTo({
    top: (coordinate ?? 0) - offset,
    behavior: "smooth",
  });

  window.history.pushState("object or string", pageTitle, pagePath + href);
}

type AnchorScrollProps = {
  href: string;
  customOffset?: number;
  children: any;
  ariaLabel?: string;
};

const AnchorScroll: React.FC<AnchorScrollProps> = ({ href, customOffset = 192, ariaLabel, children }) => {
  return (
    <Link role="link" tabIndex={0} onClick={() => scrollWithOffset(href, customOffset)} aria-label={ariaLabel}>
      {children}
    </Link>
  );
};

export { scrollWithOffset, AnchorScroll };
