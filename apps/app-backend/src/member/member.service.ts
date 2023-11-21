import { Injectable } from '@nestjs/common';
import { MemberPageDto } from './member-page.dto';
import { PrismaService } from 'src/shared/prisma.service';
import { Member, Prisma } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async getMember(id: number): Promise<Member | null> {
    const prismaId: Prisma.MemberWhereUniqueInput = {
      id: id,
    };
    return this.prisma.member.findUnique({ where: prismaId });
  }

  async getMemberPage(
    pageDto: MemberPageDto,
  ): Promise<PaginationResult<Member>> {
    const whereQuery = {
      username: {
        contains: pageDto.username?.toLowerCase(),
      },
      score: {
        lte: pageDto.score,
      },
    };

    const [members, count] = await this.prisma.$transaction([
      this.prisma.member.findMany({
        skip: Math.max(pageDto.page * pageDto.elementsPerPage - 1, 0),
        take: pageDto.elementsPerPage,
        orderBy: [
          {
            [pageDto.key]: pageDto.direction,
          },
        ],
        where: {
          username: {
            contains: pageDto.username?.toLowerCase(),
          },
          score: {
            lte: pageDto.score,
          },
        },
      }),
      this.prisma.member.count({ where: whereQuery }),
    ]);

    return {
      content: members,
      total: count,
    };
  }
}
