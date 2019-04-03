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
  senderName: string[];
  toAddresses: String[];
  content: string;
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

  async sendMail(options: SendMailConfig): Promise<void> {
    const sendOptions: any = {};

    Object.assign(sendOptions, options);

    if (containHtml(options.content)) {
      sendOptions.html = options.content;
    } else {
      sendOptions.text = options.content;
    }

    await this.aliMail.sendMail(sendOptions);
    return;
  }
}
