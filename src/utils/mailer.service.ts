import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // Cambia esto por tu servidor SMTP
      port: 587, // Cambia esto si usas otro puerto
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: 'mackenzie.bashirian40@ethereal.email', // Tu correo
        pass: '5U6TAc5WgaaKcJzg7K', // Tu contraseña
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: '"Tu Nombre" <tu_correo@example.com>', // Remitente
      to, // Destinatario
      subject, // Asunto
      text, // Texto del correo
    });

    console.log('Mensaje enviado: %s', info.messageId);
  }
}
