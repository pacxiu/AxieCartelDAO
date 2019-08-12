import { SET_WEB3 } from './types';

// setting initial state
const initialState = null;

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { web3 } = payload;

  switch (action.type) {
    case SET_WEB3:
      return web3;
    default:
      return state;
  }
};

// Action Creators
export const setWeb3 = web3 => (
  {
    type: SET_WEB3,
    payload: { web3 },
  }
);
