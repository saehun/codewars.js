import Fetcher from './core/Fetcher';
import { assert } from '@sindresorhus/is';
import { credential } from './core/credentials';
import { withDom } from './core/withDom';

const fetchSignInPage = () =>
  Fetcher.of(async client => {
    const { data } = await client.get<string>('/users/sign_in');
    return data;
  });

const parseAuthenticityToken = withDom($ => {
  const token = $('input[name="authenticity_token"]').val();
  assert.nonEmptyString(token);
  return token;
});

const fetchSignIn = (token: string) =>
  Fetcher.of(async client => {
    const { id, password } = credential();
    const params = new URLSearchParams({
      utf8: '✓',
      authenticity_token: token,
      'user[email]': id,
      'user[password]': password,
      'user[remember_me]': 'true',
    }).toString();

    const { data } = await client.post<string>('/users/sign_in', params, {
      headers: {
        referer: 'https://www.codewars.com/users/sign_in',
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    return data;
  });

const fetchDashbaord = () =>
  Fetcher.of(async client => {
    const { data } = await client.get<string>('/dashboard', {
      headers: {
        referer: 'https://www.codewars.com/users/sign_in',
      },
    });
    return data;
  });

const parseDashboard = withDom($ => {
  return {
    CSRFToken: '',
  };
});

function signIn() {
  return fetchSignInPage()
    .map(parseAuthenticityToken)
    .chain(fetchSignIn)
    .chain(fetchDashbaord)
    .map(parseDashboard);
}

/**
 * Export
 */
export default signIn;
export const __test__ = {
  parseAuthenticityToken,
};
