import fs from "fs";
import path from "path";
import { getPlantFromId } from "@/lib/plantUtils";

const filePath = path.join(process.cwd(), "lib", "data/members.json");

export const getMembers = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

export const getMemberFromId = (memberId) => {
  const members = getMembers();

  const member = members.find((member) => {
    return member.id === memberId;
  });

  const drawPlant = getPlantFromId(member.lastDrawPlant);
  const profilePlant = getPlantFromId(member.profilePlant);

  return {
    ...member,
    lastDrawPlant: drawPlant,
    profileImageUrl: profilePlant.imageUrl,
  };
};
