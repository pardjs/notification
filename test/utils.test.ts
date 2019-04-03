'use strict';
import { PardError } from '../src/utils';

describe('Util test', () => {
  it('PardError is instantiable', () => {
    expect(new PardError('message', { type: 'TEST_ERROR_TYPE' })).toBeInstanceOf(PardError);
  });
});
