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

// async approve(from, guy, wad, encodedPayload) {
//  // guy should be moloch contract
//  if (!this.contract) {
//    await this.initContract();
//  }
//
//  if (encodedPayload) {
//    const data = this.contract.methods.approve(guy, wad).encodeABI();
//    return data;
//  }
//
//  const approve = await this.contract.methods
//    .approve(guy, wad)
//    .send({ from })
//    .once('transactionHash', (txHash) => {})
//    .then((resp) => {
//      return resp;
//    })
//    .catch((err) => {
//      console.log(err);
//      return { error: 'rejected transaction' };
//    });
//
//  return approve;
// }
//
// async deposit(from, amount, encodedPayload) {
//  if (!this.contract) {
//    await this.initContract();
//  }
//
//  if (encodedPayload) {
//    const data = this.contract.methods.deposit().encodeABI();
//    return data;
//  }
//
//  let deposit = this.contract.methods
//    .deposit()
//    .send({ from, value: amount })
//    .once('transactionHash', (txHash) => {})
//    .then((resp) => {
//      return resp;
//    })
//    .catch((err) => {
//      console.log(err);
//      return { error: 'rejected transaction' };
//    });
//
//  return deposit;
// }
//
// async transfer(from, dist, wad, encodedPayload) {
//  if (!this.contract) {
//    await this.initContract();
//  }
//
//  if (encodedPayload) {
//    const data = this.contract.methods.transfer(dist, wad).encodeABI();
//    return data;
//  }
//
//  const trans = await this.contract.methods
//    .transfer(dist, wad)
//    .send({ from })
//    .once('transactionHash', (txHash) => {})
//    .then((resp) => {
//      return resp;
//    })
//    .catch((err) => {
//      console.log(err);
//      return { error: 'rejected transaction' };
//    });
//
//  return trans;
// }
