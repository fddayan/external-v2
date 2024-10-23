import React from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";

export const Oversized = styled.h1`
  font-family: DojoDisplay !important;
  font-size: 92px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 101.2px */
  ${mediaQueriesMax[1]} {
    font-size: 44px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    letter-spacing: -0.3px;
  }
`;

export const Display1 = styled.h1`
  font-family: DojoDisplay !important;
  font-size: 69px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 75.9px */
  letter-spacing: -0.9px;
  color: #2c2a50;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 35px;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
  em {
    position: relative;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      background-image: url(https://static.classdojo.com/uploads/41f6d170-008b-4c24-a33f-c33037e46ebf.png);
      width: 100%;
      height: 20%;
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
`;
export const Display3 = styled.h3`
  font-size: 44px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 52.8px */
  letter-spacing: -0.3px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 35px;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

export const Headline3 = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin-block: 0;
`;

export const Headline2 = styled.p`
  font-size: 23px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.1px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 21.6px */
  }
`;

export const Headline1 = styled.p`
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 33.6px */
  letter-spacing: -0.1px;
  margin-block: 0;
  color: #2c2a50;
  ${mediaQueriesMax[1]} {
    font-size: 23px;
    font-style: normal;
    line-height: 120%; /* 27.6px */
    letter-spacing: -0.1px;
  }
`;

export const Display2 = styled.h2`
  font-family: DojoDisplay !important;
  font-size: 55px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 66px */
  letter-spacing: -0.6px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 35px;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

export const Display4 = styled.h4`
  font-family: DojoDisplay !important;
  margin-block: 0;
  font-size: 35px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%;
  letter-spacing: -0.3px;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
    letter-spacing: -0.1px;
  }
