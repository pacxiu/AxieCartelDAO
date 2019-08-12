import axios from 'axios';
import store from 'store';
import Notifications from 'react-notification-system-redux';

import { setToken } from 'duck/user';

const errorOptions = {
  title: 'Authentication required',
  message: 'To perform this action you need to be logged in with Metamask!',
  position: 'tr',
  autoDismiss: 5,
};

const successOptions = {
  title: 'Success',
  position: 'tr',
  autoDismiss: 5,
};

export const setCookie = (token) => {
  const date = new Date();
  // 30d
  date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `token=${token}; ${expires}; path=/`;
};

export const createRequest = async (method, url, data) => {
  const { user } = store.getState();
  const { web3 } = store.getState().web3;
  let responseData:any;
  const headers:any = {};
  let params = {};

  headers.Authorization = user.token;

  if (data) {
    data.address = user.address;
  }

  if (method === 'get' && data) {
    params = { ...data };
  }

  await axios({
    method,
    url,
    headers,
    data,
    params,
  })
    .then((response) => {
      responseData = response;
    })
    .catch(async (error) => {
      responseData = (error.response && error.response.data.message) || error;

      if (error.response.status === 401) {
        store.dispatch(Notifications.error(errorOptions));
        await web3.eth.personal.sign(web3.utils.fromUtf8('DappsUniverse login'), user.address, async (err, res) => {
          const response = await createRequest('get', '/api/login', { signature: res });

          if (response.status === 200) {
            const { token } = response.data;
            store.dispatch(setToken(token));
            setCookie(token);
            // createRequest(method, url, data);
          }
        });
      }
    });

  if (responseData.status === 200 && method !== 'get') {
    store.dispatch(Notifications.success({ ...successOptions, message: responseData.data.message }));
  }

  return responseData;
};

export const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
