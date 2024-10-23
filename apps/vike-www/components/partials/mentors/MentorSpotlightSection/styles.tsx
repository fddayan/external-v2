import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  borders: { dt_border_card },
  colors: { dt_taro10, dt_taro20, dt_taro50, dt_white },
  radii: { dt_radius_m },
} = theme;

export const MentorSpotlightSectionContainer = styled.section<{ isBGWhite?: boolean; isMentor?: boolean }>`
  width: 100%;
  padding: 48px 0;
  padding: ${(props) => (props.isMentor ? "172px 0 48px" : "48px 0")};
  background-color: ${(props) => (props.isBGWhite ? dt_white : dt_taro10)};

  .carousel__dot-group {
    width: fit-content;
    margin: auto;
  }

  .carousel__dot {
    background-color: ${dt_taro20};
    width: 16px;
    height: 16px;
    border-radius: 8px;
    margin: 0 6px;
    border: none;
    box-shadow: none;
  }

  .carousel__dot--selected {
    background-color: ${dt_taro50};
  }

  ${mediaQueries[2]} {
    padding: 96px 0;
  }
`;

export const MentorSpotlightHeader = styled.div`
  width: 100%;
  max-width: 475px;
  text-align: center;
  margin: auto;
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  margin: auto;

  @media (min-width: 375px) {
    width: 340px;
  }
  ${mediaQueries[0]} {
    width: 710px;
  }
  ${mediaQueries[2]} {
    width: 1050px;
  }
`;

export const SpotlightCard = styled.div`
  padding: 24px;
  border: ${dt_border_card};
  border-radius: ${dt_radius_m};
  background-color: ${dt_taro10};
  width: calc(100% - 24px);
  max-width: 316px;
  margin: 36px auto;
  display: flex;
  flex-direction: column;

  ${mediaQueries[0]} {
    flex-direction: row;
    max-width: 686px;
  }

  ${mediaQueries[2]} {
    max-width: 1026px;
  }
`;

export const SpotlightAvatar = styled.img`
  border-radius: ${dt_radius_m};
  width: 100%;
  object-fit: cover;

  ${mediaQueries[0]} {
    width: calc(50% - 12px);
    margin-right: 24px;
  }
`;

export const SpotlightContent = styled.div`
  position: relative;
`;

export const SpotlightTextContent = styled.div`
  ${mediaQueries[0]} {
    margin-top: 48px;
  }
`;

export const MentorCard = styled.div`
  padding: 24px;
  background-color: ${dt_white};
  border: ${dt_border_card};
  border-radius: ${dt_radius_m};
  max-width: 340px;
  height: 560px;
  margin: 0 12px;
`;

export const MentorAvatar = styled.img`
  border-radius: ${dt_radius_m};
  width: 100%;
  height: 245px;
  object-fit: cover;
`;

export const MentorTextWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const SchoolTextWrapper = styled.div`
  border-bottom: ${dt_border_card};
  padding-bottom: 18px;
`;

export const MentorSpotlightModalContainer = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  overflow: auto;
  background-color: rgba(44, 42, 80, 0.9);
  padding: 36px 0;

  ${mediaQueries[0]} {
    display: flex;
    align-items: center;
  }
`;

export const CloseButtonWrapper = styled.div`
  width: fit-content;
  margin: 24px auto 0;

  ${mediaQueries[0]} {
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const ReadMoreButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
