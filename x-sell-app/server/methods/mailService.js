import nodemailer from "nodemailer";
import "dotenv/config";

import {
  accountConfirmationTemplate,
  processCompletedTemplate,
} from "./mailTemplates.js";

const emailLogin = process.env.EMAIL_LOGIN;
const emailKey = process.env.EMAIL_KEY;
const emailFrom = process.env.EMAIL_FROM || emailLogin;

let transporter;

function getTransporter() {
  if (!emailLogin || !emailKey) {
    throw new Error("EMAIL_LOGIN e EMAIL_KEY precisam estar configurados.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailLogin,
        pass: emailKey,
      },
    });
  }

  return transporter;
}

async function sendTemplate({ destination, subject, text, html }) {
  if (!destination) {
    throw new Error("O destinatário do e-mail não foi informado.");
  }

  const info = await getTransporter().sendMail({
    from: `"X-Sell | Fractals Ventures" <${emailFrom}>`,
    to: destination,
    subject,
    text,
    html,
  });

  console.log(`E-mail enviado para ${destination}: ${info.messageId}`);
  return info;
}

export async function sendAccountConfirmation({ email, name, username }) {
  return sendTemplate({
    destination: email,
    ...accountConfirmationTemplate({ name, username }),
  });
}

export async function sendProcessCompleted({
  email,
  name,
  protocol,
  inputName,
  completedAt,
}) {
  return sendTemplate({
    destination: email,
    ...processCompletedTemplate({
      name,
      protocol,
      inputName,
      completedAt,
      appUrl: process.env.APP_URL,
    }),
  });
}

// Mantém uma função genérica para outros e-mails futuros.
export async function SendMail(data) {
  return sendTemplate({
    destination: data.destination,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
}
