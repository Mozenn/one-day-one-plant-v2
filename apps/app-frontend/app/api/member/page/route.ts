import { getMemberPage } from "@/lib/memberUtils";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

  if(!request.nextUrl.searchParams.has('page')) {
    return Response.error();
  }

  const page = +request.nextUrl.searchParams.get('page')!;
  const elementsPerPage = +request.nextUrl.searchParams.get('elementsPerPage')!;

  const memberData = getMemberPage(page, elementsPerPage);

  return Response.json(memberData);
}