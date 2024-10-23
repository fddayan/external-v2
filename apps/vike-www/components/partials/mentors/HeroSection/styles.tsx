import styled from "@emotion/styled";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";
import { theme, Button, Heading } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { GatsbyImage } from "gatsby-plugin-image";

export const Spacer = styled.div`
  width: 100%;
  height: 80vh;
`;

export const HeroSectionContainer = styled.section`
  width: 100%;
  padding-top: 48px;
  padding-bottom: 48px;
  overflow: clip;

  ${mediaQueries[2]} {
    padding-bottom: 172px;
  }
`;

export const HeroSectionFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;

export const HeroSectionFlexChild = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 24px 0;

  ${mediaQueries[1]} {
    width: 50%;
  }
`;

export const HeroText = styled(Heading)`
  color: ${theme.colors.taro50};
  font-weight: 700;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mediaQueries[0]} {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const FormButton = styled.button`
  color: ${theme.colors.dt_white};
  background-color: ${theme.colors.dt_mango60};
  box-shadow: inset 0 -4px 0 ${theme.colors.dt_tangerine50};
  border: 0;
  border-radius: 999px;
  padding: 19px 24px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  position: relative;
  cursor: pointer;
  &:before {
    content: " ";
    position: absolute;
    display: block;
    width: 180px;
    height: 100px;
    top: -20px;
    left: -15px;
    background-image: url(https://static.classdojo.com/img/page_mentors/button-stars.svg);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &:after {
    content: " ";
    position: absolute;
    display: block;
    width: 25px;
    height: 25px;
    top: 5px;
    left: 5px;
    background-image: url(https://static.classdojo.com/img/page_mentors/button-reflection.svg);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &:hover {
    background-color: ${theme.colors.dt_tangerine50};
  }
`;

export const BlobContainer = styled.div<{ bgImage: string }>`
  width: 100%;
  margin: auto;
  aspect-ratio: 3 / 2;
  background: url("${(props) => props.bgImage}") center / contain no-repeat;
  position: relative;
  transform: scale(0.8);
  transform-origin: top center;

  ${mediaQueries[2]} {
    transform: scale(1);
  }
`;

export const VideoThumbWrapper = styled("div")`
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -42%);
  cursor: pointer;
`;

export const VideoThumb = styled(GatsbyImageWrapper)`
  background-color: ${theme.colors.dt_white};
  border-radius: 18px;
  border: 12px solid ${theme.colors.dt_white};
  outline: 2px solid ${theme.colors.dt_taro30};
`;

export const MojosFriendPic = styled.div<{ animatePhotos: boolean; bgImage: string }>`
  @keyframes animateFriendPhoto {
    0% {
      top: 0px;
      right: 0px;
    }
    22% {
      top: 0px;
      right: 0px;
    }
    90% {
      top: -28%;
      right: -18%;
    }
    100% {
      top: -28%;
      right: -18%;
    }
  }
  position: absolute;
  top: -70px;
  right: -140px;
  background: url("${(props) => props.bgImage}") center / contain no-repeat;
  animation: ${(props) => (props.animatePhotos ? "animateFriendPhoto 2s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  width: 65%;
  height: 91%;
`;

export const MojoPic = styled.div<{ animatePhotos: boolean; bgImage: string }>`
  @keyframes animatePhoto {
    0% {
      bottom: 0px;
      left: 0px;
    }
    100% {
      bottom: -35%;
      left: -16%;
    }
  }

  position: absolute;
  bottom: -82px;
  left: -60px;
  background: url("${(props) => props.bgImage}") center / contain no-repeat;
  animation: ${(props) => (props.animatePhotos ? "animatePhoto 2s cubic-bezier(0.85, 0, 0.15, 1)" : null)};
  animation-fill-mode: forwards;
  width: 55%;
  height: 60%;
`;

export const PhotoStack = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  transform: rotate(-5deg) translateX(-2%);
`;

export const PlayButton = styled(Button)`
  position: absolute;
  bottom: 20%;
  right: 15%;
`;
