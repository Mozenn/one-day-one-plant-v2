import { type NextRequest } from 'next/server'
import { getPlantFromId } from "@/lib/plantUtils";

export async function GET(request: NextRequest) {
  
  if(!request.nextUrl.searchParams.has('id')) {
    return Response.error();
  }

  const id = +request.nextUrl.searchParams.get('id')!;
  const plant = getPlantFromId(id);
 
  return Response.json(plant);
}