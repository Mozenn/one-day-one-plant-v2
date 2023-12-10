import { PlantUrl } from "./plantUrl";
import { Rarity } from "./rarity";

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  family: string;
  createdAt: string;
  imageUrl: string;
  urls: PlantUrl[];
  rarity: Rarity;
}
