import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { initContract as initWeb3Contract, fromWei } from 'services/Web3Service';

export const initContract = async () => {
  const ApprovedToken = await initWeb3Contract(
    contracts.ApprovedToken.abi,
    contracts.ApprovedToken.address,
  );

  store.dispatch(setContract({ ApprovedToken }));
  return ApprovedToken;
};

export const totalSupply = async () => {
  let { ApprovedToken } = store.getState().contracts;

  if (!ApprovedToken) {
    ApprovedToken = await initContract();
  }

  const totalSupply = await ApprovedToken.methods.totalSupply().call();
  return totalSupply;
};

export const balanceOf = async (account) => {
  let { ApprovedToken } = store.getState().contracts;

  if (!ApprovedToken) {
    ApprovedToken = await initContract();
  }

  const balanceOf = await ApprovedToken.methods
    .balanceOf(account)
    .call();

  return fromWei(balanceOf);
};

export const allowance = async (accountAddr, contractAddr) => {
  let { ApprovedToken } = store.getState().contracts;

  if (!ApprovedToken) {
    ApprovedToken = await initContract();
  }

  const allowance = await ApprovedToken.methods
    .allowance(accountAddr, contractAddr)
    .call();
  return allowance;
};

export const approve = async (guy, wad, encodedPayload) => {
  // guy should be moloch contract
  const { contracts, user: { address } } = store.getState();
  let { ApprovedToken } = contracts;

  if (!ApprovedToken) {
    ApprovedToken = await initContract();
  }

  if (encodedPayload) {
    const data = ApprovedToken.methods.approve(guy, wad).encodeABI();
    return data;
  }

  const approve = await ApprovedToken.methods
    .approve(guy, wad)
    .send({ from: address })
    .once('transactionHash', (txHash) => {})
    .then(resp => resp)
    .catch((err) => {
      console.error(err);
      return { error: 'rejected transaction' };
    });

  return approve;
};
