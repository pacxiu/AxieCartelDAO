import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { setMembers } from 'duck/daoData';
import { initContract as initWeb3Contract } from 'services/Web3Service';

export const initContract = async () => {
  const AxieDao = await initWeb3Contract(
    contracts.AxieDao.abi,
    contracts.AxieDao.address,
  );

  store.dispatch(setContract({ AxieDao }));
  return AxieDao;
};

export const getCurrentPeriod = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const currentPeriod = await AxieDao.methods.getCurrentPeriod().call();
  return currentPeriod;
};

const getMembersFromEvents = (events) => {
  const members = events
    .filter(event => event.event === 'ProcessProposal')
    .map(event => event.returnValues.applicant);

  store.dispatch(setMembers(members));
};

export const getAllEvents = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const events = await AxieDao.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  const processedProposals = 

  console.log(events);
  getMembersFromEvents(events);

  console.log(events.filter(event => event.event === 'ProcessProposal'))

  return events;
};

export const getMemberData = async (address) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const memberData = await AxieDao.methods.members(address).call();

  console.log(memberData);
};
