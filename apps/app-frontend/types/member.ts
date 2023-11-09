import { Plant } from "./plant";
import { TableRow } from "./tableRow";

export interface Member extends TableRow {
  username: string;
  email: string;
  score: number;
  profileImageUrl: string;
  createdAt: string;
  lastDrawDate: string;
  lastDrawPlant: Plant;
}
