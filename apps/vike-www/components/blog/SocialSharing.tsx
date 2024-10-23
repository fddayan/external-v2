import React from "react";
import { Location } from "@reach/router";
import { FlexList } from "@src/components/Boxes";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import { PublicUrlImg } from "@src/types/common";
import { getFilenameDiskUrl } from "@src/utils/normalize-static-query-result";

const iconStyle = css`
  margin-right: 15px;
`;

const SocialSharing = ({ image }: { image: PublicUrlImg }) => {
  const data = useStaticQuery<{ site: { siteMetadata: { devBlogUrl: string; blogUrl: string } } }>(graphql`
    query {
      site {
        siteMetadata {
          devBlogUrl
          blogUrl
        }
      }
    }
  `);

  const { site } = data;

  let blogUrl: string;
  if (process.env.GATSBY_BUILD_WEBSITE === "blog") {
    blogUrl = site.siteMetadata.blogUrl;
  } else {
    blogUrl = site.siteMetadata.devBlogUrl;
  }

  return (
    <Location>
      {(locationProps) => {
        const url = locationProps.location.href;
        return (
          <FlexList>
            <li>
              <FacebookShareButton url={url} css={iconStyle}>
                <FacebookIcon size={32} />
              </FacebookShareButton>
            </li>

            <li>
              <TwitterShareButton url={url} css={iconStyle}>
                <TwitterIcon size={32} />
              </TwitterShareButton>
            </li>

            <li>
              <LinkedinShareButton url={url} css={iconStyle}>
                <LinkedinIcon size={32} />
              </LinkedinShareButton>
            </li>

            <li>
              <PinterestShareButton
                url={url}
                media={
                  image
                    ? blogUrl + getFilenameDiskUrl(image)
                    : "https://static.classdojo.com/uploads/054367e8-bd16-4b40-966a-97228437628d.png"
                }
              >
                <PinterestIcon size={32} />
              </PinterestShareButton>
            </li>
          </FlexList>
        );
      }}
    </Location>
  );
};

export default SocialSharing;
