import styled from "@emotion/styled";
import { theme, Button, Heading } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  radii: { dt_radius_s },
  colors: { dt_taro90, dt_taro30, dt_white, dt_mango50, dt_aqua50 },
  shadows: { dt_shadow_shadezies },
  space: { dt_l, dt_xl },
} = theme;

export const VideoSlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 0 6px;

  ${mediaQueries[1]} {
    padding: 0 10px;
  }
`;

export const CardAndButtonContainer = styled.div`
  width: 100%;
  position: relative;
  display: block;
`;

export const SignUpButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Card = styled.div<{
  disabled: boolean;
  bgSrc: string;
  isNew: boolean;
  released?: boolean;
}>`
  width: 100%;
  padding-bottom: 64.25%;
  z-index: -1;
  border-radius: ${dt_radius_s};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  ${(props) => ({
    opacity: props.disabled || props.released === false ? ".7" : "1",
    background: `url(${props.bgSrc}) center/cover no-repeat;`,
    border: `${props.isNew ? `4px solid ${dt_mango50}` : " "}`,
  })}
`;

export const CardShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 5%, rgba(135, 135, 135, 0) 60%);
`;

export const Tag = styled.div<{ released?: boolean }>`
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => (props.released ? dt_aqua50 : dt_mango50)};
  color: ${(props) => (props.released ? dt_white : dt_taro90)};
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  margin-bottom: 6px;
`;

export const VideoPlayer = styled.div`
  width: 90%;
  min-height: 340px;
  margin: -70px auto 0;
  z-index: 1;
  padding: ${dt_xl}px ${dt_l}px;
  border-radius: ${dt_radius_s};
  border: 2px solid ${dt_taro30};
  background-color: ${dt_white};
  box-shadow: ${dt_shadow_shadezies};

  ${mediaQueries[0]} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    min-height: 222px;
  }
`;

export const VideoPlayButton = styled(Button)<{ released?: boolean }>`
  position: absolute;
  bottom: 24px;
  right: 24px;
  padding: 0;

  div {
    padding: 0;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const VideoContent = styled.div`
  position: absolute;
  bottom: 0;
  max-height: 80%;
  max-width: 226px;
  margin: 0 0 24px 24px;
  overflow: hidden;
`;

export const VideoHeading = styled(Heading)`
  text-shadow: 1px 1px 2px ${dt_taro90};
`;

export const Description = styled.div`
  font-size: 15px;
  line-height: 18px;
  font-weight: 600;
  -webkit-line-clamp: 4;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: ${dt_taro30};
`;

export const DescriptionContainer = styled.div`
  line-clamp: 4;
`;

export const ActiveChevron = styled.div`
  border-top: 15px solid ${theme.colors.taro90};
  border-right: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid transparent;
  width: 0;
  margin: 0 auto;
`;
