import React, { useState, useEffect } from "react";
import Container from "@src/components/Container";
import * as S from "./styles";
import "../transitions.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SocialCard from "@src/components/partials/wall-of-love/SocialCard";
import { TweetCardProps } from "../SocialCard/TweetCard";
import { BrandedImageProps } from "../SocialCard/BrandedImage";
import { BrandedVideoProps } from "../SocialCard/BrandedVideo";
import { AppReviewCardProps } from "../SocialCard/AppReviewCard";
import { Button } from "@src/components/nessie-web";

// for (let i = 0; i < dummyData.length; i++) {
//   wallOfLoveCards.push(dummyData[i]);
// }

// function handleWallOfLoveSectionChange(section: string) {
//   let tempCards = [];
//   switch (section) {
//     case "parent":
//       setWallOfLoveSection("parent");
//       tempCards = wallOfLoveCards.reverse();
//       setwallOfLoveCards(tempCards);
//       break;
//     case "teacher":
//       setWallOfLoveSection("teacher");
//       tempCards = wallOfLoveCards;
//       setwallOfLoveCards(tempCards);
//       break;
//   }
// }

interface WallOfLoveGridProps {
  gridData: {
    twitter: { type: "tweet"; data: TweetCardProps }[];
    image: { type: "image"; data: BrandedImageProps }[];
    video: { type: "video"; data: BrandedVideoProps }[];
    reviews: { type: "app-review"; data: AppReviewCardProps }[];
  };
}

const WallOfLoveGrid: React.FC<WallOfLoveGridProps> = ({ gridData }) => {
  const [wallOfLoveCards, setwallOfLoveCards] = useState([]);
  const [wallOfLovePage, setWallOfLovePage] = useState(1);
  // const [wallOfLoveSection, setWallOfLoveSection] = useState("teacher");

  const masonryStep = 10;
  const showLoadMoreButton = wallOfLovePage * masonryStep < wallOfLoveCards.length;

  function addMoreCards() {
    setWallOfLovePage(wallOfLovePage + 1);
  }

  useEffect(() => {
    const wolData = [];

    // We're assuming here that twitter will alwys be the largest array
    gridData.twitter.forEach((tweet: any, i: number) => {
      wolData.push(tweet);
      const altIndex = Math.floor(i / 8);
      if ((i + 5) % 8 === 0 && gridData.image[altIndex]) wolData.push(gridData.image[Math.floor(altIndex)]);
      if ((i + 4) % 8 === 0 && gridData.reviews[altIndex]) wolData.push(gridData.reviews[Math.floor(altIndex)]);
      if ((i + 2) % 8 === 0 && gridData.video[altIndex]) wolData.push(gridData.video[Math.floor(altIndex)]);
    });

    setwallOfLoveCards(wolData);
  }, []);

  return (
    <S.WallOfLoveBackground>
      <Container>
        {/* <S.ControlSection> */}
        {/*   <Button */}
        {/*     onClick={() => handleWallOfLoveSectionChange("parent")} */}
        {/*     kind={wallOfLoveSection === "parent" ? "primary" : "secondary"} */}
        {/*   > */}
        {/*     Parent */}
        {/*   </Button> */}
        {/*   <Button */}
        {/*     onClick={() => handleWallOfLoveSectionChange("teacher")} */}
        {/*     kind={wallOfLoveSection === "teacher" ? "primary" : "secondary"} */}
        {/*   > */}
        {/*     Teacher */}
        {/*   </Button> */}
        {/* </S.ControlSection> */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 768: 1, 992: 3 }}>
          <Masonry gutter="12px">
            {wallOfLoveCards.slice(0, masonryStep * wallOfLovePage).map((card, cardIndex) => (
              <SocialCard {...card} key={"card" + cardIndex} cardIndex={"card" + cardIndex} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
        {showLoadMoreButton && (
          <S.ButtonContainer>
            <Button kind="primary" onClick={addMoreCards}>
              Load more
            </Button>
          </S.ButtonContainer>
        )}
      </Container>
    </S.WallOfLoveBackground>
  );
};
export default WallOfLoveGrid;
