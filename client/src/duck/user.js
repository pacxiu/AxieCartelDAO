import { SET_ADDRESS, SET_TOKEN, SET_USER_DATA } from './types';

// setting initial state
const initialState = {
  address: null,
  token: null,
  nickname: null,
};

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { address, token, userData } = payload;

  switch (action.type) {
    case SET_ADDRESS:
      return { ...state, address };
    case SET_TOKEN:
      return { ...state, token };
    case SET_USER_DATA:
      return { ...state, ...userData };
    default:
      return state;
  }
};

// Action Creators
export const setAddress = address => (
  {
    type: SET_ADDRESS,
    payload: { address },
  }
);

export const setToken = token => (
  {
    type: SET_TOKEN,
    payload: { token },
  }
);

export const setUserData = userData => (
  {
    type: SET_USER_DATA,
    payload: { userData },
  }
);
