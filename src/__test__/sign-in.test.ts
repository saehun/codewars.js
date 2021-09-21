import { __test__ } from '../fetchers/sign-in';
import * as fs from 'fs/promises';
import * as path from 'path';

const { parseAuthenticityToken, parseDashboard } = __test__;

describe('sign-in', () => {
  it('can parse AuthenticationToken', async () => {
    const html = await fs.readFile(path.join(__dirname, 'data', 'signin.response.txt'), 'utf-8');
    expect(parseAuthenticityToken(html)).toEqual(
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    );
  });

  it('can parse Dashboard', async () => {
    const html = await fs.readFile(path.join(__dirname, 'data', 'dashboard.response.txt'), 'utf-8');
    expect(parseDashboard(html)).toEqual({
      csrfToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      jwt: 'eyJhbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    });
  });
});
