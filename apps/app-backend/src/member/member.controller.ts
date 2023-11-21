import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberPageDto } from './member-page.dto';
import { Member } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly logger: Logger = new Logger(MemberController.name),
  ) {}

  @Get(':id')
  async getMember(@Param('id') id: string): Promise<Member> {
    this.logger.log(`GetMember request with id ${id}`);
    return await this.memberService.getMember(+id);
  }

  @Get('page')
  getMemberPage(
    @Query() query: MemberPageDto,
  ): Promise<PaginationResult<Member>> {
    this.logger.log(`GetMemberPage request with param ${query}`);
    return this.memberService.getMemberPage(query);
  }
}
