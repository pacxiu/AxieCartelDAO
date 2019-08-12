import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { initContract as initWeb3Contract } from 'services/Web3Service';

export const initContract = async () => {
  const AxieDao = await initWeb3Contract(
    contracts.AxieDao.abi,
    contracts.AxieDao.address,
  );

  store.dispatch(setContract({ AxieDao }));
  return AxieDao;
}

export const getCurrentPeriod = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const currentPeriod = await AxieDao.methods.getCurrentPeriod().call();
  return currentPeriod;
}

export const getAllEvents = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const events = await AxieDao.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  console.log(events);
  const processed = events.filter(event => event.event === 'ProcessProposal').map(event => event.returnValues.applicant);
  console.log(processed);

  return events;
}
