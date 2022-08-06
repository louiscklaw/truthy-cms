'use strict';

import fetch, { FormData, Blob, blobFrom, blobFromSync, File, fileFrom, fileFromSync } from 'node-fetch';

const params = new URLSearchParams();
params.append('username', 'admin');
params.append('password', 'superSecure');

var response = await fetch('http://localhost:7777/api', {
  method: 'GET',
});

var res_json = await response.json();
