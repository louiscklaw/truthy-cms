'use strict';
import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

import login from './login.js';
import logout from './logout.js';

var auth_cookie = await login();

await fetch('http://test.docker.localhost/api/restaurants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'restaurant 1',
    location: 'hong kong',
    isActive: true,
  }),
});

await logout(auth_cookie);