import { __test__ } from '../sign-in';
import * as fs from 'fs/promises';
import * as path from 'path';

const { parseAuthenticityToken, parseDashboard } = __test__;

describe('sign-in', () => {
  it('can parse AuthenticationToken', async () => {
    const html = await fs.readFile(
      path.join(__dirname, 'fixtures', 'signin.response.txt'),
      'utf-8'
    );
    expect(parseAuthenticityToken(html)).toEqual(
      // this varies for every request.
      '17TecK0K80h0ftaMKpvoT8UoDJQ4iUFY7AEOBQZkg8e7DU7ERcsCcHP2Uh6xcivq/jQtAb5l5vOgwTiV7DLHtg=='
    );
  });

  it('can parse Dashboard', async () => {
    const html = await fs.readFile(
      path.join(__dirname, 'fixtures', 'dashboard.response.txt'),
      'utf-8'
    );
    expect(parseDashboard(html)).toEqual({
      csrfToken:
        '7tWO0ssvTzBBmPWo3nG46kAUprm+TkyR2yXhLhVFvxrq/P9exv9y+1466KLm210EaAl9lKaYZeDaH+ukT2K4MA==',
      jwt:
        'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjYwYjdiNmU4OGU4ZDYyMDAwNjNkNGFiNSIsImV4cCI6MTYyNTUwODU2N30.aMiMLkPBiZ8DcOyT5OW0NimH_rYNcaMnYZ4zQVPYeM0',
    });
  });
});
