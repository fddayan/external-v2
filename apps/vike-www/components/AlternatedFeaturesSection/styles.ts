import { theme } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { mobileAccents, deskAccents } from "@src/assets/images/index/home22-accents";

const {
  colors: { dt_taro50, dt_taro90 },
} = theme;

export const FeatureSection = styled.section<{ homeVariation?: boolean }>`
  width: 100%;
  margin: auto;
  padding: 54px 0 0 0;
  margin-top: ${(props) => (props.homeVariation ? "0px" : "200px")};

  ${mediaQueries[0]} {
    width: 750px;
    padding: ${(props) => (props.homeVariation ? "24px" : "108px")} 15px 0px;
    margin-top: 0;
  }

  ${mediaQueries[1]} {
    width: 970px;
  }

  ${mediaQueries[2]} {
    width: 1170px;
  }
`;

export const FeatureTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;

  ${mediaQueries[0]} {
    padding: 0;
    max-width: 680px;
    margin: 0 auto;
  }
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -1px;
  text-align: center;
  color: ${dt_taro90};
  margin: 0;
  max-width: 260px;

  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 50px;
    line-height: 100%;
    text-align: center;
    letter-spacing: -0.5px;
    max-width: unset;
  }
`;

export const FeatureHeading = styled.p`
  font-weight: 800;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  color: ${dt_taro50};
  margin: 0;

  ${mediaQueries[0]} {
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.25px;
    max-width: 540px;
  }
`;

export const FeaturesWrapper = styled.div<{ homeVariation?: boolean }>`
  ${mediaQueries[0]} {
    padding-top: ${(props) => (props.homeVariation ? "0px" : "108px")};
  }
`;

export const FeaturePairBlock = styled.div<{ invert_desktop_order: boolean; textOnTop: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
  grid-template-areas: ${(props) => (props.textOnTop ? '"text" "img"' : '"img" "text"')};

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    grid-template-areas: ${(props) => (props.invert_desktop_order ? "'img text'" : "'text img'")};
    padding-bottom: 128px;

    &:nth-of-type(even) {
      grid-template-areas: ${(props) => (props.invert_desktop_order ? "'text img'" : "'img text'")};
    }
  }

  &.home-variation {
    position: relative;
    overflow: visible;
    margin-bottom: 54px;

    &:before {
      content: "";
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
      display: block;
      height: 100%;

      left: 50%;
      width: 100vw;
      top: -64px;
      transform: translateX(-50%);
      z-index: -1;
    }

    &:nth-of-type(1):before {
      background-image: url("${mobileAccents.accent1}");
      top: calc(calc(-0.2105 * 100vw) + 69.0526px);
    }
    &:nth-of-type(2):before {
      background-image: url("${mobileAccents.accent2}");
      top: -26vw;
    }
    &:nth-of-type(3):before {
      background-image: url("${mobileAccents.accent3}");
      top: -50vw;
    }
    &:nth-of-type(4):before {
      background-image: url("${mobileAccents.accent4}");
      top: -33vw;
    }
    &:nth-of-type(5):before {
      background-image: url("${mobileAccents.accent5}");
      top: -15vw;
    }

    ${mediaQueries[0]} {
      margin-bottom: 0;

      &:before {
        transform: none;
      }

      &:nth-of-type(1):before {
        background-image: url("${deskAccents.accent1}");
        left: 15%;
        width: 48%;
        top: calc(100% - 142px);
        transform: rotate(10deg);
      }
      &:nth-of-type(2):before {
        background-image: url("${deskAccents.accent2}");
        left: 18%;
        width: 56%;
        top: calc(100% - 199px);
      }
      &:nth-of-type(3):before {
        background-image: url("${deskAccents.accent3}");
        left: 17%;
        width: 53%;
        top: calc(100% - 196px);
      }
      &:nth-of-type(4):before {
        background-image: url("${deskAccents.accent4}");
        left: 17%;
        width: 62%;
        top: calc(100% - 142px);
      }
      &:nth-of-type(5):before {
        content: none;
      }
    }
    ${mediaQueries[1]} {
      &:nth-of-type(1):before {
        left: 27%;
        width: 39%;
        top: calc(100% - 140px);
        transform: rotate(0deg);
      }
      &:nth-of-type(2):before {
        left: 24%;
        width: 48%;
        top: calc(100% - 248px);
      }
      &:nth-of-type(3):before {
        left: 23%;
        width: 43%;
        top: calc(100% - 243px);
      }
      &:nth-of-type(4):before {
        left: 17%;
        width: 55%;
        top: calc(100% - 165px);
      }
    }
  }
`;

export const FeatureTextBlock = styled.div`
  width: 100%;
  padding: 0 15px;
  text-align: center;
  margin-bottom: 54px;
  margin-top: 30px;
  grid-area: text;

  ${mediaQueries[0]} {
    text-align: left;
    margin-bottom: 0;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FeatureImgBlock = styled.div`
  grid-area: img;

  ${mediaQueries[0]} {
    width: 100%;
    margin-left: unset;
    transform: unset;
  }
`;

export const FeatureTextContent = styled.div`
  ${mediaQueries[0]} {
    max-width: 360px;
  }
`;
export const FeatureIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const HighlightText = styled.span<{ bgImage: string }>`
  white-space: nowrap;
  position: relative;

  &:after {
    content: " ";
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("${(props) => props.bgImage}");
    display: block;
    height: 14px;
    position: absolute;
    bottom: 0px;
    left: 3px;
    width: 160px;
    height: 46px;

    ${mediaQueries[0]} {
      bottom: -5px;
      left: 6px;
      width: 275px;
      height: 82px;
    }
  }
`;

export const FeatureImage = styled.img`
  border-radius: 0px;
  &.home-variation {
    width: 90%;
    display: block;
    margin: auto;
  }
  ${mediaQueries[0]} {
    border-radius: 24px;
  }
`;

export const RoundedIcon = styled.div<{ color: string }>`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) => theme.colors[props.color]};
  margin: auto;
  margin-bottom: 12px;

  span {
    height: 36px;
  }

  ${mediaQueries[0]} {
    margin-left: -12px;
    margin-right: unset;
  }
`;
