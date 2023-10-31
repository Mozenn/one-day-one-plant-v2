import { drawPlant } from "@/lib/plantUtils"

export async function GET() {

  const data = drawPlant();
 
  return Response.json({ data })
}