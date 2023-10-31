import { PlantUrl } from "./plantUrl";

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  family: string;
  createdAt: string;
  imageUrl: string;
  urls: PlantUrl[];
}
