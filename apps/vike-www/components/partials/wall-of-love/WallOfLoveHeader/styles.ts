import { theme, BodyText } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";

export const {
  colors: { dt_white, dt_taro90, dt_taro50 },
} = theme;

export const HeaderSectionContainer = styled.section<{ bgImage: string; accentBGColor?: string }>`
  ${(props) => `
    position: relative;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1307 66' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.541016 5.27241C533.214 70.0075 818.665 -19.705 1306.48 5.27241V65.9999H0.541016V5.27241Z' fill='${encodeURIComponent(
      props.accentBGColor,
    )}'/%3E%3C/svg%3E"), linear-gradient(to right, rgba(0,0,0,0.15),rgba(0,0,0,0.15)), url("${props.bgImage}");
    background-size: 102% auto, cover, cover;
    background-repeat: no-repeat;
    background-position: center bottom, center, center;
    `}
`;

export const CTAContent = styled.div`
  width: 100%;
  min-height: 209px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries[0]} {
    min-height: 450px;
    padding-bottom: 66px;
  }
`;

export const HeaderContent = styled.div`
  text-align: center;
  width: 76%;
  display: none;
  ${mediaQueries[0]} {
    display: block;
  }
`;

export const HeaderSectionMobile = styled.div<{ accentBGColor?: string }>`
  padding-top: 8px;
  background-color: ${(props) => props.accentBGColor};
  ${mediaQueries[0]} {
    display: none;
  }
`;

export const HeaderContentMobile = styled.div``;

export const CTATitle = styled.h2<{ home_variation?: boolean }>`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.35px;
  color: ${dt_taro90};
  ${mediaQueries[0]} {
    margin-top: 0px;
    color: ${dt_white};
    font-weight: 800;
    font-size: 50px;
    font-size: 72px;
    line-height: 100%;
    text-align: center;
    letter-spacing: -0.5px;
  }
`;

export const HeaderSubtitle = styled(BodyText)`
  color: ${dt_taro50};
  font-size: 18px;
  line-height: 135%;
  text-align: center;
  letter-spacing: -0.25px;
  margin-top: 12px;
  ${mediaQueries[0]} {
    width: 90%;
    color: ${dt_white};
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }
`;
