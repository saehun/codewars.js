import { __test__ } from '../get-supported-languages';
import * as fs from 'fs/promises';

describe('get-supported-languages', () => {
  it('can parse html', async () => {
    const html = await fs.readFile(`${__dirname}/data/training.response.txt`, 'utf-8');
    expect(__test__.parseSupportedLangauge(html)).toEqual([
      'coffeescript',
      'haskell',
      'javascript',
      'python',
      'ruby',
    ]);
  });
});
