import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { initContract as initWeb3Contract, fromWei } from 'services/Web3Service';

// export const EVENTS = {
//   SubmitProposal: 'SubmitProposal',
//   SubmitVote: 'SubmitVote',
//   ProcessProposal: 'ProcessProposal',
//   Ragequit: 'Ragequit',
//   Abort: 'Abort',
//   UpdateDelegateKey: 'UpdateDelegateKey',
//   SummonComplete: 'SummonComplete',
// }

export const initContract = async () => {
  const GuildBank = await initWeb3Contract(
    contracts.GuildBank.abi,
    contracts.GuildBank.address,
  );

  store.dispatch(setContract({ GuildBank }));
  return GuildBank;
};

export const getAllEvents = async () => {
  let { GuildBank } = store.getState().contracts;

  if (!GuildBank) {
    GuildBank = await initContract();
  }

  const events = await GuildBank.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  return events;
};

