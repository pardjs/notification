'use strict';
import Notification from '../src/notification';

describe('Notification test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('Notification is instantiable', () => {
    const config = {
      aliAppId: 'testAppId',
      aliSecret: 'testSecret',
      senderName: '灵鹞软件',
      senderEmail: 'test@dozto.com',
      emailTitle: 'Notify Mail',
      aliMailTimeout: 3000
    };
    expect(new Notification(config)).toBeInstanceOf(Notification);
  });
});
