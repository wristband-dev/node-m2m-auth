<div align="center">
  <a href="https://wristband.dev">
    <picture>
      <img src="https://assets.wristband.dev/images/email_branding_logo_v1.png" alt="Github" width="297" height="64">
    </picture>
  </a>
  <p align="center">
    Enterprise-ready auth that is secure by default, truly multi-tenant, and ungated for small businesses.
  </p>
  <p align="center">
    <b>
      <a href="https://wristband.dev">Website</a> • 
      <a href="https://docs.wristband.dev/">Documentation</a>
    </b>
  </p>
</div>

<br/>

---

<br/>

# Wristband Machine-to-Machine Authentication SDK for NodeJS

[![npm package](https://img.shields.io/badge/npm%20i-@wristband/node--m2m--auth-brightgreen)](https://www.npmjs.com/package/@wristband/node-m2m-auth)
[![version number](https://img.shields.io/github/v/release/wristband-dev/node-m2m-auth?color=green&label=version)](https://github.com/wristband-dev/node-m2m-auth/releases)
[![Actions Status](https://github.com/wristband-dev/node-m2m-auth/workflows/Test/badge.svg)](https://github.com/wristband-dev/node-m2m-auth/actions)
[![License](https://img.shields.io/github/license/wristband-dev/node-m2m-auth)](https://github.com/wristband-dev/node-m2m-auth/blob/main/LICENSE.md)



## Overview

This SDK can be used by Wristband machine-to-machine clients to retrieve an access token. The access token is cached in memory for subsequent calls. When the access token expires, the SDK will automatically get a new access token. The cached access token is tied to an instance of a `WristbandM2MClient`. Therefore, it's optimal to create a single instance
of the `WristbandM2MClient` so that the access token cache will be utilized globally.

### Install from NPM

```sh
npm install @wristband/node-m2m-auth
```

### Usage

```ts
import { WristbandM2MClient } from '@wristband/node-m2m-auth'

const APPLICATION_DOMAIN=process.env.APPLICATION_DOMAIN;  // env variables
const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;

const wristbandM2MClient = new WristbandM2MClient( {
  appDomain: APPLICATION_DOMAIN, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET
});

const accessToken = await wristbandM2MClient.getToken();
```

### Configuration
**APPLICATION_DOMAIN -** This is the vanity domain for the Wristband application associated to the machine-to-machine client.

**CLIENT_ID -** This is the Wristband machine-to-machine client ID.

**CLIENT_SECRET -** This is the Wristband machine-to-machine client secret.

### SDK Methods
**getToken() -** This method retrieves an access token for the machine-to-machine client.
The access token is cached in memory for subsequent calls. When the access token expires, this method will automatically
get a new access token when it's called.

**clearToken() -** This method clears the access token in the cache. 
