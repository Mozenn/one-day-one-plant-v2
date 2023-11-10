import fs from "fs";
import path from "path";
import { Plant } from "@/types/plant";
import { getRandomInt } from "./mathUtils";

const filePath = path.join(process.cwd(), "lib", "data/plants.json");

export const getPlants = () : Plant[] => {
  return JSON.parse(fs.readFileSync(filePath,'utf8'));
};

export const getPlantFromId = (id: number) => {
  const plants = getPlants();

  let plant = plants.find((plant: Plant) => plant.id === id);

  return plant;
};

export const drawPlant = () : Plant => {
  const plants = getPlants();

  const index: number = getRandomInt(plants.length);

  let plant = plants[index];

  return plant;
};

export const getPlantPage = (page: number, elementsPerPage: number) => {
  const plants = getPlants();

  const plantsResult = plants.slice(
    page === 0 ? page : (page) * elementsPerPage,
    page === 0 ? elementsPerPage : (page + 1) * elementsPerPage
  );

  return {
    content: plantsResult,
    total: plants.length
  };
};