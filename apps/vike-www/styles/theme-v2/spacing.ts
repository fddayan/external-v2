export interface Spacing {
  "1 1/2": string;
  3: string;
  6: string;
  12: string;
  18: string;
  24: string;
  30: string;
  36: string;
  42: string;
  48: string;
  54: string;
  60: string;
}

export type SpacingValues = keyof Spacing;

export const spacing: Spacing = {
  "1 1/2": "1.5px",
  3: "3px",
  6: "6px",
  12: "12px",
  18: "18px",
  24: "24px",
  30: "30px",
  36: "36px",
  42: "42px",
  48: "48px",
  54: "54px",
  60: "60px",
};
