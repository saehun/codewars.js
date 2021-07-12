import { load } from 'cheerio';

export function withDom<T>(fn: ($: cheerio.Root, html: string) => T) {
  return (html: string): T => {
    const $ = load(html);
    return fn($, html);
  };
}
