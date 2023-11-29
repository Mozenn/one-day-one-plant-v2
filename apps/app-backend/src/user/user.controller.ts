import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserPageDto } from './user-page.dto';
import { User } from '@prisma/client';
import { PaginationResult } from 'src/shared/paginationResult';
import JwtAuthenticationGuard from 'src/auth/jwtAuth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger = new Logger(UserController.name),
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    this.logger.log(`GetUser request with id ${id}`);
    return await this.userService.getUser(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('page')
  getUserPage(@Query() query: UserPageDto): Promise<PaginationResult<User>> {
    this.logger.log(`GetUserPage request with param ${query}`);
    return this.userService.getUserPage(query);
  }
}
