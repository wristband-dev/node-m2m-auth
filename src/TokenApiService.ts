import { Constants } from './utils/constants';
import { WristbandApiClient } from './WristbandApiClient';
import { addSecondsToCurrentTime, isExpired } from './utils/util';

const retry = require('async-retry');

export class TokenApiService {
  private wristbandApiClient: WristbandApiClient;
  private localCache = new Map();

  constructor(appDomain: string = '', clientId: string = '', clientSecret: string = '') {
    this.wristbandApiClient = new WristbandApiClient(appDomain, clientId, clientSecret);
  }

  async getToken() {
    const cachedAccessToken = this.localCache.get(Constants.ACCESS_TOKEN_KEY);
    const cachedTokenExpiration = this.localCache.get(Constants.ACCESS_TOKEN_EXPIRATION_KEY);

    // If the token exists and is not expired, then return token
    if (cachedAccessToken && !isExpired(cachedTokenExpiration)) {
      return cachedAccessToken;
    }

    try {
      let currentAccessToken = null;
      // Check if another request already started acquiring a new access token.
      if (this.localCache.get(Constants.IS_ACCESS_TOKEN_REFRESHING_KEY) === true) {
        await retry(
          () => {
            if (this.localCache.get(Constants.IS_ACCESS_TOKEN_REFRESHING_KEY)) {
              throw new Error('Blocked by a prior request on acquiring a new token.');
            }
            currentAccessToken = this.localCache.get(Constants.ACCESS_TOKEN_KEY);
          },
          {
            retries: 3,
            minTimeout: 100,
          },
        );
        // Otherwise, make the request to Wristband to acquire a new access token.
      } else {
        // Lock the other requests from proceeding so as not to have requests fired off with an old access token.
        this.localCache.set(Constants.IS_ACCESS_TOKEN_REFRESHING_KEY, true);
        await retry(
          async () => {
            const tokenResponse = await this.wristbandApiClient.axiosInstance.post(
              '/v1/oauth2/token',
              'grant_type=client_credentials',
            );
            const { access_token: accessToken, expires_in: expiresIn } = tokenResponse.data;
            const tokenExpiration = addSecondsToCurrentTime(expiresIn);

            this.localCache.set(Constants.ACCESS_TOKEN_KEY, accessToken);
            this.localCache.set(Constants.ACCESS_TOKEN_EXPIRATION_KEY, tokenExpiration);
            currentAccessToken = accessToken;
          },
          {
            retries: 2,
            minTimeout: 100,
          },
        );
      }

      return currentAccessToken;
    } catch (err) {
      throw new Error('Failed to acquire a new access token');
    } finally {
      // Always release the lock so other requests don't get blocked.
      this.localCache.set(Constants.IS_ACCESS_TOKEN_REFRESHING_KEY, false);
    }
  }

  clearCache() {
    this.localCache.set(Constants.ACCESS_TOKEN_KEY, null);
    this.localCache.set(Constants.ACCESS_TOKEN_EXPIRATION_KEY, null);
    this.localCache.set(Constants.IS_ACCESS_TOKEN_REFRESHING_KEY, false);
  }
}
