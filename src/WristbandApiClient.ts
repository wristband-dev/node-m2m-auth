import axios, { AxiosInstance } from 'axios';

import { Constants } from './utils/constants';

import { httpKeepAliveAgent, httpsKeepAliveAgent } from './keep-alive-agent/keep-alive-agent';

export class WristbandApiClient {
  public axiosInstance: AxiosInstance;

  constructor(appDomain: string = '', clientId: string = '', clientSecret: string = '') {
    this.axiosInstance = axios.create({
      auth: { username: clientId!, password: clientSecret! },
      baseURL: `https://${appDomain}/api`,
      httpAgent: httpKeepAliveAgent,
      httpsAgent: httpsKeepAliveAgent,
      headers: { 'Content-Type': Constants.FORM_URLENCODED_MEDIA_TYPE, Accept: Constants.JSON_MEDIA_TYPE },
      maxRedirects: 0,
    });
  }
}
