import signIn from '../sign-in';
import { createHttpClient } from '../core/http';
import seekKata from '../seek';

test('sign-in e2e test', async () => {
  const result = await signIn().chain(seekKata).run(createHttpClient());
  console.log(result);
  expect(result).toBeTruthy();
});
