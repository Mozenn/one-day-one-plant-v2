import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

@Injectable()
export class EmailService implements OnModuleInit {
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

  onModuleInit() {
    this.registerHeaderPartial();
    this.registerMainPartial();
  }

  registerHeaderPartial() {
    const template = Handlebars.compile(
      fs.readFileSync(
        path.join(__dirname, '..', '..', 'views', 'header.hbs'),
        'utf8',
      ),
    );

    const logo = `data:image/png;base64, ${fs.readFileSync(
      path.join(__dirname, '..', '..', 'views', 'logo.png'),
      'base64',
    )}`;

    const header = template({ logo });

    Handlebars.registerPartial('header', header);
  }

  registerMainPartial() {
    Handlebars.registerHelper('mainPartial', function (context) {
      return context.mainPartial;
    });
  }

  async sendVerificationEmail(email: string, username: string, url: string) {
    const html = this.renderTemplate(
      { url, username },
      'email-confirmation.hbs',
    );

    return this.sendMail({
      to: email,
      subject: 'One Day One Plant - Email confirmation',
      html,
    });
  }

  async sendWarningEmail(
    email: string,
    username: string,
    url: string,
    daysLeft: number,
  ) {
    const html = this.renderTemplate(
      { url, username, daysLeft },
      'confirmation-warning.hbs',
    );

    return this.sendMail({
      to: email,
      subject: 'One Day One Plant - Email confirmation',
      html,
    });
  }

  async sendDeletionEmail(email: string, username: string) {
    const html = this.renderTemplate({ username }, 'delete-account.hbs');

    return this.sendMail({
      to: email,
      subject: 'One Day One Plant - Account Deletion',
      html,
    });
  }

  private renderTemplate(context: any, templateFile: string) {
    const template = Handlebars.compile(
      fs.readFileSync(
        path.join(__dirname, '..', '..', 'views', templateFile),
        'utf8',
      ),
    );

    const templateString = template(context);

    Handlebars.registerPartial('mainPartial', templateString);

    const mainTemplate = Handlebars.compile(
      fs.readFileSync(
        path.join(__dirname, '..', '..', 'views', 'main.hbs'),
        'utf8',
      ),
    );

    return mainTemplate({});
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
