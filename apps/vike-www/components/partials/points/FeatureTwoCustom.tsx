import React from "react";
import { Flex } from "@src/components/Boxes";

const FeatureTwoCustom = () => {
  return (
    <Flex alignItems="center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            d="M358.714 284.262C274.64 304.257 93.1641 258.304 35.4406 216.252C-22.6689 174.238 -1.62436 89.6273 54.7241 47.725C111.416 5.98145 211.892 -5.0049 306.02 3.45351C400.148 11.9119 507.212 53.0999 499.068 124.273C490.432 179.577 442.402 264.305 358.714 284.262Z"
            fill="#70DBFF"
            id="path-1"
          ></path>
        </defs>
        <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="teacher_hero-05-1" transform="translate(0.945605, 1.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <use id="Mask" fill="#FF006600" fillRule="nonzero" xlinkHref="#path-1"></use>
            <image
              mask="url(#mask-2)"
              x="-5"
              y="-5"
              width="310"
              height="160"
              xlinkHref="https://static.classdojo.com/img/GIFs/points.gif"
            ></image>
          </g>
        </g>
      </svg>
    </Flex>
  );
};

export default FeatureTwoCustom;
