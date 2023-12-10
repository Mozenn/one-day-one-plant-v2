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

export const getRarityTextColor = (rarity: Rarity): string => {
  return rarityToTextColor[rarity];
};

export const getRarityFilter = (rarity: Rarity): string => {
  return rarityToFilter[rarity];
};
