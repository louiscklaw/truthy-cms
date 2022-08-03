// /home/logic/_workspace/truthy-cms/cms-app/src/__fake-api__/auth-api.js

import { createResourceId } from '../utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from '../utils/jwt';
import { wait } from '../utils/wait';
import axios from 'axios';

import jwt_decode from 'jwt-decode';

class AuthApi {
  async login({ email, password }) {
    return axios.post(`/api/auth/login`, { email, password, remember: true }, { withCredentials: true });
  }

  async register({ email, name, password }) {}

  async logout() {
    return axios.post('/api/logout', {}, { withCredentials: true });
  }

  me(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        let jwt_decoded = jwt_decode(accessToken);
        let { user } = jwt_decoded;

        console.log({ user });

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve(user);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
