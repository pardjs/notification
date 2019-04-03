'use strict';
import { PardError, containHtml } from '../src/utils';

describe('Util test', () => {
  it('PardError is instantiable', () => {
    expect(new PardError('message', { type: 'TEST_ERROR_TYPE' })).toBeInstanceOf(PardError);
  });

  it('Should can return ture with html content', () => {
    const htmlEmailContent: string = `
    <html>
      <head>
          <title>Example document</title>
      </head>
      <body>
          <table>
              <tr>
                  <td>
                      <!-- Your code is inserted here -->
                  </td>
              </tr>
          </table>
      </body>
    </html>
    `;

    const isHtml = containHtml(htmlEmailContent);
    expect(isHtml).toBeTruthy();
  });

  it('Should can return ture with html content', () => {
    const textContent: string = `
    Dear Dozto.

    Glad to hear from you .

    Besi wishes.
    `;

    const isHtml = containHtml(textContent);
    expect(isHtml).toBeFalsy();
  });
});
