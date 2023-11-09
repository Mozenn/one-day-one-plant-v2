import { type NextRequest } from 'next/server'
import { getMemberFromId } from "@/lib/memberUtils";
import { Member } from '@/types/member';

export async function GET(request: NextRequest) {
  if(!request.nextUrl.searchParams.has('id')) {
    return Response.error();
  }

  const id = +request.nextUrl.searchParams.get('id')!;
  const member: Member = getMemberFromId(id);
  return Response.json(member);
}