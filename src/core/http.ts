import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import * as chalk from 'chalk';
import debug from 'debug';

const log = debug('http');

const defaultHeaders = {
  Authority: 'www.codewars.com',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
  'Sec-Ch-Ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-User': '?1',
  'Sec-Fetch-Dest': 'document',
  'Accept-Language': 'ko-KR,ko;q=0.9',
};

export function createHttpClient() {
  const instance = axios.create({
    baseURL: 'https://www.codewars.com',
    headers: { ...defaultHeaders },
    withCredentials: true,
    validateStatus: status => status < 400 /** allow 302 */,
    maxRedirects: 0,
  });

  axiosCookieJarSupport(instance);
  const cookieJar = new CookieJar();
  instance.defaults.jar = cookieJar;
  instance.interceptors.request.use(httpRequestLogger(cookieJar));
  instance.interceptors.response.use(httpResponseLogger(cookieJar));

  return instance;
}

function httpRequestLogger(cookieJar: CookieJar) {
  return (config: AxiosRequestConfig) => {
    const prefix = (more: string) => chalk.yellowBright('Request') + more;
    log(prefix('::URL::'), `${chalk.redBright(config.method)}::`, config.url);
    log(prefix('::Headers::'), JSON.stringify(config.headers, undefined, 2));
    log(prefix('::CookieJar::'), JSON.stringify(cookieJar, undefined, 2));
    if (/post|put|patch/gi.test(config.method || '')) {
      log(prefix('::Body::'), JSON.stringify(config.data, undefined, 2));
    }
    return config;
  };
}

function httpResponseLogger(cookieJar: CookieJar) {
  return (response: AxiosResponse) => {
    const prefix = (more: string) => chalk.greenBright('Response') + more;
    log(prefix('::Headers::'), JSON.stringify(response.headers, undefined, 2));
    log(prefix('::CookieJar::'), JSON.stringify(cookieJar, undefined, 2));
    return response;
  };
}
