import Web3 from 'web3';
import store from 'store';

import { setAddress } from 'duck/user';
import { setWeb3 } from 'duck/web3';

const initAccountAddres = (web3) => {
  const { address } = store.getState().user;

  web3.eth.getAccounts().then(async (accounts) => {
    if (accounts[0] !== address) {
      store.dispatch(setAddress(accounts[0]));
    }
    return null;
  });

  // checking if user switched accounts in interval
  setTimeout(() => {
    initAccountAddres(web3);
  }, 2000);
};

export const initWeb3 = async () => {
  let { web3 } = window;

  // new privacy mode -> request account access if needed
  if (window.ethereum) {
    // eslint-disable-next-line
    web3 = new Web3(ethereum);
    try {
      // eslint-disable-next-line
      await ethereum.enable();
    } catch (error) {
      // if user denies access
      console.error(error);
    }
  } else if (web3) {
    // old way of asking for web3
    web3 = new Web3(web3.currentProvider);
  } else {
    // connect to custom provider, like Infura if there is no wallet detected
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/Fi6gFcfwLWXX6YUOnke8'));
  }

  store.dispatch(setWeb3(web3));
  initAccountAddres(web3);
};

export const initContract = (abi, address) => {
  const { web3 } = store.getState();

  if (!web3) {
    return new Promise(resolve => setTimeout(() => {
      console.log('he')
      initContract(abi, address);
    }, 1000));
  }

  return new web3.eth.Contract(abi, address);
};
