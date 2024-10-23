import { theme } from "@classdojo/web/nessie";
import xmasAnimatedBackground from "@src/assets/images/ecards/xmas.svg";
import xmasStaticBackground from "@src/assets/images/ecards/xmas-static.svg";
import xmasThumbBackground from "@src/assets/images/ecards/xmas-thumb.png";
import blobStaticBackground from "@src/assets/images/ecards/blobs-background.svg";
import animatedBlobBackground from "@src/assets/images/ecards/blobs-background-animated.svg";
import fallThumb from "@src/assets/images/ecards/fallthumb.png";
import fallBackground from "@src/assets/images/ecards/fallbg.svg";
import fallStatic from "@src/assets/images/ecards/fall-static.svg";

const cardBackgrounds = [
  { thumb: fallThumb, static: fallStatic, animated: fallBackground },
  { thumb: xmasThumbBackground, static: xmasStaticBackground, animated: xmasAnimatedBackground },
  { thumb: blobStaticBackground, static: blobStaticBackground, animated: animatedBlobBackground },
  [theme.colors.aqua60, theme.colors.grape50],
  [theme.colors.tangerine50, theme.colors.watermelon60],
];

const backgroundToCssValue = (bg, type) => {
  if (Array.isArray(bg)) return `linear-gradient(165deg, ${bg[0]}, ${bg[1]})`;
  return `url(${bg[type]})`;
};

const getBackgrounds = (type = "static") => {
  return cardBackgrounds.map((bg) => backgroundToCssValue(bg, type));
};

const getSelectedBackground = (index, type = "animated") => {
  return backgroundToCssValue(cardBackgrounds[index], type);
};

export { getBackgrounds, getSelectedBackground };
