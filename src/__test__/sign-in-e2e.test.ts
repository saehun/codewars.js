import { createHttpClient } from '../core/http';
import signIn from '../fetchers/sign-in';
import seekKata from '../fetchers/seek-kata';

test('sign-in e2e test', async () => {
  const result = await signIn().chain(seekKata).run(createHttpClient());
  console.log(result);
  expect(result).toBeTruthy();
});
