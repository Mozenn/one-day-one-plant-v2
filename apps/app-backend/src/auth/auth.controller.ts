import {
  Controller,
  Post,
  Req,
  UseGuards,
  Res,
  Get,
  Body,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './localAuth.guard';
import RequestWithUser from './requestWithUser.interface';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { SignUpDto } from './signup.dto';
import JwtAuthenticationGuard from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() reply: FastifyReply) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    reply.headers({ 'Set-Cookie': cookie });
    return reply.send(req.user);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto, @Res() reply: FastifyReply) {
    const user = await this.authService.signUp(signupDto);
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    reply.headers({ 'Set-Cookie': cookie });
    return reply.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Res() reply: FastifyReply) {
    reply.headers({ 'Set-Cookie': this.authService.getCookieForLogOut() });
    return reply.status(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
