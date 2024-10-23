import s from "@emotion/styled";
import { Heading, theme, Title } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white, dt_taro30 },
  shadows: { dt_shadow_shadezies },
} = theme;

interface ToggleButtonProps {
  active?: boolean;
}

interface StudentButtonProps {
  isGroup?: boolean;
}

interface BadgeProps {
  isSkill?: boolean;
}

export const StudentButton = s("button")<StudentButtonProps>`
  min-width: ${(props) => (props.isGroup ? "210px" : "130px")};
  background: white;
  border: none;
  border-radius: ${theme.radii.dt_radius_s};
  box-shadow: ${theme.shadows.dt_shadow_shadezies};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 18px 12px 18px;
  position: relative;
  gap: 10px;
  cursor: pointer;
  img {
    margin-top: -100px;
  }
  margin-top: 60px;
`;

export const SkillButton = s("button")`
  background: white;
  border: ${theme.borders.dt_border_card};
  border-radius: ${theme.radii.dt_radius_s};
  box-shadow: ${theme.shadows.dt_shadow_shadezies};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  position: relative;
  gap: 12px;
  cursor: pointer;
`;

export const MainWrapper = s("div")`
  background: ${theme.colors.dt_taro10};
  padding-top: 20px;
`;

export const Celebration = s.div`
  position: fixed;
  bottom: -100px;
  margin: auto;
  max-width: 700px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 30px;
  transition: bottom 0.5s;
  border-radius: 30px;
  box-shadow: ${theme.shadows.dt_shadow_shadezies};


  &.active {
    animation: slide 1.5s ease-in-out;
  }

  @keyframes slide {
    0% {
      bottom: -150px;
    }
    25% {
      bottom: 20%;
    }
    75% {
      bottom: 20%;
    }
    100% {
      bottom: -150px;
    }
  }
`;

export const Badge = s.span<BadgeProps>`
  background: ${theme.colors.dt_kiwi60};
  border-radius: 50%;
  width: ${(props) => (props.isSkill ? "18px" : "24px")};
  height: ${(props) => (props.isSkill ? "18px" : "24px")};
  position: absolute;
  right: ${(props) => (props.isSkill ? "10px" : "-12px")};
  top: ${(props) => (props.isSkill ? "10px" : "0")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Tooltip = s.div`
  position: absolute;
  transform: translateY(0px);
  background-color: lightgray;
  padding: 5px;
  border-radius: 5px;
`;

export const StyledDialog = s.dialog`
  z-index: 100;
  // height: 400px;
  padding: 30px;
  border-radius: 30px;
  border: none;
  position: fixed;
  max-width: 444px;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5); // Change this as needed
  }
`;

export const ToggleWrapper = s.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  overflow: hidden;
  background: white;
  padding: 6px;
`;

export const ToggleButton = s.div<ToggleButtonProps>`
  width: 50%;
  text-align: center;
  background-color: ${(props) => (props.active ? `${theme.colors.dt_aqua20}` : "transparent")};
  transition: all 0.3s;
  padding: 10px;
  cursor: pointer;
  border-radius: 30px;
`;

export const ToolkitWrapper = s.div`
  background-color: white;
  box-shadow: ${theme.shadows.dt_shadow_shadezies};
  gap: 12px;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  padding: 12px 24px;
  margin: 0 12px 12px 12px;
  max-width:700px;
`;

export const ToolkitButton = s.button`
  display: flex;
  flex-direction: column;
  border: none;
  background: none;
  gap: 6px;
  align-items: center;
  cursor: pointer;
`;

export const ClassMenuWrapper = s.div`
  width: 100%;
  overflow-x: auto;
  // display: flex;
  // flex-direction: column;
`;

export const ClassMenu = s.nav`
  margin: auto;
  padding-inline: 12px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  list-style: none;
  max-width: 1170px;
`;

export const ClassMenuItem = s.li<{ active?: boolean }>`
  cursor: pointer;
  padding-block: 14px;
  border-bottom: solid 6px ${(props) => (props.active ? "#00B2F7" : "transparent")};
  margin-bottom: -6px;
  * {
    white-space: nowrap;
  }
  &:last-child {
    padding-right: 24px;
  }
  // z-index: 2;
  // position: relative;
`;

export const FloatingCTA = s.div`
  position: sticky;
  bottom: 20px;
  display: flex;
  text-align: center;
  width: 200px;
  background: red;
  left: 50%;
  transform: translateX(-50%);

`;

export const FloatingButtonContainer = s.div`
  position: fixed;
  top: 15px;
  z-index: 1001;
  right: 24px;
  ${mediaQueries[2]} {
    right: calc(50vw - 585px)
  }

`;
