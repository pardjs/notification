'use strict';

import AliMail from './ali-mail';
import { containHtml } from './utils';

class Config {
  aliAppId: string;
  aliSecret: string;
  senderName?: string;
  senderEmail?: string;
  emailTitle?: string;
  aliMailTimeout?: number;
}

class SendMailConfig {
  senderAddress: string;
  senderName: string;
  toAddresses: String[];
  title: string;
  content: string;
}

interface SendMailResponse {
  EnvId: string;
  RequestId: string;
}

export default class Notification {
  private emailTitle: string = '邮件通知 Email Notification';
  private aliMailTimeout: number = 3000;
  private aliMail: AliMail;

  constructor(private config: Config) {
    this.aliMailTimeout = (config && config.aliMailTimeout) || this.aliMailTimeout;
    this.emailTitle = (config && config.emailTitle) || this.emailTitle;

    this.aliMail = new AliMail(
      this.config.aliAppId,
      this.config.aliSecret,
      this.config.aliMailTimeout
    );
  }

  async sendMail(options: SendMailConfig): Promise<SendMailResponse> {
    const sendOptions: any = {};

    if (containHtml(options.content)) {
      sendOptions.html = options.content;
    } else {
      sendOptions.text = options.content;
    }

    delete options.content;

    Object.assign(sendOptions, options);

    return this.aliMail.sendMail(sendOptions);
  }
}
