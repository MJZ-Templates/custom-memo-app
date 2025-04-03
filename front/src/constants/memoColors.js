// src/constants/memoColors.js

export const MEMO_COLORS = {
  RED: "RED",
  ORANGE: "ORANGE",
  YELLOW: "YELLOW",
  GREEN: "GREEN",
  BLUE: "BLUE",
  PURPLE: "PURPLE",
  WHITE: "WHITE",
};

export const MEMO_COLOR_MAP = {
  RED: "#fde2e2",
  ORANGE: "#ffe8cc",
  YELLOW: "#fffbd1",
  GREEN: "#e0f3e0",
  BLUE: "#d8ebfa",
  PURPLE: "#f0e5fb",
  WHITE: "#ffffff",
};

export const getColorKeyFromHex = (hex) => {
  return (
    Object.entries(MEMO_COLOR_MAP).find(([_, value]) => value === hex)?.[0] ||
    "WHITE"
  );
};
