import { type NextRequest } from "next/server";
import { getUserFromId } from "@/lib/userUtils";
import { User } from "@/types/user";

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("id")) {
    return Response.error();
  }

  const id = +request.nextUrl.searchParams.get("id")!;
  const user: User = getUserFromId(id);
  return Response.json(user);
}
