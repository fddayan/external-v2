import { Action, BodyText, Subheading, theme } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

const {
  space: { xs, s, m, l, xl },
  colors: { dt_taro40, dt_taro90, dt_white },
  radii: { dt_radius_m, dt_radius_s },
  shadows: { dt_shadow_shadezies },
} = theme;

export const Card = styled.div<{ cardType: string }>`
  position: relative;
  border-radius: ${dt_radius_m};
  background-color: ${dt_white};
  box-shadow: ${dt_shadow_shadezies};
  padding: ${(props) => (props.cardType === "image" ? 0 : "24px 30px")};
  position: relative;
  overflow: hidden;
  background-image: ${(props) =>
    props.cardType.includes("tweet")
      ? `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.533 7.11175C21.5482 7.32494 21.5482 7.53817 21.5482 7.75136C21.5482 14.2539 16.599 21.7463 7.5533 21.7463C4.76648 21.7463 2.17767 20.9391 0 19.5382C0.395953 19.5838 0.776625 19.5991 1.18781 19.5991C3.48727 19.5991 5.60405 18.8224 7.29441 17.4976C5.13197 17.4519 3.31978 16.0356 2.69541 14.0864C3 14.132 3.30455 14.1625 3.62437 14.1625C4.06598 14.1625 4.50764 14.1016 4.91878 13.995C2.66498 13.5381 0.974578 11.5585 0.974578 9.16759V9.1067C1.62937 9.47219 2.39086 9.70061 3.19791 9.73103C1.87303 8.84777 1.00505 7.34017 1.00505 5.63458C1.00505 4.72089 1.24866 3.88333 1.67508 3.15236C4.09641 6.13712 7.73602 8.08633 11.8172 8.29956C11.7411 7.93408 11.6954 7.55341 11.6954 7.17269C11.6954 4.462 13.8883 2.25391 16.6141 2.25391C18.0304 2.25391 19.3095 2.84781 20.208 3.8072C21.3197 3.59402 22.3857 3.18283 23.3299 2.61939C22.9643 3.76155 22.1877 4.72094 21.1674 5.33003C22.1573 5.22348 23.1167 4.94931 23.9999 4.56864C23.33 5.54322 22.4924 6.4112 21.533 7.11175V7.11175Z' fill='%2300B2F7'/%3E%3C/svg%3E%0A")`
      : "none"};
  background-repeat: no-repeat;
  background-position: calc(100% - 20px) 30px;
  ${mediaQueries[1]} {
    width: 100%;
  }

  &.branded-moment-statement {
    text-align: center;
  }
  &.media,
  &.tweet-with-video {
    padding: 0;
    height: 260px;
  }
  &.branded-moment-illustration {
    height: 375px;
  }
`;

// Card transition states
export const visibleStyles = {
  opacity: 1,
  maxHeight: "30px",
};

export const hiddenStyles = {
  opacity: 0,
  maxHeight: "0px",
};

// App Review specific styles
export const AppReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  align-items: center;
  & h3 {
    flex-grow: 1;
  }
  & h4 {
    width: 30%;
    text-align: right;
  }
`;

export const AppReviewTitle = styled.h3`
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: ${dt_taro90};
`;

// Tweet specific styles
export const TweetHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileDetails = styled.div`
  padding-left: 12px;
`;

export const ProfilePhoto = styled.img`
  width: 66px;
  height: 66px;
  border-radius: 50%;
`;

export const TwitterName = styled(Subheading)``;

export const TweetImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${dt_radius_s};
  overflow: hidden;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: ${m}px;
`;

export const Name = styled(Action)``;

Name.defaultProps = {
  compact: true,
  kind: "inactive",
};

export const DateElement = styled(Name)`
  fill: ${dt_taro40};
`;

export const Content = styled(BodyText)`
  margin: ${l}px 0;
`;

export const Handle = styled(Action)`
  margin-top: ${xs}px;
`;

Handle.defaultProps = Name.defaultProps;

// Branded Moment Statement styles
export const BrandedMomentImage = styled.img`
  max-height: 60px;
  width: auto;
  margin-bottom: 10px;
`;

export const BrandedMomentContent = styled.div`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${dt_taro90};
`;

// Media cards
export const MediaCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MediaCardVideo = styled.video`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

MediaCardVideo.defaultProps = {
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
};

export const VideoOverlay = styled.div<{ cardType: string }>`
  background-image: ${(props) =>
    props.cardType.includes("tweet")
      ? `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.533 7.11175C21.5482 7.32494 21.5482 7.53817 21.5482 7.75136C21.5482 14.2539 16.599 21.7463 7.5533 21.7463C4.76648 21.7463 2.17767 20.9391 0 19.5382C0.395953 19.5838 0.776625 19.5991 1.18781 19.5991C3.48727 19.5991 5.60405 18.8224 7.29441 17.4976C5.13197 17.4519 3.31978 16.0356 2.69541 14.0864C3 14.132 3.30455 14.1625 3.62437 14.1625C4.06598 14.1625 4.50764 14.1016 4.91878 13.995C2.66498 13.5381 0.974578 11.5585 0.974578 9.16759V9.1067C1.62937 9.47219 2.39086 9.70061 3.19791 9.73103C1.87303 8.84777 1.00505 7.34017 1.00505 5.63458C1.00505 4.72089 1.24866 3.88333 1.67508 3.15236C4.09641 6.13712 7.73602 8.08633 11.8172 8.29956C11.7411 7.93408 11.6954 7.55341 11.6954 7.17269C11.6954 4.462 13.8883 2.25391 16.6141 2.25391C18.0304 2.25391 19.3095 2.84781 20.208 3.8072C21.3197 3.59402 22.3857 3.18283 23.3299 2.61939C22.9643 3.76155 22.1877 4.72094 21.1674 5.33003C22.1573 5.22348 23.1167 4.94931 23.9999 4.56864C23.33 5.54322 22.4924 6.4112 21.533 7.11175V7.11175Z' fill='%23FFF'/%3E%3C/svg%3E%0A")`
      : "none"};
  background-repeat: no-repeat;
  background-position: calc(100% - 20px) 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  svg {
    position: absolute;
    bottom: 21px;
    left: 21px;
  }
`;
export const TweetWithVideoOverlay = styled.div`
  padding-left: 60px;
  padding-right: 21px;
  padding-bottom: 21px;
  text-align: right;
  h4 {
    color: #fff;
  }
`;

export const TweetWithVideoSubtitle = styled.p`
  color: ${dt_white};
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-align: right;
  margin: 0px;
`;
