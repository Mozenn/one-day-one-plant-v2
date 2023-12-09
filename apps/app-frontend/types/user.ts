import { Plant } from "./plant";
import { TableRow } from "./tableRow";

export interface User extends TableRow {
  username: string;
  email: string;
  score: number;
  profilePlantUrl: string;
  createdAt: string;
  verified: boolean;
  lastDrawDate: string;
  lastDrawPlant: Plant;
}
