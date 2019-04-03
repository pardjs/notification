'use strict';

export class PardError extends Error {
  constructor(message: string, meta?: object) {
    super(message);
    Object.assign(this, meta);
    Error.captureStackTrace(this, PardError);
  }
}