`;

export const GradientContainer = styled.div`
  background: url(https://static.classdojo.com/img/2024/03/mojo-wand.svg) no-repeat calc(50% + 270px) calc(100% - 20px),
    linear-gradient(227deg, #d1ebff 3.15%, #f0e7ff 96.2%);
  border-radius: 48px;
  padding: 72px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  overflow: hidden;
  ${mediaQueriesMax[0]} {
    padding-inline: 12px;
    background: linear-gradient(227deg, #d1ebff 3.15%, #f0e7ff 96.2%);
    padding-top: 48px;
  }
`;

export const BlobBackground = styled.div`
  background-image: url('data:image/svg+xml,<svg width="823" height="823" viewBox="0 0 823 823" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_2162_3461)"><path fill-rule="evenodd" clip-rule="evenodd" d="M410.484 57.4283C510.028 62.0815 623.158 36.3238 693.824 106.63C768.51 180.937 790.908 303.465 758.629 403.804C729.588 494.08 616.124 511.885 543.755 573.121C465.924 638.98 427.146 764.069 325.425 770.368C217.959 777.022 113.709 698.254 63.6832 602.846C18.635 516.932 74.338 419.715 91.4887 324.209C106.888 238.456 90.4879 137.423 157.296 81.5502C224.928 24.9883 322.451 53.3131 410.484 57.4283Z" fill="%23F0E7FF"/></g><defs><clipPath id="clip0_2162_3461"><rect width="740.168" height="740.168" fill="white" transform="translate(87.6851) rotate(6.80362)"/></clipPath></defs></svg>');
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  max-width: 800px;
  min-height: 850px;
  justify-content: center;
  margin: auto;
  img {
    border-radius: 50%;
    width: 250px;
  }
  ${mediaQueriesMax[0]} {
    background-size: 150px;
    background-position: center 10px;
    min-height: auto;
    padding-bottom: 100px;
    padding-inline: 25px;
    img {
      width: 105px;
    }
    .author {
      font-size: 18px;
    }
  }
`;

export const Blockquote = styled.p`
  color: #2c2a50;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 42px */
  letter-spacing: -0.3px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
  }
`;

export const Overline = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.7px;
  text-transform: uppercase;
  margin-block: 0;
`;

export const Caption = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
  letter-spacing: 0.7px;
  text-transform: uppercase;
  margin-block: 0;

  ${mediaQueriesMax[0]} {
    font-size: 12px;
  }
`;

export const PurpleBox = styled.div`
  background-color: #8047ff;
  border-radius: 30px;
  padding-bottom: 70px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    margin-top: -130px;
    margin-bottom: 20px;
  }
  ${mediaQueriesMax[0]} {
    padding-bottom: 40px;
    img {
      margin-bottom: 0px;
    }
  }
`;

export const Card = styled.a`
  background-color: #f6f2ff;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  padding-block: 24px;
  padding-inline: 30px;
  gap: 30px;
  max-width: 430px;
  &:not(.interactive) {
    pointer-events: none;
  }
  transition: transform ease-in 0.2s;
  ${mediaQueriesMax[1]} {
    min-height: 300px;
  }
  &.interactive:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform ease-in 0.2s;
    .carret {
      &::before {
        transition: width 0.2s ease-in;
        width: 30px;
      }
    }
  }
  .carret {
    display: block;
    &::before {
      transition: width 0.2s ease-in;
      position: absolute;
      content: "";
      top: 50%;
      right: 3px;
      margin-top: -4px;
      width: 1px;
      height: 3px;
      background: #8047ff;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px; /* 127.778% */
    color: #8047ff;
    padding-block: 12px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 36px;
  margin-top: 78px;
  min-height: 400px;
  margin: auto;
  ${mediaQueriesMax[2]} {
    margin-top: 48px;
    gap: 24px;
    flex-direction: column;
    align-items: center;
  }
`;

export const Icon = ({ icon }) => {
  if (icon === "apple") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.1167 17.4688C39.187 17.4688 42.2964 22.4532 42.2964 28.125C42.2964 37.875 35.6636 46.3438 30.6245 46.3438C28.5464 46.3438 26.7886 45.5469 25.812 44.9844C25.312 44.6954 24.687 44.6954 24.187 44.9844C23.2183 45.5391 21.4526 46.3438 19.3745 46.3438C14.3355 46.3438 7.70264 37.875 7.70264 28.125C7.70264 22.4532 10.812 17.4688 18.8823 17.4688C20.2808 17.4688 21.4292 17.7109 22.3276 18.0391C24.0386 18.6563 25.9526 18.6563 27.6636 18.0391C28.5698 17.7109 29.7105 17.4688 31.1089 17.4688H31.1167ZM14.4604 4.34378C13.8511 4.25003 13.3276 4.77348 13.4214 5.38286C14.2573 10.6719 18.4058 14.8125 23.687 15.6484C24.2964 15.7422 24.8198 15.2188 24.7261 14.6094C23.8901 9.32035 19.7417 5.17972 14.4604 4.34378Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "check") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 5.46875C14.2109 5.46875 5.46875 14.2109 5.46875 25C5.46875 35.7891 14.2109 44.5312 25 44.5312C35.7891 44.5312 44.5312 35.7891 44.5312 25C44.5312 14.2109 35.7812 5.46875 25 5.46875ZM33.3438 19.3203C26.9219 27.1328 23.6406 33.9063 23.6094 33.9766C23.3203 34.5781 22.75 34.9844 22.0938 35.0703C22.0078 35.0781 21.9298 35.0859 21.8438 35.0859C21.2735 35.0859 20.7266 34.836 20.3516 34.3906L15.3829 28.5C14.6875 27.6719 14.7891 26.4453 15.6172 25.75C16.4453 25.0547 17.6719 25.1563 18.3672 25.9844L21.4766 29.6719C23.0625 26.8672 25.9922 22.1172 30.3282 16.8438C31.0157 16.0078 32.2501 15.8906 33.0782 16.5781C33.9063 17.2578 34.0235 18.4844 33.3438 19.3203Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "chat") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M33.3133 16.453C25.2365 16.453 18.667 23.0212 18.6649 31.0975C18.6653 32.6586 18.9231 34.1651 19.3914 35.5936C19.4696 35.828 19.3211 36.078 19.0711 36.1092C14.5008 36.6561 9.8758 36.7108 5.28987 36.1796C4.61018 36.1014 4.39924 35.2342 4.95393 34.8436C6.44612 33.8124 7.50862 32.2655 7.93831 30.4999C7.96956 30.3671 7.9383 30.2264 7.85237 30.1171C5.41487 27.1249 4.07112 23.2186 4.43831 18.9842C5.08674 11.4296 11.4071 5.36705 18.868 4.90612C26.3289 4.44518 32.7117 9.2733 34.6883 15.9921C34.7664 16.2499 34.5555 16.4999 34.2821 16.4842C33.9617 16.4608 33.6414 16.453 33.3133 16.453ZM42.8602 39.414C43.1883 40.7577 44.118 41.789 45.2039 42.6405V42.6483C45.6102 42.9608 45.4305 43.6249 44.9071 43.6874C42.8836 43.9218 41.0086 44.0702 39.0946 44.0702C36.618 44.0702 34.0633 43.8202 30.9852 43.1796C25.5243 42.0468 21.0164 37.1015 21.0164 31.1015C21.0164 24.1015 26.8602 18.4608 33.9305 18.8046C40.2039 19.1015 45.3446 24.2733 45.618 30.5468C45.7508 33.6093 44.7586 36.4374 43.0321 38.6562C42.8602 38.8749 42.7977 39.1483 42.8602 39.414Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "lock") {
    return (
      <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M44.7642 27.3883C44.3922 25.5104 42.7977 24.1286 40.8933 23.9249C40.4592 23.8806 40.1228 23.5086 40.1228 23.0745V20.1603C40.1228 13.641 34.6574 8.37066 28.0673 8.6984C21.9023 8.99956 17.1724 14.3231 17.1724 20.4881V23.0745C17.1724 23.5174 16.8445 23.8806 16.4017 23.9249C14.4972 24.1198 12.9029 25.5104 12.5309 27.3883C11.468 32.7384 11.4591 38.239 12.5132 43.5891L12.5309 43.6777C12.8941 45.5467 14.4174 46.9728 16.3041 47.2119C24.4976 48.2749 32.7885 48.2749 40.9819 47.2119C42.8686 46.9639 44.3922 45.5467 44.7554 43.6777L44.7731 43.5891C45.836 38.239 45.8271 32.7384 44.7642 27.3883ZM22.5134 23.3757C22.0174 23.4111 21.6013 23.0214 21.6013 22.5254V20.1603C21.6013 16.1123 25.0292 12.8527 29.1304 13.1273C32.8683 13.3753 35.6939 16.6527 35.6939 20.4084V22.5254C35.6939 23.0214 35.2775 23.4023 34.7815 23.3757C30.6981 23.11 26.5968 23.11 22.5134 23.3757Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "mojo") {
    return (
      <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M39.2144 7.81472C39.2144 6.67473 40.1396 5.74951 41.2796 5.74951C42.4196 5.74951 43.3448 6.67473 43.3448 7.81472C43.3448 8.95472 42.4196 9.87993 41.2796 9.87993C40.1396 9.87993 39.2144 8.95472 39.2144 7.81472ZM40.7509 23.1468C42.0313 23.8986 42.6261 24.8899 42.8904 25.559C43.0556 25.9803 42.8491 26.4512 42.4361 26.6164C41.6265 26.9468 40.1478 27.3103 38.3965 26.5834C38.0248 26.4264 37.6944 26.2446 37.4052 26.0546C37.05 25.8151 36.5626 25.9803 36.4387 26.3933C36.3809 26.5833 36.4139 26.7816 36.5131 26.9386L40.4287 32.9029C40.7509 33.3903 40.85 33.9851 40.7013 34.5551C40.5526 35.1251 40.1809 35.5959 39.6687 35.8685L36.1826 37.7024C35.3235 38.1568 34.8031 39.0737 34.8609 40.0485C34.9187 40.9985 35.0096 41.9485 35.15 42.8985L35.5383 45.5585C35.5383 45.5585 35.5713 45.5585 35.5879 45.5585C36.1 45.5585 36.5131 45.9715 36.5131 46.4837C36.5131 46.9959 36.1 47.4089 35.5879 47.4089H30.8874C30.557 47.4089 30.2679 47.2189 30.1357 46.9215L28.4505 43.1381C28.3101 42.8241 27.9961 42.6341 27.6574 42.6507L27.327 42.6672C24.7909 42.7746 22.2631 42.3946 19.8757 41.5437C19.4214 41.3785 18.9257 41.6428 18.8018 42.1055L17.5379 46.8141C17.4388 47.1776 17.1166 47.4254 16.7366 47.4254H11.7636C11.2514 47.4254 10.8384 47.0124 10.8384 46.5002C10.8384 45.9881 11.2514 45.575 11.7636 45.575C11.7636 45.575 11.7719 45.575 11.7801 45.575L11.8132 41.5685C11.8297 39.9576 11.9205 38.3468 12.0527 36.7524C12.1023 36.199 11.9618 35.6455 11.6562 35.1746L7.70752 29.1607C7.38534 28.6733 7.28621 28.0786 7.43491 27.5086C7.5836 26.9468 7.95534 26.4677 8.46751 26.1951L13.8949 23.3368C14.4649 23.0394 14.8944 22.5273 15.0927 21.916C15.894 19.4873 16.8192 17.1082 17.9179 14.7786C18.5623 13.399 19.917 12.4904 21.437 12.4077L21.6188 12.3912C22.8662 12.2673 24.1135 12.2673 25.3444 12.383C25.9309 12.4408 26.5174 12.2838 27.0048 11.9534C29.5657 10.1938 32.5313 9.03731 35.6705 8.62427C37.2896 8.40949 38.2065 10.4169 36.9839 11.499C35.9431 12.4243 35.0674 13.5064 34.39 14.7125C34.1835 15.0842 34.2909 15.5469 34.6379 15.7864C35.4722 16.3647 36.2652 17.0173 37.0087 17.736C37.3887 18.0995 37.6778 18.529 37.8926 18.9916C38.0744 19.3882 38.5287 19.5864 38.9417 19.4295C39.0078 19.4047 39.0739 19.3799 39.14 19.3634C41.0152 18.7355 42.4113 19.1816 43.1713 19.5699C43.5761 19.7764 43.7248 20.2638 43.5265 20.6686C43.1548 21.4038 42.3452 22.5355 40.7674 23.1716L40.7509 23.1468ZM27.1453 29.3425C25.1296 29.6151 22.8001 29.1855 21.024 27.7481C19.9914 26.9055 18.1079 26.5255 17.3892 28.4338C16.6705 30.3503 18.2318 34.0346 22.3788 34.9185L22.4283 34.8855L22.4531 34.935C26.5092 36.1907 29.6648 33.7372 29.9787 31.7216C30.2844 29.6977 28.467 29.169 27.1453 29.3425ZM35.4144 19.9168C28.6322 15.3569 20.8175 15.3899 20.4788 15.3899C19.5701 15.3982 18.8349 16.1416 18.8431 17.0586C18.8431 17.9673 19.5866 18.6942 20.4953 18.6942H20.5036C20.5862 18.719 27.6492 18.6942 33.5639 22.6595C33.8448 22.8495 34.167 22.9403 34.4809 22.9403C35.0096 22.9403 35.5383 22.6842 35.8522 22.2134C36.3644 21.4534 36.1578 20.429 35.4061 19.9168H35.4144Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "checkbox-filled") {
    return (
      <svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.2217 5.89819C15.8135 5.89819 6.56958 15.1421 6.56958 26.5503C6.56958 37.9585 15.8135 47.2024 27.2217 47.2024C38.6299 47.2024 47.8738 37.9585 47.8738 26.5503C47.8738 15.1421 38.6216 5.89819 27.2217 5.89819ZM36.0443 20.5447C29.2539 28.8055 25.7843 35.9677 25.7512 36.042C25.4456 36.6781 24.8426 37.1077 24.1487 37.1985C24.0578 37.2068 23.9752 37.215 23.8844 37.215C23.2813 37.215 22.703 36.9507 22.3065 36.4798L17.0526 30.2512C16.3174 29.3755 16.4248 28.0786 17.3004 27.3434C18.1761 26.6081 19.473 26.7155 20.2082 27.5912L23.496 31.4903C25.173 28.5246 28.2709 23.5021 32.8556 17.926C33.5826 17.0421 34.8878 16.9182 35.7635 17.6451C36.6391 18.3638 36.763 19.6608 36.0443 20.5447Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "star-filled") {
    return (
      <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28.558 6.20047C16.3253 6.20047 6.41345 16.1124 6.41345 28.345C6.41345 40.5776 16.3253 50.4895 28.558 50.4895C40.7906 50.4895 50.7025 40.5776 50.7025 28.345C50.7025 16.1124 40.7906 6.20047 28.558 6.20047ZM41.0829 25.8028L37.4247 29.3637C36.53 30.2317 36.1226 31.4895 36.3351 32.7208L37.1943 37.752C37.4247 39.0807 36.0251 40.0905 34.8382 39.4616L30.3207 37.0877C29.2135 36.503 27.8936 36.503 26.7864 37.0877L22.2689 39.4616C21.0731 40.0905 19.6825 39.0718 19.9128 37.752L20.772 32.7208C20.9846 31.4895 20.5771 30.2317 19.6825 29.3637L16.0242 25.8028C15.0587 24.8639 15.5901 23.2252 16.9277 23.0303L21.9766 22.2951C23.2167 22.118 24.2797 21.3385 24.8377 20.2224L27.0964 15.6429C27.6899 14.4382 29.4172 14.4382 30.0107 15.6429L32.2694 20.2224C32.8186 21.3385 33.8904 22.118 35.1305 22.2951L40.1794 23.0303C41.5081 23.2252 42.0484 24.8639 41.0829 25.8028Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "badge") {
    return (
      <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.6958 42.5904C32.634 43.5181 32.9571 44.894 32.3629 46.0719C29.5486 51.6797 28.3812 58.5696 22.3669 61.6862C21.8353 61.9676 21.1786 61.7383 20.9389 61.1858C20.3552 59.8412 19.7089 58.4445 19.0001 57.006C18.7499 56.5057 18.3122 56.1305 17.7806 55.9637C15.748 55.3383 13.6529 54.6608 11.4848 53.9207C11.047 53.7748 10.9949 53.1702 11.4118 52.9513C16.6757 50.137 17.8223 45.1963 20.0737 40.0263C20.2718 39.5676 21.1473 38.7442 22.4607 38.7442H27.4327C27.7141 38.7442 27.9747 38.8589 28.1727 39.0465L31.6854 42.5592C31.6854 42.5592 31.6958 42.5696 31.7063 42.58L31.6958 42.5904ZM47.4352 40.068C47.1329 39.2341 46.3199 38.7442 45.4339 38.7546C45.4339 38.7546 45.4339 38.7546 45.4235 38.7546H40.4515C40.1701 38.7546 39.9095 38.8693 39.7115 39.0569L36.1988 42.5696L36.1779 42.5904C34.9167 43.8308 34.4997 45.6862 35.0835 47.3539L39.5864 59.9767C39.8365 60.6855 40.7225 60.9044 41.275 60.3937L45.0795 56.8705C45.4965 56.4849 46.0593 56.2868 46.6222 56.3181L51.7922 56.6412C52.5427 56.6829 53.0847 55.9533 52.8346 55.2549L47.4248 40.068H47.4352ZM49.9368 23.3384L46.0802 19.4817C45.8821 19.2836 45.7779 19.0231 45.7779 18.7416V13.2902C45.7779 12.7169 45.3088 12.2478 44.7356 12.2478H39.2841C39.0027 12.2478 38.7421 12.1332 38.544 11.9456L34.6874 8.08888C34.2809 7.68237 33.6242 7.68237 33.2072 8.08888L29.3506 11.9456C29.1525 12.1436 28.8919 12.2478 28.6105 12.2478H23.1591C22.5858 12.2478 22.1167 12.7169 22.1167 13.2902V18.7416C22.1167 19.0231 22.0021 19.2836 21.8144 19.4817L17.9578 23.3384C17.5512 23.7449 17.5512 24.4016 17.9578 24.8185L21.8144 28.6752C22.0125 28.8732 22.1167 29.1338 22.1167 29.4152V34.8667C22.1167 35.44 22.5858 35.909 23.1591 35.909H28.6105C28.8919 35.909 29.1525 36.0237 29.3506 36.2113L33.2072 40.068C33.6138 40.4745 34.2704 40.4745 34.6874 40.068L38.544 36.2113C38.7421 36.0133 39.0027 35.909 39.2841 35.909H44.7356C45.3088 35.909 45.7779 35.44 45.7779 34.8667V29.4152C45.7779 29.1338 45.8926 28.8732 46.0802 28.6752L49.9368 24.8185C50.3434 24.412 50.3434 23.7553 49.9368 23.3384ZM33.9369 30.9579C30.1323 30.9579 27.047 27.8726 27.047 24.068C27.047 20.2635 30.1323 17.1781 33.9369 17.1781C37.7414 17.1781 40.8268 20.2635 40.8268 24.068C40.8268 27.8726 37.7414 30.9579 33.9369 30.9579Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "alert") {
    return (
      <svg width="58" height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M51.1964 41.0557L50.8333 40.0637C46.9004 29.3281 41.1606 19.1594 33.7998 9.903C31.417 6.90021 26.8642 6.90021 24.4814 9.903C17.1118 19.1594 11.3719 29.3281 7.43908 40.0637L7.07592 41.0557C5.87126 44.342 8.10342 47.8762 11.5845 48.2128C23.259 49.3289 35.0133 49.3289 46.6878 48.2128C50.1689 47.8762 52.4011 44.342 51.1964 41.0557ZM29.8846 43.6156C27.6082 44.0497 25.6595 42.0921 26.0847 39.8157C26.3238 38.5578 27.3602 37.5215 28.618 37.2823C30.8944 36.8483 32.8431 38.8059 32.418 41.0823C32.1788 42.349 31.1424 43.3765 29.8846 43.6156ZM32.48 30.7719L32.1079 32.1625C31.8688 33.066 31.293 33.7481 30.5844 33.9872C29.7075 34.2796 28.7863 34.2796 27.9094 33.9872C27.2007 33.7569 26.625 33.0749 26.3858 32.1625L26.0138 30.7719C25.1546 27.5477 24.7117 24.1551 24.7029 20.7272C24.7029 19.3985 25.4115 18.2559 26.3947 17.9547C28.2637 17.3789 30.2124 17.3789 32.0814 17.9547C33.0646 18.2559 33.7821 19.3985 33.7732 20.7272C33.7732 24.1463 33.3215 27.5388 32.4623 30.7719H32.48Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
};

export const Body1 = styled.p`
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
    line-height: 120%;
  }
`;

export const Body2 = styled.span`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const curveTop = `url('data:image/svg+xml,<svg width="1280" height="40" viewBox="0 0 1280 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1280 3.0001L1280 0L-3.49691e-06 0.000111901L-3.23464e-06 3.00011C526.011 70.0106 1072.51 30.9212 1280 3.0001Z" fill="white"/></svg>')`;

const curveBottom = `url('data:image/svg+xml,<svg width="1280" height="40" viewBox="0 0 1280 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 36.9999V40H1280V37C753.989 -30.0105 207.495 9.07887 0 36.9999Z" fill="white"/></svg>')`;

export const CurvedContainer = styled("div")`
  background-image: ${curveTop}, ${curveBottom};
  background-color: #8047ff;
  background-position: center calc(0% - 3px), center calc(100% + 3px);
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  padding-block: 200px;
  .secondary-cta {
    display: none;
    ${mediaQueriesMax[0]} {
      display: block;
      margin: auto;
    }
  }
`;

export const BlackButton = styled(Button)`
  background-color: #2c2a50;
  &:hover {
    background-color: #1a192d;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #fff;
`;

export const LinkButton = styled(Button)`
  background-color: #6835d6;
  &:hover {
    background-color: #462699;
  }
`;

export const BlackButtonLink = styled(Button)`
  span {
    color: #2c2a50;
    text-decoration: underline;
  }
  &:hover span {
    color: #1a192d;
    text-decoration: none;
  }
`;

export const PlayIcon = () => {
  return (
    <svg width="88" height="99" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M85.173 42.6553C64.49 23.6648 40.9915 9.51163 15.9169 0.956399C10.5691 -0.860267 5.06191 3.15342 4.01713 9.65961C-0.250503 35.8745 -0.250503 62.8287 4.01713 89.0436C5.07962 95.5498 10.5868 99.5845 15.9169 97.7467C41.0092 89.1703 64.5077 75.0172 85.173 56.0479C88.8563 52.668 88.8563 46.0352 85.173 42.6553Z"
        fill="white"
      />
    </svg>
  );
};

interface UnderlineProps {
  backgroundImageUrl: string;
}

export const Underline = styled("span")<UnderlineProps>`
  position: relative;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    background-image: url("data:image/png;base64,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")
    width: 100%;
    height: 15%;
    background-repeat: no-repeat;
    background-size: 100%;
  }
`;

export const Carret = () => {
  return (
    <div css={{ position: "relative" }} className="carret">
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.51476 1.39344L13.0607 10.9394C13.6465 11.5252 13.6465 12.4749 13.0607 13.0607L3.51476 22.6066C2.92898 23.1924 1.97923 23.1924 1.39344 22.6066C0.807657 22.0209 0.807657 21.0711 1.39344 20.4853L9.87872 12L1.39344 3.51476C0.807655 2.92898 0.807655 1.97923 1.39344 1.39344C1.97923 0.807655 2.92898 0.807655 3.51476 1.39344Z"
          fill="#8047FF"
        />
      </svg>
    </div>
  );
};

export const NavButtons = styled.button`
  width: 50px;
  height: 50px;
  border: solid 1px #8047ff;
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.1) inset;
  filter: drop-shadow(0px 3px 3px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1px 0px #ebebeb);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  cursor: pointer;
  svg {
    fill: #8047ff;
  }
  &:disabled {
    border: solid 1px #d3d7ec;
    svg {
      fill: #d3d7ec;
    }
  }
`;
