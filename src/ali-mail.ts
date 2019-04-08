'use strict';

import * as crypto from 'crypto';

import axios, { AxiosInstance } from 'axios';
import { IsEmail, IsNotEmpty, IsString, ValidateIf, MaxLength } from 'class-validator';
import * as qs from 'querystring';
import * as md5 from 'md5';
import { PardError, joiValidate } from './utils';

interface MailOptions {
  senderAddress: string;
  senderName: string;
  toAddresses: string[];
  title: string;
  text?: string;
  html?: string;
}

interface SendMailResponse {
  EnvId: string;
  RequestId: string;
}

export default class AliMail {
  private aliMailAxios: AxiosInstance;
  private publicParams = {
    Format: 'JSON',
    AccessKeyId: this.appId,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: '',
    SignatureVersion: '1.0',
    SignatureNonce: '',
    Version: '2015-11-23'
  };

  constructor(private appId: string, private secret: string, timeout = 3000) {
    this.aliMailAxios = axios.create({
      baseURL: 'https://dm.aliyuncs.com',
      timeout
    });
  }

  nonce = (): string => md5(`${new Date().valueOf()}-${Math.floor(Math.random() * 99999999999)}`);

  fixAliEncode = (strToEncode: string): string => {
    const encodedString = encodeURIComponent(strToEncode);
    let aliEncodeString = '';
    for (let char of encodedString) {
      switch (char) {
        case '(':
          aliEncodeString += `%2528`;
          break;
        case ')':
          aliEncodeString += `%2529`;
          break;
        case '!':
          aliEncodeString += `%2521`;
          break;
        case '*':
          aliEncodeString += `%252A`;
          break;
        case "'":
          aliEncodeString += `%2527`;
          break;
        default:
          aliEncodeString += char;
          break;
      }
    }

    return aliEncodeString;
  };

  signature = (options: Object): string => {
    const StringToSign = `GET&${this.fixAliEncode('/')}&${this.fixAliEncode(
      qs.stringify(options)
    )}`;

    return crypto
      .createHmac('sha1', `${this.secret}&`)
      .update(StringToSign)
      .digest()
      .toString('base64');
  };

  reSort = (params: Object, opts: Object): Object => {
    const args: any = Object.assign(params, opts);
    const keys: string[] = Object.keys(args).sort();
    const newArgs: any = {};

    keys.forEach(e => (newArgs[e] = args[e]));

    newArgs['SignatureNonce'] = this.nonce();
    newArgs['Timestamp'] = new Date().toISOString();
    newArgs['Signature'] = this.signature(newArgs);

    return newArgs;
  };

  async sendMail(options: MailOptions): Promise<SendMailResponse> {
    joiValidate('SEND_MAIL_OPTIONS', options);
    try {
      let mailOption: any = {
        Action: 'SingleSendMail',
        AccountName: options.senderAddress,
        ReplyToAddress: true,
        AddressType: 1,
        ToAddress: options.toAddresses.join(','),
        Subject: options.title
      };

      options.senderName && (mailOption.FromAlias = options.senderName);
      options.text && (mailOption.TextBody = options.text);
      options.html && (mailOption.HtmlBody = options.html);

      const mailData = this.reSort(this.publicParams, mailOption);

      const { data: sendResponse } = await this.aliMailAxios.get('/', { params: mailData });

      return sendResponse;
    } catch (error) {
      let message = error.message;

      if (error.response && error.response.data) message = error.response.data.code;
      throw new PardError(message, { type: 'ALI_MAIL_UNEXPECTED_ERROR' });
    }
  }
}
