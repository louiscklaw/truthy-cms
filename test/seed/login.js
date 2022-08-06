'use strict';

import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

import config from './config.js';

const email = 'user1@truthy.com';
const password = 'Truthy@123';

async function login() {
  var response = await fetch(`http://${config.API_HOST}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      remember: true,
    }),
  });

  var res_cookie = response.headers.raw()['set-cookie'];
  return res_cookie;
}

export default login;