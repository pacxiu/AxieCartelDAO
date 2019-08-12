import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import web3 from './web3';
import user from './user';
import contracts from './contracts';

const reducers = combineReducers({
  notifications,
  web3,
  user,
  contracts,
});

export default reducers;
