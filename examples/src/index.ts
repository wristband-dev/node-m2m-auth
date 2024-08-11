import { WristbandM2MClient } from '@wristband/node-m2m-auth';

const APPLICATION_DOMAIN = 'appDomain';
const CLIENT_ID = 'clientId';
const CLIENT_SECRET = 'clientSecret';

const wristbandM2MClient = new WristbandM2MClient({
  appDomain: APPLICATION_DOMAIN, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET
});

(async () => {
  const result = await wristbandM2MClient.getToken();
  console.log(result);
  const result2 = await wristbandM2MClient.getToken();
  console.log(result2);
})();
