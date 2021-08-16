import { createHttpClient } from './core/http';
import signIn from './fetchers/sign-in';

(async () => {
  const client = createHttpClient();
  signIn().tap(console.log).run(client);
})();
