import { drawPlant } from "@/lib/plantUtils"

export async function GET() {

  const plant = drawPlant();
 console.log("draw" + plant.scientificName)
  return Response.json(plant)
}