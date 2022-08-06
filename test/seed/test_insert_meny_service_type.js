'use strict';
import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

import config from './config.js';
import login from './login.js';
import logout from './logout.js';

try {
  var auth_cookie = await login();

  var response = await fetch(`http://${config.API_HOST}/api/meny-service-type`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'meny',
      description: 'hello description',
      canEditMenu: true,
      canEditRestaurant: true,
      canProcessStayOrder: true,
      canProcessTakeAwayOrder: true,
    }),
  });

  var res_json = await response;
  console.log(res_json);
  await logout(auth_cookie);
} catch (error) {
  console.log(error);
}
