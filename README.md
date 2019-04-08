# notification

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/pardjs/notification.svg)](https://greenkeeper.io/)
[![Travis](https://travis-ci.com/pardjs/notification.svg?branch=master)](https://travis-ci.org/pardjs/notification)
[![Coveralls](https://coveralls.io/repos/github/pardjs/notification/badge.svg?branch=master)](https://coveralls.io/github/pardjs/notification?branch=master)

Include mail 📩 and sms 📲 notifications. The notifiaction is a module used to handling Email ans SMS nottifications for pardjs project. it includes.

## Usage

CONFIGURATIONS:

- aliAppId: The `appId` for ali services.
- aliSecret: The `secret` for ali services.
- senderName: The name of the sender
- senderEmail: the sernder email address
- emailTitle: [Optional, '邮件通知 Email Notification']The default email title
- aliMailTimeout: [Optional, 3000]the timeout value for aliMail service(ms)

```js
import Notification from '@pardjs/notification';

const notificationSender = new Notification('#CONFIGURATIONS#');
```
