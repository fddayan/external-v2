import React, { ReactNode } from "react";
import { Link } from "gatsby";
import { getRelativePath } from "@src/utils/routes";

type SmartLinkProps = {
  path: string;
  children: ReactNode;
  [key: string]: any;
};

const SmartLink: React.FC<SmartLinkProps> = ({ path, children, ...otherProps }) => {
  if (path[0] === "/") {
    return (
      <Link to={getRelativePath(path)} {...otherProps}>
        {children}
      </Link>
    );
  }

  return (
    <a href={path} {...otherProps}>
      {children}
    </a>
  );
};

export default SmartLink;
