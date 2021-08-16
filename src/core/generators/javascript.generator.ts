import { Language } from '../../types';
import { GenerationInput, SkeletonGenerator } from './types';
import * as fs from 'fs/promises';
import { stripExample, wrapText } from '../../utils/strings';

export class JavascriptGenerator implements SkeletonGenerator {
  language: Language = 'javascript';
  async generate({ basedir, meta, session }: GenerationInput) {
    return await fs.writeFile(basedir + '/solution.js', skeleton());

    function skeleton() {
      return [importLine(), description(), session.setup, session.exampleFixture].join('\n\n');
    }

    function description() {
      return wrapText(stripExample(meta.description))
        .split('\n')
        .map(line => '/// ' + line)
        .join('\n');
    }

    function importLine() {
      return `const { describe, it, Test } = require('mocha');`;
    }
  }
}
