import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'process';

@Injectable()
export class MailService {
  transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async send(email: string, validationCode: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'store api validationCode code',
      text: validationCode,
    };
    await this.transport.sendMail(mailOptions);
  }
}
