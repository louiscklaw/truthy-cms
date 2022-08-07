'use strict';

import login from './login.js';

import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

import config from './config.js';

async function logout(cookie) {
  var response = await fetch(`${config.API_ENDPOINT}/logout`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'content-type': 'application/json', cookie },
  });
  console.assert(response.status == 204, 'logout failed');
}

export default logout;

// const cookie = await login();
// logout(cookie);
