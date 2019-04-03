'use strict';
import AliMail from '../src/ali-mail';
import nock = require('nock');

describe('Ali Mail test', () => {
  const options = {
    senderAddress: 'test@dozto.com',
    senderName: '灵鹞软件',
    toAddresses: ['ole3021@gmail.com', 'bgd_sh@hotmail.com'],
    title: '联系邮件',
    text: 'contact mail'
  };

  const aliMail = new AliMail('testAppId', 'testSecret', 40000);
  it('Alimail is instantiable', () => {
    expect(new AliMail('testAppId', 'testSecret', 40000)).toBeInstanceOf(AliMail);
  });

  it('Should can send email', async () => {
    nock('https://dm.aliyuncs.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, { EnvId: '58796843655', RequestId: 'E3883FB7-737F-4199-9C08-61CA586004BA' });
    const aliMail = new AliMail('testAppId', 'testSecret', 40000);

    const result = await aliMail.sendMail({
      senderAddress: 'contact@do021.com',
      senderName: '灵鹞软件',
      toAddresses: ['ole3021@gmail.com'],
      title: '联系邮件',
      text: 'contact mail'
    });

    expect(result.EnvId).toEqual('58796843655');
    expect(result.RequestId).toEqual('E3883FB7-737F-4199-9C08-61CA586004BA');
  });

  it('Should can send email', async () => {
    nock('https://dm.aliyuncs.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(412, {
        Recommend:
          'https://error-center.aliyun.com/status/search?Keyword=SignatureDoesNotMatch&source=PopGw',
        Message:
          'Specified signature is not matched with our calculation. server string to sign is:GET&%2F&AccessKeyId%3DLTAIaFoyktSdb9u6%26AccountName%3Dcontact%2540do021.com%26Action%3DSingleSendMail%26AddressType%3D1%26Format%3DJSON%26FromAlias%3D%25E7%2581%25B5%25E9%25B9%259E%25E8%25BD%25AF%25E4%25BB%25B6%26ReplyToAddress%3Dtrue%26SignatureMethod%3DHMAC-SHA1%26SignatureNonce%3D163675b01f8780847bdc83a4d8fd0178%26SignatureVersion%3D1.0%26Subject%3D%25E8%2581%2594%25E7%25B3%25BB%25E9%2582%25AE%25E4%25BB%25B6%26TextBody%3Dcontact%2520mail%26Timestamp%3D2019-04-03T16%253A37%253A59.006Z%26ToAddress%255B%255D%3Dole3021%2540gmail.com%26Version%3D2015-11-23',
        RequestId: '49779A53-7F38-4905-95AE-2519D01707B0',
        HostId: 'dm.aliyuncs.com',
        Code: 'SignatureDoesNotMatch'
      });

    const aliMail = new AliMail('testAppId', 'fakeSecret', 40000);

    try {
      await aliMail.sendMail({
        senderAddress: 'contact@do021.com',
        senderName: '灵鹞软件',
        toAddresses: ['ole3021@gmail.com'],
        title: '联系邮件',
        text: 'contact mail'
      });
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
