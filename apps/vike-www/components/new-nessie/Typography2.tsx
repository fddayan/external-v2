import React, { ElementType, FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const colorMap = {
  blue: "#0000FF",
  red: "#FF0000",
  green: "#00FF00",
  white: "#ffffff",
};

const typographyStyles = {
  headline: {
    1: {
      extrabold: css`
        font-size: 28px;
        font-weight: 800;
        line-height: 120%; /* 33.6px */
        letter-spacing: -0.1px;
        @media (max-width: 700px) {
          font-size: 24px;
          line-height: 120%; /* 28.8px */
        }
      `,
      bold: css`
        font-size: 28px;
        font-weight: 500;
        line-height: 120%; /* 33.6px */
        letter-spacing: -0.1px;
        @media (max-width: 700px) {
          font-size: 24px;
          line-height: 120%; /* 28.8px */
        }
      `,
    },
    2: {
      extrabold: css`
        font-size: 23px;
        font-weight: 800;
        line-height: 120%; /* 27.6px */
        letter-spacing: -0.1px;
        @media (max-width: 700px) {
          font-size: 20px;
          line-height: 120%; /* 24px */
        }
      `,
      bold: css`
        font-size: 23px;
        font-weight: 500;
        line-height: 120%; /* 27.6px */
        letter-spacing: -0.1px;
        @media (max-width: 700px) {
          font-size: 20px;
          line-height: 120%; /* 24px */
        }
      `,
    },
    3: {
      bold: css`
        font-size: 18px;
        font-weight: 700;
        line-height: 120%; /* 21.6px */
        @media (max-width: 700px) {
          font-size: 16px;
          line-height: 120%; /* 19.2px */
        }
      `,
      normal: css`
        font-size: 18px;
        font-weight: 500;
        line-height: 120%; /* 21.6px */
        @media (max-width: 700px) {
          font-size: 16px;
          line-height: 120%; /* 19.2px */
        }
      `,
    },
  },
  display: {
    1: {
      extrabold: css`
        font-size: 69px;
        font-weight: 800;
        line-height: 110%; /* 75.9px */
        letter-spacing: -0.9px;
        @media (max-width: 700px) {
          font-size: 60px;
          line-height: 110%; /* 66px */
        }
      `,
    },
    2: {
      extrabold: css`
        font-size: 55px;
        font-weight: 800;
        line-height: 110%; /* 60.5px */
        letter-spacing: -0.6px;
        @media (max-width: 700px) {
          font-size: 48px;
          line-height: 110%; /* 52.8px */
        }
      `,
      normal: css`
        font-size: 55px;
        font-weight: 500;
        line-height: 110%; /* 60.5px */
        letter-spacing: -0.6px;
        @media (max-width: 700px) {
          font-size: 48px;
          line-height: 110%; /* 52.8px */
        }
      `,
    },
    3: {
      extrabold: css`
        font-size: 44px;
        font-weight: 800;
        line-height: 120%; /* 52.8px */
        letter-spacing: -0.3px;
        @media (max-width: 700px) {
          font-size: 40px;
          line-height: 120%; /* 48px */
        }
      `,
      medium: css`
        font-size: 44px;
        font-weight: 500;
        line-height: 120%; /* 52.8px */
        letter-spacing: -0.3px;
        @media (max-width: 700px) {
          font-size: 40px;
          line-height: 120%; /* 48px */
        }
      `,
    },
    4: {
      extrabold: css`
        font-size: 35px;
        font-weight: 800;
        line-height: 120%; /* 42px */
        letter-spacing: -0.3px;
        @media (max-width: 700px) {
          font-size: 32px;
          line-height: 120%; /* 38.4px */
        }
      `,
      normal: css`
        font-size: 35px;
        font-weight: 500;
        line-height: 120%; /* 42px */
        letter-spacing: -0.3px;
        @media (max-width: 700px) {
          font-size: 32px;
          line-height: 120%; /* 38.4px */
        }
      `,
    },
    oversize: {
      extrabold: css`
        font-size: 92px;
        font-weight: 800;
        line-height: 110%; /* 101.2px */
        letter-spacing: -0.12px;
        @media (max-width: 700px) {
          font-size: 80px;
          line-height: 110%; /* 88px */
        }
      `,
    },
  },
  body: {
    1: css`
      font-size: 21px;
      font-weight: 500;
      line-height: 130%; /* 27.3px */
      @media (max-width: 700px) {
        font-size: 18px;
        line-height: 130%; /* 23.4px */
      }
    `,
    2: css`
      font-size: 18px;
      font-weight: 500;
      line-height: 120%; /* 21.6px */
      @media (max-width: 700px) {
        font-size: 16px;
        line-height: 120%; /* 19.2px */
      }
    `,
    3: css`
      font-size: 15px;
      font-weight: 500;
      line-height: 130%; /* 19.5px */
      letter-spacing: 0.2px;
      @media (max-width: 700px) {
        font-size: 14px;
        line-height: 130%; /* 18.2px */
      }
    `,
    minutiae: css`
      font-size: 12px;
      font-weight: 500;
      line-height: 110%; /* 13.2px */
      letter-spacing: 0.2px;
      @media (max-width: 700px) {
        font-size: 10px;
        line-height: 110%; /* 11px */
      }
    `,
  },
};

const getTypographyStyle = (type: string, level: number | string, weight?: string) => {
  if (type === "body") {
    return typographyStyles[type][level] || "";
  }
  return typographyStyles[type][level]?.[weight] || "";
};

interface TypographyProps {
  type: "headline" | "display" | "body";
  level: number | "oversize" | "minutiae";
  as?: ElementType;
  weight?: "bold" | "extrabold" | "normal" | "medium";
  color?: keyof typeof colorMap | string; // Extend the color prop to accept hex values
  children: ReactNode;
}

const TypographyStyled = styled.div<TypographyProps>`
  color: ${({ color }) => (color in colorMap ? colorMap[color as keyof typeof colorMap] : color)};
  font-feature-settings: "clig" off, "liga" off;
  font-family: ${({ type }) => (type === "display" ? "DojoDisplay !important" : '"DojoText"')};
  font-style: normal;
  ${({ type, level, weight }) => getTypographyStyle(type, level, weight)}
`;

const Typography: FC<TypographyProps> = ({ type, level, as, weight, color, children }) => {
  return (
    <TypographyStyled as={as} type={type} level={level} weight={weight} color={color}>
      {children}
    </TypographyStyled>
  );
};

Typography.defaultProps = {
  weight: "normal",
  color: "blue", // Default to 'blue' instead of a custom color value
  as: "div",
};

export { Typography };
