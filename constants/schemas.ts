import * as Joi from 'joi';

export default {
  SEND_MAIL_OPTIONS: Joi.object()
    .keys({
      senderAddress: Joi.string().email(),
      senderName: Joi.string().max(15, 'utf8'),
      toAddresses: Joi.array()
        .max(100)
        .items(Joi.string().email()),
      title: Joi.string(),
      text: Joi.string(),
      html: Joi.string()
    })
    .xor('text', 'html')
} as {
  [index: string]: Joi.ObjectSchema;
};
