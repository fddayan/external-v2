import styled from "@emotion/styled";
import { GatsbyImage } from "gatsby-plugin-image";
import { theme } from "@src/components/nessie-web";
import { Flex } from "@src/components/Boxes";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

type WrapperProps = {
  active: number;
};

export const Wrapper = styled(Flex)<WrapperProps>`
  grid-column: 1/3;
  grid-template-columns: 1fr 1fr;
  margin-left: -20px;
  margin-right: -20px;
  grid-row: ${({ active }) => (active - (active % 2)) / 2 + 2};
  ${mediaQueries[0]} {
    grid-row: ${({ active }) => (active - (active % 3)) / 3 + 2};
  }

  ${mediaQueries[0]}{
    grid-column: 1/4;
    margin-left: calc(-50vw + 360px);
    margin-right: calc(-50vw + 360px);
    padding-left: calc(50vw - 358px);
  }
  ${mediaQueries[1]}{
    margin-left: calc(-50vw + 470px);
    margin-right: calc(-50vw + 470px);
    padding-left: calc(50vw - 460px);
  }
  }
  ${mediaQueries[2]}{
    margin-left: calc(-50vw + 570px);
    margin-right: calc(-50vw + 570px);
    padding-left: calc(50vw - 570px);
  }
   `;

export const TextWrapper = styled(Flex)`
  flex-direction: column;
  flex-basis: 40%;
  align-items: flex-start;
  ${mediaQueriesMax[0]} {
    padding: 20px;
  }
`;

export const ButtonClose = styled.button`
  align-self: flex-end;
  background: transparent;
  border: 0;
  font-size: 2.5em;
  color: ${theme.colors.taro40};
  position: absolute;
  top: 12px;
  right: 12px;
  color: #959dad;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
`;

export const ButtonContent = styled(Flex)`
  display: flex !important;
  align-items: center;
`;
export const ButtonGroup = styled(Flex)`
  margin: 70px 20px 0;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00aeef;
    background-color: transparent;
    border: 1px solid #00aeef;
    padding: 10px 20px;
    margin-left: auto;

    &.left {
      margin-left: 0;
    }

    &:hover {
      color: white;
      > div.left,
      > div.right {
        background-color: white;
        &:after,
        &:before {
          background-color: white;
        }
      }
    }
  }
`;

export const FullFlex = styled(Flex)`
  min-height: 400px;
  flex-direction: column-reverse;
  position: relative;
  width: 100%;
  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

type VideoCtaProps = {
  imageUrl: string;
};

export const VideoCta = styled(Flex)<VideoCtaProps>`
  background-image: linear-gradient(90deg, white, white 15%, transparent 50%), url("${(props) => props.imageUrl}");
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  flex-basis: 60%;
  ${mediaQueriesMax[0]} {
    min-height: 300px;
  }
`;

export const PlayButton = styled.a`
  width: 80px;
  height: 80px;
  display: block;
  position: relative;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 100%;
  :before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 34.6px;
    border-color: transparent transparent transparent #fff;
    transform: translateX(6px);
    margin-left: 20px;
    margin-top: 20px;
  }
`;

export const SocialShare = styled(Flex)`
  ul {
    display: inline-flex;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin: 0 5px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
`;

export const ArrowIcon = styled("div")`
  background-color: #00aeef;
  height: 3px;
  width: 17px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;

  &:before,
  &:after {
    content: "";
    background-color: #00aeef;
    position: absolute;
    height: 3px;
    width: 12px;
  }

  &.left {
    margin-right: 10px;
    &:before {
      right: 8px;
      bottom: -3px;
      transform: rotate(45deg);
    }

    &:after {
      right: 8px;
      top: -3px;
      transform: rotate(-45deg);
    }
  }

  &.right {
    margin-left: 10px;
    &:before {
      right: -2px;
      bottom: -3px;
      transform: rotate(-45deg);
    }

    &:after {
      right: -2px;
      top: -3px;
      transform: rotate(45deg);
    }
  }
`;
export const FeaturedAvatar = styled(GatsbyImage)`
  width: 140px;
`;

export const SocialIcon = styled(GatsbyImage)`
  width: 40px;
`;
