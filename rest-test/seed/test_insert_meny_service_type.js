'use strict';
import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

import config from './config.js';
import login from './login.js';
import logout from './logout.js';

try {
  console.log('clearall meny service type');
  var auth_cookie = await login();

  var response = await fetch(`${config.API_ENDPOINT}/meny-service-type/delete_all`, {
    method: 'DELETE',
  });

  var res_json = await response;
  console.log(res_json);
  await logout(auth_cookie);
} catch (error) {
  console.log(error);
}

// try {
//   console.log('create meny service type');
//   var auth_cookie = await login();

//   var response = await fetch(`${config.API_ENDPOINT}/meny-service-type`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'meny',
//       description: 'hello description',
//       canEditMenu: true,
//       canEditRestaurant: true,
//       canProcessStayOrder: true,
//       canProcessTakeAwayOrder: true,
//     }),
//   });

//   var res_json = await response;
//   console.log(res_json);
//   await logout(auth_cookie);
// } catch (error) {
//   console.log(error);
// }

// try {
//   console.log('create meny_light service type');
//   var auth_cookie = await login();

//   var response = await fetch(`${config.API_ENDPOINT}/meny-service-type`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'meny_light',
//       description: 'hello description',
//       canEditMenu: true,
//       canEditRestaurant: true,
//       canProcessStayOrder: true,
//       canProcessTakeAwayOrder: true,
//     }),
//   });

//   var res_json = await response;
//   console.log(res_json);
//   await logout(auth_cookie);
// } catch (error) {
//   console.log(error);
// }

// try {
//   console.log('create meny_takeaway service type');
//   var auth_cookie = await login();

//   var response = await fetch(`${config.API_ENDPOINT}/meny-service-type`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'meny_takeaway',
//       description: 'hello description',
//       canEditMenu: true,
//       canEditRestaurant: true,
//       canProcessStayOrder: true,
//       canProcessTakeAwayOrder: true,
//     }),
//   });

//   var res_json = await response;
//   console.log(res_json);
//   await logout(auth_cookie);
// } catch (error) {
//   console.log(error);
// }
