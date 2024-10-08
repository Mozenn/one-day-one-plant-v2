import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';
import { TokenPayload } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaErrorCode } from 'src/shared/prismaErrorCode.enum';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { VerificationTokenPayload } from './verificationTokenPayload.interface';
import { SignInGoogleDto } from './signinGoogle.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger = new Logger(AuthService.name),
    private readonly emailService: EmailService,
  ) {}

  async signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password?: string;
  }): Promise<User> {
    const hashPassword = password ? await hash(password, 10) : '';
    try {
      const user = await this.userService.createUser(
        username,
        email,
        hashPassword,
      );

      const url = this.buildEmailConfirmationUrl(email);

      await this.emailService.sendVerificationEmail(email, username, url);

      return user;
    } catch (error: any) {
      this.logger.error(error);
      if (error?.code === PrismaErrorCode.UniqueViolation) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async signInGoogle(signInGoogleDto: SignInGoogleDto): Promise<User> {
    const tokenData = this.jwtService.decode(signInGoogleDto.token);

    const user = await this.userService.getUserByEmail(tokenData.email);

    if (!user) {
      return this.signUp({
        username: tokenData.name.trim().replace(/\s+/g, ''),
        email: tokenData.email,
      });
    } else if (user.password) {
      const message = 'User already exists';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user.verified) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.verifyUser(email);
  }

  async decodeVerificationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error: any) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.userService.getUser(userId);
    if (user.verified) {
      throw new BadRequestException('Email already confirmed');
    }

    const url = this.buildEmailConfirmationUrl(user.email);

    await this.emailService.sendVerificationEmail(
      user.email,
      user.username,
      url,
    );
  }

  public buildEmailConfirmationUrl(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
  }

  async getAuthenticatedUser(emailOrUsername: string, password: string) {
    try {
      const user =
        await this.userService.getUserByEmailOrUsername(emailOrUsername);
      this.verifyPassword(password, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Secure; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
