import Fetcher from './core/Fetcher';
import { AuthToken, KataInfo, Language } from './types';
import * as yup from 'yup';

function pickKata(authToken: AuthToken, language: Language = 'javascript') {
  return Fetcher.of(async client => {
    const { data } = await client.get(
      `https://www.codewars.com/trainer/peek/${language}/default?dequeue=true`,
      {
        headers: {
          authorization: authToken.jwt,
          'x-csrf-token': authToken.csrfToken,
          referer: 'https://www.codewars.com/dashboard',
          accept: 'application/json, text/plain, */*',
        },
      }
    );
    return schema.validateSync(data) as KataInfo;
  });
}

/**
 * KataInfo Schema
 */
const schema = yup.object().shape({
  success: yup.boolean().required(),
  strategy: yup.string().required(),
  language: yup.string().required(),
  slice: yup.object(),
  id: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  systemTags: yup.array(),
  rank: yup.number().required(),
  rankName: yup.string().required(),
  rankingHtml: yup.string().required(),
  href: yup.string().required(),
});

export default pickKata;
