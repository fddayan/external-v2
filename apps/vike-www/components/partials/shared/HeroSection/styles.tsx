import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import { GatsbyImage } from "gatsby-plugin-image";

export const VideoBg = styled(Box)`
  padding: 60px;
`;

export const VideoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 60px;
  text-align: left;
`;
VideoBox.defaultProps = {
  width: ["100%", "100%", 9 / 20],
};

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

type VideoMaskProps = {
  mask: any;
};

export const VideoMask = styled(Box)<VideoMaskProps>`
  mask: url(${(props) => props.mask});
  mask-repeat: no-repeat;
  mask-size: contain;
`;
VideoMask.defaultProps = { position: "relative", height: ["100%", "100%", "auto"] };

export const ImageWrapper = styled(GatsbyImage)`
  width: 100%;
`;

export const VideoImageWrapper = styled(ImageWrapper)`
  width: 100%;
`;
