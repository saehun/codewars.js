import signIn from '../sign-in';
import { createHttpClient } from '../core/http';
import pickKata from '../peek-kata';

test('sign-in e2e test', async () => {
  const result = await signIn().chain(pickKata).run(createHttpClient());
  console.log(result);
  expect(result).toBeTruthy();
});
