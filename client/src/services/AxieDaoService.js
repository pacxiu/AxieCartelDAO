import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { setData } from 'duck/daoData';
import { initContract as initWeb3Contract, fromWei } from 'services/Web3Service';

// event SubmitProposal(uint256 proposalIndex, address indexed delegateKey, address indexed memberAddress, address indexed applicant, uint256 tokenTribute, uint256 sharesRequested);
// event SubmitVote(uint256 indexed proposalIndex, address indexed delegateKey, address indexed memberAddress, uint8 uintVote);
// event ProcessProposal(uint256 indexed proposalIndex, address indexed applicant, address indexed memberAddress, uint256 tokenTribute, uint256 sharesRequested, bool didPass);
// event Ragequit(address indexed memberAddress, uint256 sharesToBurn);
// event Abort(uint256 indexed proposalIndex, address applicantAddress);
// event UpdateDelegateKey(address indexed memberAddress, address newDelegateKey);
// event SummonComplete(address indexed summoner, uint256 shares);

export const EVENTS = {
  SubmitProposal: 'SubmitProposal',
  SubmitVote: 'SubmitVote',
  ProcessProposal: 'ProcessProposal',
  Ragequit: 'Ragequit',
  Abort: 'Abort',
  UpdateDelegateKey: 'UpdateDelegateKey',
  SummonComplete: 'SummonComplete',
}

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

const getDataFromEvents = (events) => {
  const members = [];
  const tributes = {};
  const proposals = {
    total: [],
    processed: 0,
    aborted: 0,
  }

  events.forEach(({
    event,
    returnValues: {
      applicant,
      tokenTribute,
      summoner,
      proposalIndex,
      didPass,
    },
  }) => {
    switch (event) {
      case EVENTS.SubmitProposal:
        proposals.total.push(proposalIndex);

        break;
      case EVENTS.Abort:
        proposals.aborted += 1;

        break;
      case EVENTS.ProcessProposal: {
        if (didPass) {
          const tribute = parseInt(fromWei(tokenTribute), 10);
          members.push(applicant);
          tributes[applicant] = tributes[applicant] ? tributes[applicant] + tribute : tribute;
        }
        proposals.processed += 1;

        break;
      }
      case EVENTS.SummonComplete:
        members.push(summoner);
        tributes[summoner] = 0;
        break;
      default:
        break;
    }
  });

  const uniqueMembers = [...new Set(members)];

  store.dispatch(setData({
    members: uniqueMembers,
    tributes,
    proposals,
  }));
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

  getDataFromEvents(events);

  return events;
};

export const getMemberData = async (address) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    console.log(AxieDao, address);
    AxieDao = await initContract();
  }

  const memberData = await AxieDao.methods.members(address).call();
  return memberData;
};

export const getProposalData = async (id) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const proposalData = await AxieDao.methods.proposalQueue(id).call();
  return proposalData;
};
