'use strict';
import Notification from '../src/notification';

describe('Notification test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('Notification is instantiable', () => {
    expect(new Notification()).toBeInstanceOf(Notification);
  });
});
