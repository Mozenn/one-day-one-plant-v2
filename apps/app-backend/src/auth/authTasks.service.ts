import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/shared/prisma.service';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthTasksService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: Logger = new Logger(AuthService.name),
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM, { name: 'purgeInvalidUsers' })
  async purgeInvalidUsers() {
    this.logger.log('Purging invalid users started');

    const usersPerPage = 25;
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 1);
    const oneWeekMs = 604800000;
    const oneDayMs = 86400000;
    const whereQuery = {
      verified: false,
      createdAt: {
        lte: thresholdDate,
      },
    };

    const total = await this.prisma.user.count({ where: whereQuery });
    const totalPages = total / usersPerPage;

    for (let i = 0; i < totalPages; i++) {
      const users = await this.prisma.user.findMany({
        skip: Math.max(i * usersPerPage - 1, 0),
        take: usersPerPage,
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where: whereQuery,
      });

      users.forEach((u) => {
        if (new Date().getTime() - u.createdAt.getTime() > oneWeekMs) {
          this.userService.deleteUser(u.id);
          this.sendDeletionEmail(u.email, u.username);
          this.logger.log(`Purging user ${u.id}`);
        } else if (new Date().getTime() - u.createdAt.getTime() > oneDayMs) {
          const daysLeft =
            (new Date().getTime() - new Date(u.createdAt).getTime()) /
            (1000 * 60 * 60 * 24);

          this.sendWarningEmail(u.email, u.username, Math.round(daysLeft));
          this.logger.log(`Sending warning email for user ${u.id}`);
        }
      });
    }

    this.logger.log('Purging invalid users done');
  }

  async sendWarningEmail(email: string, username: string, daysLeft: number) {
    const url = this.authService.buildEmailConfirmationUrl(email);

    await this.emailService.sendWarningEmail(email, username, url, daysLeft);
  }

  async sendDeletionEmail(email: string, username: string) {
    await this.emailService.sendDeletionEmail(email, username);
  }
}
