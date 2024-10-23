import React from "react";
import Link from "@src/components/UTMLink";
import { Flex } from "@src/components/Boxes";
import Spacer from "@src/components/Spacer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { css } from "@emotion/react";

const nextPreviousButtonStyles = css`
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border-radius: 0px;
  font-size: 14px;
  border: none;
  color: #00aeef;
  text-decoration: none;

  :hover {
    color: #fff;
    background: #00aeef;
  }
`;

const NextPrevNav = ({
  nextLink,
  prevLink,
  nextText,
  prevText,
}: {
  nextLink: string;
  prevLink: string;
  nextText: string;
  prevText: string;
}) => {
  return (
    <Flex justifyContent="space-between" my="20px">
      {prevLink && (
        <Link to={prevLink} css={nextPreviousButtonStyles}>
          <Flex alignItems="center">
            <FaChevronLeft />
            <span>{prevText}</span>
          </Flex>
        </Link>
      )}
      <Spacer width="1px" />
      {nextLink && (
        <Link to={nextLink} css={nextPreviousButtonStyles}>
          <Flex alignItems="center">
            <span>{nextText}</span>
            <FaChevronRight />
          </Flex>
        </Link>
      )}
    </Flex>
  );
};

NextPrevNav.defaultProps = { nextText: "Older posts", prevText: "Newer posts" };

export default NextPrevNav;
