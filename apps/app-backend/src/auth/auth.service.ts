import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './signup.dto';
import { hash, compare } from 'bcrypt';
import { TokenPayload } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaErrorCode } from 'src/shared/prismaErrorCode.enum';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';
import { VerificationTokenPayload } from './verificationTokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger = new Logger(AuthService.name),
    private readonly emailService: EmailService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const hashPassword = await hash(signUpDto.password, 10);
    try {
      const user = await this.userService.createUser(
        signUpDto.username,
        signUpDto.email,
        hashPassword,
      );

      await this.sendVerificationEmail(signUpDto.email);

      return user;
    } catch (error: any) {
      this.logger.error(error);
      if (error?.code === PrismaErrorCode.UniqueViolation) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async sendVerificationEmail(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    const text = `Welcome to One Day One Plant. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'One Day One Plant - Email confirmation',
      text,
    });
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
    await this.sendVerificationEmail(user.email);
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
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
