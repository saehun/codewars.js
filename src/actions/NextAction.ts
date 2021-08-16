import { Input } from '../commands';
import { IAction } from './interface';
import signIn from '../fetchers/sign-in';
import { createHttpClient } from '../core/http';
import seekKata from '../fetchers/seek-kata';
import { AuthToken, KataInfo, Language } from '../types';
import getSupportedLanguages from '../fetchers/get-supported-languages';
import * as chalk from 'chalk';
import * as prompts from 'prompts';
import * as path from 'path';
import * as fs from 'fs/promises';
import { stripExample, toFileName, wrapText } from '../utils/strings';

export class NextAction implements IAction {
  async handle(inputs: Input[]) {
    const client = createHttpClient();
    const authToken = await signIn().run(client);
    const [{ value }] = inputs;
    while (
      await seekKata(authToken, value as Language)
        .chain(getSupportedLanguages)
        .map(this.askAndSave)
        .run(client)
    ) {
      /** no op */
    }
  }

  private askAndSave = async ([, kataInfo, languages]: [
    AuthToken,
    KataInfo,
    Language[]
  ]): Promise<boolean> => {
    const { description, name, rankName } = kataInfo;
    console.log(wrapText(stripExample(description)));
    console.log(chalk.yellowBright(name), '-', chalk.blueBright(rankName), '\n');
    const { yes } = await prompts(
      {
        type: 'confirm',
        name: 'yes',
        message: 'Select?',
      },
      {
        onCancel: () => {
          console.log('👋');
          process.exit(0);
        },
      }
    );

    if (yes) {
      await this.saveKata([kataInfo, languages]);
      return false;
    } else {
      // continue;
      return true;
    }
  };

  private saveKata = async ([kataInfo, languages]: [KataInfo, Language[]]): Promise<void> => {
    const basedir = path.join(__dirname, '..', '..', 'problems', toFileName(kataInfo.name));
    if (
      await fs
        .access(basedir)
        .then(() => true)
        .catch(() => false)
    ) {
      console.log(`${kataInfo.name} is already exist`);
      process.exit(0);
    }

    const languageMap = languages.reduce((acc, lang) => {
      return { ...acc, [lang]: false };
    }, {});
    await fs.mkdir(basedir);
    await fs.writeFile(
      basedir + '/meta.json',
      JSON.stringify(
        {
          ...kataInfo,
          languages: languageMap,
          // remove properties
          language: undefined,
          slice: undefined,
          success: undefined,
          rankingHtml: undefined,
        },
        undefined,
        2
      )
    );
    console.log(`saved at`, chalk.greenBright(`problems/${toFileName(kataInfo.name)}`), `👍`);
    const script = `yarn generate javascript ${kataInfo.id}`;
    console.log(`to generate code (copied):\n${script}`);
    require('clipboardy').writeSync(script);
  };
}
