import { assert } from '@sindresorhus/is';
import { Input } from '../commands';
import { createHttpClient } from '../core/http';
import {
  checkValidId,
  fetchKataByLanguage,
  getSessionId,
  saveKataByLanguage,
} from '../fetchers/generate-kata';
import signIn from '../fetchers/sign-in';
import { validateLanguage } from '../utils/validate-language';
import { IAction } from './interface';

export class GenerateAction implements IAction {
  async handle(inputs: Input[]) {
    const [{ value: language }, { value: id }] = inputs;

    assert.string(id);
    assert.string(language);
    validateLanguage(language);

    const client = createHttpClient();
    const [meta, basedir] = await checkValidId({ language, id });

    await signIn()
      .chain(getSessionId({ language, id }))
      .chain(fetchKataByLanguage({ meta, basedir, language }))
      .chain(saveKataByLanguage({ meta, basedir, language }))
      .run(client);
  }
}
