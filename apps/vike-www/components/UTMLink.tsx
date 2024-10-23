import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const parseQueryParams = (query) => {
  return query ? Object.fromEntries(new URLSearchParams(query)) : {};
};

const stringifyQueryParams = (params) => {
  return "?" + new URLSearchParams(params).toString();
};

const UTMLink = ({ to, children, ...otherProps }) => {
  const location = useLocation();
  const currentParams = parseQueryParams(location.search);
  const [baseTo, searchParams] = to.split("?");
  const targetParams = parseQueryParams(searchParams);

  const mergedParams = { ...currentParams, ...targetParams };

  const newTo = `${baseTo}${stringifyQueryParams(mergedParams)}`;

  return (
    <Link to={newTo} {...otherProps}>
      {children}
    </Link>
  );
};

export default UTMLink;
