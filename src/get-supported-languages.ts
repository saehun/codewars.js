import Fetcher from './core/Fetcher';
import { AuthToken, KataInfo, Language } from './types';
import { withDom } from './core/withDom';
import { validateLanguage } from './utils/validate-language';

function getSupportedLanguages([authToken, kataInfo]: [AuthToken, KataInfo]) {
  return Fetcher.of(async client => {
    const { data } = await client.get(
      `https://www.codewars.com/kata/${kataInfo.id}/train/${kataInfo.language}`,
      {
        headers: {
          authorization: authToken.jwt,
          'x-csrf-token': authToken.csrfToken,
          referer: 'https://www.codewars.com/dashboard',
          accept: 'text/html, application/xhtml+xml',
        },
      }
    );
    return [authToken, kataInfo, parseSupportedLangauge(data)] as const;
  });
}

const parseSupportedLangauge = withDom<Language[]>((_, html) => {
  const parsed = html.match(/<dd data-href=.+? data-value=.+?>/g);
  if (parsed == null) {
    throw new Error(`Parse failed, ${html}`);
  }
  return parsed.map(tag => {
    const language = /data-value="(.+?)"/.exec(tag)![1];
    validateLanguage(language);
    return language;
  });
});

/**
 * Main export
 */
export default getSupportedLanguages;

/**
 * Test export
 */
export const __test__ = {
  parseSupportedLangauge,
};
