import { Rarity } from "@/types/rarity";

const rarityToTextColor = {
  COMMON: "text-common",
  UNCOMMON: "text-uncommon",
  RARE: "text-rare",
  ULTRA_RARE: "text-ultra-rare",
};

const rarityToFilter = {
  COMMON: "filter-common",
  UNCOMMON: "filter-uncommon",
  RARE: "filter-rare",
  ULTRA_RARE: "filter-ultra-rare",
};

const rarityToScoreOnDraw = {
  COMMON: process.env.NEXT_PUBLIC_SCORE_ON_DRAW_COMMON || "100",
  UNCOMMON: process.env.NEXT_PUBLIC_SCORE_ON_DRAW_UNCOMMON || "150",
  RARE: process.env.NEXT_PUBLIC_SCORE_ON_DRAW_RARE || "300",
  ULTRA_RARE: process.env.NEXT_PUBLIC_SCORE_ON_DRAW_ULTRA_RARE || "500",
};

export const getRarityTextColor = (rarity: Rarity): string => {
  return rarityToTextColor[rarity];
};

export const getRarityFilter = (rarity: Rarity): string => {
  return rarityToFilter[rarity];
};

export const getRarityScoreOnDraw = (rarity: Rarity): string => {
  return rarityToScoreOnDraw[rarity];
};
