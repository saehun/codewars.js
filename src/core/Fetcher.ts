import { AxiosInstance } from 'axios';

type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

class Fetcher<T> {
  private constructor(private readonly fetch: (client: AxiosInstance) => Promise<T>) {}
  static of<T>(fetch: (client: AxiosInstance) => Promise<T>) {
    return new Fetcher(fetch);
  }

  tap(consume: (input: T) => Promise<void> | void): Fetcher<T> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      await consume(out);
      return out;
    });
  }

  map<O>(fn: (input: T) => Promise<O> | O): Fetcher<O> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      return fn(out);
    });
  }

  ap<I, O = T extends (arg: I) => any ? AsyncReturnType<T> : never>(
    input: Fetcher<I>
  ): O extends never ? never : Fetcher<O> {
    return new Fetcher(async client => {
      const fn = await this.run(client);
      if (typeof fn === 'function') {
        const arg = await input.run(client);
        return fn(arg);
      }
      throw new TypeError(`${fn} is not a function`);
    }) as O extends never ? never : Fetcher<O>;
  }

  chain<O>(next: (input: T) => Fetcher<O>): Fetcher<O> {
    return new Fetcher(async client => {
      const out = await this.run(client);
      return next(out).run(client);
    });
  }

  flat(): (client: AxiosInstance) => Promise<T> {
    return this.fetch;
  }

  async run(client: AxiosInstance): Promise<T> {
    return await this.fetch(client);
  }
}

export default Fetcher;
