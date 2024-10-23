import { IoIosStar } from "react-icons/io";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";
export const IoIosStarStyled = styled(IoIosStar)`
  color: #fa8e00;
  position: relative;
  width: 16px;
  margin-right: 4px;
  top: 1px;
  display: inline-block;
  line-height: 1;
`;
export const HeroHeader = styled("h1")`
  margin: 0 0 7px;
  font-size: 26px;
  line-height: 42px;
  text-align: center;
  ${mediaQueries[0]} {
    text-align: left;
    font-size: 52px;
    line-height: 52px;
  }
  font-weight: 800;
  color: #363636;
`;
export const HeroImg = styled(GatsbyImageWrapper)`
  left: 19px;
  margin-right: 0;
  position: absolute !important;
  top: 57px;
  width: 100%;
  max-width: 420px;
  ${mediaQueries[0]} {
    max-width: 459px;
  }
`;
const HeroNewsletterXsImg = styled(GatsbyImageWrapper)`
  display: inline-block !important;
  width: 47%;
  max-width: 168px;
`;
const ReminderNewsletterXsImg = styled(GatsbyImageWrapper)`
  margin-left: 3%;
  display: inline-block !important;
  width: 47%;
  max-width: 168px;
`;
const VolcanoXsImg = styled(GatsbyImageWrapper)`
  width: 100%;
  transform: translate3d(-50px, 150px, 0) rotate(5deg) scale(0.75);
`;
export const PhoneSectionHeader = styled("h2")`
  font-size: 22px;
  font-weight: 800;
  line-height: 31px;
  margin-bottom: 11px;
  margin-top: 22px;
`;
export const StorySectionImg = styled(GatsbyImageWrapper)`
  max-width: 570px;
  width: 100%;
`;
export const BlockQuote = styled("blockquote")`
  padding: 11px 22px;
  margin: 20px 0 0 0;
  ${mediaQueries[0]} {
    margin: 0 0 0 70px;
  }
  font-size: 20px;
  border-left: 0;
  border-right: 5px solid #eee;
  footer {
    color: #777 !important;
    font-size: 80%;
  }
`;
export const QuoteImg = styled(GatsbyImageWrapper)`
  border-radius: 50%;
  width: 100%;
  max-width: 150px;
  margin-left: auto;
  margin-right: auto;
  ${mediaQueries[0]} {
    max-width: unset;
  }
`;
export const PhoneXsImg = styled(GatsbyImageWrapper)`
  margin: 30px auto 60px;
  width: 100%;
  ${mediaQueries[0]} {
    width: 250px;
  }
`;
export const PhoneSection = styled("div")`
  display: none !important;
  ${mediaQueries[0]} {
    display: unset;
    position: fixed;
    top: 655px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .text-slide-container {
    ${mediaQueries[0]} {
      height: 625px;
    }
    #text-slides {
      text-align: center;
      ${mediaQueries[0]} {
        text-align: left;
        margin-top: 0;
        margin-bottom: 0;
        position: relative;
        top: 15%;
        -ms-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      h2 {
        font-size: 22px;
        line-height: 31px;
      }
      p {
        font-size: 18px;
      }
      #slide-a {
        ${mediaQueries[0]} {
          top: 0;
          position: absolute;
        }
      }
      #slide-b,
      #slide-c,
      #slide-d {
        ${mediaQueries[0]} {
          opacity: 0;
          position: absolute;
          top: 70px;
        }
      }
    }
  }
  .iphone {
    width: 410px;
    height: 708px;
    // border: 1px solid #ccc;
    position: relative;
    margin: 0 auto;
    background: url(https://static.classdojo.com/img/page_classfeed/Phone-Background.png);

    @media (min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 2) {
      background-image: url(https://static.classdojo.com/img/page_classfeed/Phone-Background@2x.png);
      background-size: 410px 708px;
    }

    .chromes {
      position: absolute;
      overflow: hidden;
      top: 88px;
      bottom: 101px;
      left: 56px;
      right: 61px;
      z-index: 55;
    }
    .header-chrome {
      position: absolute;
      top: -1px;
      left: -1px;
    }
    #header-nav-b {
      // opacity: 0;
      left: 293px;
    }
    .footer-nav-container {
      overflow: hidden;
      position: absolute;
      left: 56px;
      bottom: 95px;
      z-index: 99;
    }
    .sliding-menu {
      position: absolute;
      top: 143px;
      bottom: 101px;
      left: 56px;
      right: 61px;
      z-index: 99;
      overflow: hidden;
      img {
        position: relative;
        left: 293px;
      }
    }
    #phone-window {
      position: absolute;
      top: 143px;
      bottom: 101px;
      left: 56px;
      right: 61px;
      padding: 10px;
      z-index: 88;

      #image-c {
        position: relative;
        z-index: 99;
        max-width: 100%;
        width: 100%;
        top: 60px;
        transform: scale(1);
        border-color: rgba(111, 111, 111, 0.09);
        border-width: 0;
        border-style: solid;
        // @media(min-width: @screen-sm-min) and (max-width: @screen-sm-max){
        //   left: -90px;
        //   top: -540px;
        // }
      }
      .viewport {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        padding: 5px;
        transform: scale(1);
      }
      .post {
        margin-bottom: 10px;
        background-color: #fff;
        box-shadow: 2px 2px 2px rgba(191, 191, 191, 0.3);
        padding: 6px;
        img {
          max-width: 100%;
        }
      }
      .text-container {
        padding: 15px 10px 10px 10px;
        overflow: hidden;
        p {
          margin-bottom: 0;
        }
        hr {
          margin: 15px -6px;
        }
        .likes {
          width: 50%;
          float: left;
          color: #a7a7a7;
          .glyphicon {
            margin-right: 5px;
            top: 2px;
          }
        }
        .count {
          width: 50%;
          float: left;
          text-align: right;
          color: #a7a7a7;
        }
      }
      .text-post-wrapper {
        // display: none;
        position: relative;
        overflow: hidden;
        .text-post {
          margin-top: -212px;
          position: relative;
          #animating-heart {
            top: 54px;
            left: 0;
            right: 0;
            position: absolute;
            text-align: center;
            .glyphicon {
              opacity: 0;
              position: relative;
              color: #f25c54;
              font-size: 54px;
            }
          }
        }
      }
      #image-post-wrapper {
        position: relative;
        #image-post {
          position: relative;
          .image-container {
            margin-top: 0;
            height: 0;
          }
        }
      }
    }
  }
`;
