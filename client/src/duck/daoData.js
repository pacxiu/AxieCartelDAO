import { SET_MEMBERS } from './types';

// setting initial state
const initialState = {
  members: null,
};

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { members } = payload;

  switch (action.type) {
    case SET_MEMBERS:
      return { ...state, members };
    default:
      return state;
  }
};

// Action Creators
export const setMembers = members => (
  {
    type: SET_MEMBERS,
    payload: { members },
  }
);
