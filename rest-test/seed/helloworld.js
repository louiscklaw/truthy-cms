'use strict';

import fetch from 'node-fetch';

import config from './config.js';

var response = await fetch(config.API_ENDPOINT, {
  method: 'GET',
});

var res_json = await response.json();

console.assert(res_json?.message, 'api helloworld failed');
