import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { renderTemplate } from './render-template';
import { DATA_EMAIL } from './email-data';

interface dataEmail {
  from: string | undefined,
  to: string | undefined,
  subject: string | undefined,
  html: string | undefined,
  attachments: any | undefined
}

interface dataSendMail {
  type: string,
  email: string,
  data: any,
  attachments?: any | undefined
}


@Injectable()
export class MailerService {
  async sendMail({ type, email, data, attachments } : dataSendMail) {
    const config = {
      host: 'smtp-relay.brevo.com', // Cambia esto por tu servidor SMTP
      port: 587, // Cambia esto si usas otro puerto
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: "7ca341001@smtp-brevo.com", // Tu clave pública de API de Mailjet
        pass: process.env.PASSWORD,  // Tu contraseña
      },
    }
    let transporter = nodemailer.createTransport(config);
    const message = renderTemplate( { type, data })
    let mail: dataEmail = { ...DATA_EMAIL[type], to: email, html: message, from: "bushidotech312@gmail.com"}
    if(attachments) mail = {...mail, attachments}
    const info = await transporter.sendMail(mail);
    console.log("Message sent", info.messageId);
  }
}
