import { getPlantPage } from "@/lib/plantUtils";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("page")) {
    return Response.error();
  }

  const page = +request.nextUrl.searchParams.get("page")!;
  const elementsPerPage = +request.nextUrl.searchParams.get("elementsPerPage")!;

  const plantData = getPlantPage(page, elementsPerPage);

  return Response.json(plantData);
}
