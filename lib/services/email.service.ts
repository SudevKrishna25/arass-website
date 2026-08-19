import { renderEmailTemplate, EmailTemplateType, EmailTemplateData } from './email-templates';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  tags?: Record<string, string>;
}

export interface EmailProvider {
  send(options: SendEmailOptions): Promise<{ id: string; success: boolean }>;
  sendTemplate(to: string, type: EmailTemplateType, data: EmailTemplateData): Promise<{ id: string; success: boolean }>;
}

export class ConsoleEmailProvider implements EmailProvider {
  async send(options: SendEmailOptions) {
    const id = `email-${Date.now()}`;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[ARASS EMAIL] To: ${options.to} | Subject: ${options.subject}`);
    }
    return { id, success: true };
  }

  async sendTemplate(to: string, type: EmailTemplateType, data: EmailTemplateData) {
    const rendered = renderEmailTemplate(type, data);
    return this.send({
      to,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });
  }
}

export class ResendEmailProvider implements EmailProvider {
  constructor(private apiKey: string, private fromAddress: string = 'ARASS EVENTS <notifications@arass.technology>') {}

  async send(options: SendEmailOptions) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromAddress,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Resend delivery failed');
      return { id: data.id || `resend-${Date.now()}`, success: true };
    } catch (err: any) {
      console.error('[EMAIL ERROR] Resend dispatch error:', err.message);
      return { id: `failed-${Date.now()}`, success: false };
    }
  }

  async sendTemplate(to: string, type: EmailTemplateType, data: EmailTemplateData) {
    const rendered = renderEmailTemplate(type, data);
    return this.send({
      to,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });
  }
}

export function createEmailProvider(): EmailProvider {
  if (process.env.RESEND_API_KEY) {
    return new ResendEmailProvider(process.env.RESEND_API_KEY, process.env.EMAIL_FROM_ADDRESS);
  }
  return new ConsoleEmailProvider();
}

export const emailService: EmailProvider = createEmailProvider();

