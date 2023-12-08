import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
