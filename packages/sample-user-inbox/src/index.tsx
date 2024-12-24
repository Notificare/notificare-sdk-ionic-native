/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const domain = process.env.REACT_APP_USER_INBOX_CLIENT_DOMAIN;
const clientId = process.env.REACT_APP_USER_INBOX_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={domain!}
    clientId={clientId!}
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
    authorizationParams={{
      redirect_uri: `re.notifica.sample.user.inbox.app.dev://${domain!}/capacitor/re.notifica.sample.user.inbox.app.dev/callback`,
    }}
  >
    <App />
  </Auth0Provider>
);
