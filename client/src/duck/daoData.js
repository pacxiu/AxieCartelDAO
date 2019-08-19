export const SET_DATA = 'SET_DATA';
// setting initial state
const initialState = {
  members: null,
  tributes: null,
  proposals: null,
  general: null,
};

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { data } = payload;

  switch (action.type) {
    case SET_DATA:
      return { ...state, ...data };
    default:
      return state;
  }
};

// Action Creators
export const setData = data => (
  {
    type: SET_DATA,
    payload: { data },
  }
);
