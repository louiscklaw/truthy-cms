// /home/logic/_workspace/truthy-cms/cms-app/src/__fake-api__/auth-api.js

import { createResourceId } from '../utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from '../utils/jwt';
import { wait } from '../utils/wait';
import axios from 'axios';

class AuthApi {
  async login({ email, password }) {
    return axios.post(`/api/auth/login`, { email, password, remember: true }, { withCredentials: true });
  }

  async register({ email, name, password }) {}

  me(accessToken) {}
}

export const authApi = new AuthApi();
