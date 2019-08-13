export const SET_CONTRACT = 'SET_CONTRACT';

// setting initial state
const initialState = {
  AxieDao: null,
};

// Reducer
export default (state = initialState, action = {}) => {
  const { payload = {} } = action;
  const { contract } = payload;

  switch (action.type) {
    case SET_CONTRACT:
      return { ...state, ...contract };
    default:
      return state;
  }
};

// Action Creators
export const setContract = contract => (
  {
    type: SET_CONTRACT,
    payload: { contract },
  }
);
