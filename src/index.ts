import { TokenApiService } from './TokenApiService';

type Config = {
  appDomain: string;
  clientId: string;
  clientSecret: string;
};

export class WristbandM2MClient {
  private tokenAPI: TokenApiService;

  constructor({ appDomain, clientId, clientSecret }: Config) {
    this.tokenAPI = new TokenApiService(appDomain, clientId, clientSecret);
  }
  async getToken() {
    return this.tokenAPI.getToken();
  }
  async clearToken() {
    return this.tokenAPI.clearCache();
  }
}
