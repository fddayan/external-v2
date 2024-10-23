import React from "react";
import Lottie from "lottie-react";

export interface BrandedVideoProps {
  animationData: JSON;
}
const BrandedVideo: React.FC<BrandedVideoProps> = (props) => {
  return <Lottie {...props} />;
};

export default BrandedVideo;
