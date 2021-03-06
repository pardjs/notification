'use strict';

import * as Joi from 'joi';
import SCHEMAS from '../constants/schemas';

export class PardError extends Error {
  constructor(message: string, meta?: object) {
    super(message);
    Object.assign(this, meta);
    Error.captureStackTrace(this, PardError);
  }
}

export const containHtml = (content: string): boolean => {
  const regex = /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i;

  return regex.test(content);
};

export const joiValidate = (name: string, data: any) => {
  if (!SCHEMAS[name]) {
    throw new PardError(`Missing schema to validate code`, { type: 'VALIDATION_SCHEMA_MISSING' });
  }

  const { error, value } = Joi.validate(data, SCHEMAS[name]);
  if (error) {
    throw new PardError('Validateion failed:' + error.message, { type: 'VALIDATION_FAILED' });
  }

  return value;
};
