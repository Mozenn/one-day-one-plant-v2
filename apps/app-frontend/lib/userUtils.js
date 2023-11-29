import fs from "fs";
import path from "path";
import { getPlantFromId } from "@/lib/plantUtils";

const filePath = path.join(process.cwd(), "lib", "data/users.json");

export const getUsers = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

export const getUserFromId = (userId) => {
  const users = getUsers();

  const user = users.find((user) => {
    return user.id === userId;
  });

  return fillUser(user);
};

export const getUserPage = (page, elementsPerPage) => {
  const users = getUsers();

  const usersResult = users
    .slice(
      page === 0 ? page : page * elementsPerPage,
      page === 0 ? elementsPerPage : (page + 1) * elementsPerPage
    )
    .map((user) => fillUser(user));

  return {
    content: usersResult,
    total: users.length,
  };
};

const fillUser = (user) => {
  const drawPlant = getPlantFromId(user.lastDrawPlant);
  const profilePlant = getPlantFromId(user.profilePlant);

  return {
    ...user,
    lastDrawPlant: drawPlant,
    profileImageUrl: profilePlant.imageUrl,
  };
};
