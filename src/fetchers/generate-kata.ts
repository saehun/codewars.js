import Fetcher from '../core/Fetcher';
import * as fs from 'fs/promises';
import * as path from 'path';
import is from '@sindresorhus/is';
import { AuthToken, Language, Meta, SessionData } from '../types';
import { generators } from '../core/generators/generate';

interface SessionInput {
  language: string;
  id: string;
}

interface GenerationInput {
  meta: Meta;
  basedir: string;
  language: Language;
}

export const getSessionId = ({ id, language }: SessionInput) => (authToken: AuthToken) => {
  return Fetcher.of(async client => {
    const { data } = await client.get(`https://www.codewars.com/kata/${id}/train/${language}`, {
      headers: {
        authorization: authToken.jwt,
        'x-csrf-token': authToken.csrfToken,
        referer: 'https://www.codewars.com/dashboard',
        accept: 'text/html, application/xhtml+xml',
      },
    });
    return [authToken, parseUrl(data)];
  });

  function parseUrl(html: string): string {
    const parsed = /"session":"\/kata\/projects\/(.+?)\/.*"/.exec(html);
    if (parsed == null) {
      throw new Error(`Failed to parse session id`);
    }
    return parsed[1];
  }
};

export const fetchKataByLanguage = ({ language, meta }: GenerationInput) => ([
  authToken,
  sessionId,
]: [AuthToken, string]) =>
  Fetcher.of(async client => {
    const { data } = await client.post<SessionData>(
      `https://www.codewars.com/kata/projects/${sessionId}/${language}/session`,
      undefined,
      {
        headers: {
          authorization: authToken.jwt,
          'x-csrf-token': authToken.csrfToken,
          referer: `https://www.codewars.com/kata/${meta.id}/train/${language}`,
          accept: 'application/json, text/plain, */*',
        },
      }
    );
    return data;
  });

export const saveKataByLanguage = ({ basedir, language, meta }: GenerationInput) => (
  session: SessionData
) =>
  Fetcher.of(async () => {
    return await generators(language).generate({
      session,
      meta,
      basedir,
    });
  });

export const checkValidId = async ({ language, id }: SessionInput): Promise<[Meta, string]> => {
  return await findKata();

  async function findKata() {
    const basedir = path.join(__dirname, '..', '..', 'problems');
    const dirs = await fs.readdir(basedir);

    const metaJsons = await Promise.all(
      dirs
        .map(dir => basedir + '/' + dir)
        .map(async dir => {
          return [await readMetaJson(dir), dir] as const;
        })
    );

    const metaJson = metaJsons.find(item => {
      const [meta] = item;
      if (meta == null) {
        return false;
      }
      if (meta.id === id) {
        if (is.boolean(meta.languages[language as Language])) {
          return true;
        } else {
          throw new Error(`${meta.name} is not support the language '${language}'`);
        }
      }
      return false;
    }) as [Meta, string];

    if (metaJson == null) {
      throw new Error(`Cannot find kata of id '${id}'`);
    }
    return metaJson;
  }

  async function readMetaJson(basedir: string): Promise<Meta | null> {
    try {
      return JSON.parse(await fs.readFile(basedir + '/meta.json', 'utf-8')) as Meta;
    } catch (e) {
      return null;
    }
  }
};
