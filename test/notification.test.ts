'use strict';
import Notification from '../src/notification';
import * as nock from 'nock';

describe('Notification test', () => {
  const config = {
    aliAppId: 'testAppId',
    aliSecret: 'testSecret',
    senderName: '灵鹞软件',
    senderEmail: 'test@dozto.com',
    emailTitle: 'Notify Mail',
    aliMailTimeout: 3000
  };

  const notification = new Notification(config);
  it('Notification is instantiable', () => {
    expect(notification).toBeInstanceOf(Notification);
  });

  it('Should can send email with text', async () => {
    nock('https://dm.aliyuncs.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, { EnvId: '58796843655', RequestId: 'E3883FB7-737F-4199-9C08-61CA586004BA' });

    const result = await notification.sendMail({
      senderAddress: 'contact@do021.com',
      senderName: '灵鹞软件',
      toAddresses: ['ole3021@gmail.com'],
      title: '联系邮件',
      content: 'This is the mail content'
    });

    expect(result.EnvId).toEqual('58796843655');
    expect(result.RequestId).toEqual('E3883FB7-737F-4199-9C08-61CA586004BA');
  });

  it('Should can send email with text', async () => {
    nock('https://dm.aliyuncs.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, { EnvId: '58796843655', RequestId: 'E3883FB7-737F-4199-9C08-61CA586004BA' });

    const config = {
      aliAppId: 'testAppId',
      aliSecret: 'testSecret',
      senderName: '灵鹞软件',
      senderEmail: 'test@dozto.com'
    };

    const notification = new Notification(config);

    const result = await notification.sendMail({
      senderAddress: 'contact@do021.com',
      senderName: '灵鹞软件',
      toAddresses: ['ole3021@gmail.com'],
      title: '联系邮件',
      content: '<body>This is the mail content</body>'
    });

    expect(result.EnvId).toEqual('58796843655');
    expect(result.RequestId).toEqual('E3883FB7-737F-4199-9C08-61CA586004BA');
  });
});
