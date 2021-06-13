import { __test__ } from '../sign-in';
import * as fs from 'fs/promises';
import * as path from 'path';

const { parseAuthenticityToken } = __test__;

describe('sign-in', () => {
  it('should be defined', async () => {
    const html = await fs.readFile(
      path.join(__dirname, 'fixtures', 'signin.response.txt'),
      'utf-8'
    );
    expect(parseAuthenticityToken(html)).toEqual(
      // this varies for every request.
      '17TecK0K80h0ftaMKpvoT8UoDJQ4iUFY7AEOBQZkg8e7DU7ERcsCcHP2Uh6xcivq/jQtAb5l5vOgwTiV7DLHtg=='
    );
  });
});
