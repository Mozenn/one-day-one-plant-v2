import { drawPlant } from "@/lib/plantUtils"

export async function GET() {

  const plant = drawPlant();
  return Response.json(plant)
}