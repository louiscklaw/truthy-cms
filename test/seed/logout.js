'use strict';

import login from './login.js';

import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

import config from './config.js';

const cookie = await login();

async function logout(cookie) {
  return await fetch(`http://${config.API_HOST}/api/logout`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'content-type': 'application/json', cookie },
  });
}

export default logout;
