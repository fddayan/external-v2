import React, { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import * as S from "./styles";
import "../transitions.css";
import AppReviewCard, { AppReviewCardProps } from "./AppReviewCard";
import TweetCard, { TweetCardProps } from "./TweetCard";
import BrandedImage, { BrandedImageProps } from "./BrandedImage";
import BrandedVideo, { BrandedVideoProps } from "./BrandedVideo";

// const PlayButton = () => (
//   <svg width="44" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M0.634766 20C0.634766 8.96 10.3271 0 22.2694 0C34.2117 0 43.904 8.96 43.904 20C43.904 31.04 34.2117 40 22.2694 40C10.3271 40 0.634766 31.04 0.634766 20ZM17.9414 12.9996V26.9996C17.9414 27.8196 18.9582 28.2996 19.6722 27.7996L29.7755 20.7996C30.3597 20.3997 30.3597 19.5996 29.7755 19.1996L19.6722 12.1996C18.9582 11.6996 17.9414 12.1796 17.9414 12.9996Z"
//       fill="white"
//     />
//   </svg>
// );

interface SocialCardProps {
  type: "app-review" | "tweet" | "image" | "video";
  data: AppReviewCardProps | TweetCardProps | BrandedImageProps | BrandedVideoProps;
}

const SocialCard: React.FC<SocialCardProps> = ({ type, data }) => {
  const review_stars_string = [];
  // const videoRef = useRef(null);
  const nodeRef = useRef(null);
  const [cardEntered, setCardEntered] = useState(false);

  useEffect(() => {
    setCardEntered(true);
  });

  return (
    <CSSTransition nodeRef={nodeRef} in={cardEntered} timeout={300} classNames="wall-of-love-card" unmountOnExit>
      <S.Card className={type} cardType={type} ref={nodeRef}>
        {type === "app-review" && <AppReviewCard {...(data as AppReviewCardProps)} />}
        {type === "tweet" && <TweetCard {...(data as TweetCardProps)} />}
        {type === "image" && <BrandedImage {...(data as BrandedImageProps)} />}
        {type === "video" && <BrandedVideo {...(data as BrandedVideoProps)} />}
        {/* {type === "branded-moment-statement" && ( */}
        {/*   <> */}
        {/*     {media && media_type === "image" && <S.BrandedMomentImage src={media} alt={content} />} */}
        {/*     <S.BrandedMomentContent>{content}</S.BrandedMomentContent> */}
        {/*   </> */}
        {/* )} */}
        {/* {type === "media" && media && media_type === "image" && <S.MediaCardImage src={media} alt={content} />} */}
        {/* {["media", "tweet-with-video"].includes(type) && media_type === "video" && ( */}
        {/*   <> */}
        {/*     <S.VideoOverlay onClick={handlePlayVideo} cardType={type}> */}
        {/*       <PlayButton /> */}
        {/*       {type === "tweet-with-video" && ( */}
        {/*         <S.TweetWithVideoOverlay> */}
        {/*           <S.TwitterName color={"white"}>{name}</S.TwitterName> */}
        {/*           <S.TweetWithVideoSubtitle>{content}</S.TweetWithVideoSubtitle> */}
        {/*         </S.TweetWithVideoOverlay> */}
        {/*       )} */}
        {/*     </S.VideoOverlay> */}
        {/*     <S.MediaCardVideo ref={videoRef} poster={thumbnail}> */}
        {/*       <source src={media} type="video/mp4" /> */}
        {/*     </S.MediaCardVideo> */}
        {/*   </> */}
        {/* )} */}
        {/* {type === "branded-moment-illustration" && ( */}
        {/*   <>{media_type === "image" && <S.MediaCardImage src={media} alt={content} />}</> */}
        {/* )} */}
      </S.Card>
    </CSSTransition>
  );
};

export default SocialCard;
