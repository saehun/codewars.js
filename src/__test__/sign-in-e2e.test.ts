import signIn from '../sign-in';
import { createHttpClient } from '../core/http';

test('sign-in e2e test', async () => {
  const result = await signIn().run(createHttpClient());
  console.log(result);
  expect(result).toBeTruthy();
});
