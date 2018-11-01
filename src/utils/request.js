import path from 'path';

import config from '../config';

export const request = (method, url, body) =>
  fetch(`${config.api.baseUrl}${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  }).then(response => response.json());
