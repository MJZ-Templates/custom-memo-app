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
  RED: "#f6c1c1",
  ORANGE: "#fdd9b5",
  YELLOW: "#fff5b7",
  GREEN: "#d2ead2",
  BLUE: "#c7e5f9",
  PURPLE: "#e3d3f8",
  WHITE: "#ffffff",
};

export const getColorKeyFromHex = (hex) => {
  return (
    Object.entries(MEMO_COLOR_MAP).find(([_, value]) => value === hex)?.[0] ||
    "WHITE"
  );
};
