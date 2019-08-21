import contracts from 'shared/contracts';
import store from 'store';

import { setContract } from 'duck/contracts';
import { setData } from 'duck/daoData';
import { initContract as initWeb3Contract, fromWei } from 'services/Web3Service';
import { balanceOf } from 'services/ApprovedTokenService';
import { ProposalStatus } from 'shared/proposals';

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
};

export const initContract = async () => {
  const AxieDao = await initWeb3Contract(
    contracts.AxieDao.abi,
    contracts.AxieDao.address,
  );

  store.dispatch(setContract({ AxieDao }));
  return AxieDao;
};

// DYNAMIC DATA
export const getMemberData = async (address) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
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

// STATIC Fields from contract
// including config stuff
export const getCurrentPeriod = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const currentPeriod = await AxieDao.methods.getCurrentPeriod().call();
  return currentPeriod;
};

export const getGracePeriodLength = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const gracePeriod = await AxieDao.methods.gracePeriodLength().call();
  return gracePeriod;
};

export const getVotingPeriodLength = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const votingPeriod = await AxieDao.methods.votingPeriodLength().call();
  return votingPeriod;
};

export const getPeriodDuration = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const periodDuration = await AxieDao.methods.periodDuration().call();
  return periodDuration;
};

// other data
export const getTotalShares = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const totalShares = await AxieDao.methods.totalShares().call();
  return totalShares;
};

export const getProcessingReward = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const processingReward = await AxieDao.methods.processingReward().call();
  return processingReward;
};

export const getProposalDeposit = async () => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const proposalDeposit = await AxieDao.methods.proposalDeposit().call();
  return proposalDeposit;
};

// MODIFIERS
export const canRagequit = async (lastVote) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  const canRagequit = await AxieDao.methods.canRagequit(lastVote).call();
  return canRagequit;
};

// INTERACT WITH CONTRACT
// TO DO: rework encodePayload and tx repetetive stuff
export const submitVote = async (from, proposalIndex, uintVote, encodedPayload) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  if (encodedPayload) {
    const data = AxieDao.methods
      .submitVote(proposalIndex, uintVote)
      .encodeABI();
    return data;
  }

  const vote = AxieDao.methods
    .submitVote(proposalIndex, uintVote)
    .send({ from })
    .once('transactionHash', txHash => console.info(txHash))
    .then(resp => resp)
    .catch((err) => {
      console.error(err);
      return { error: 'rejected transaction' };
    });
  return vote;
};

export const rageQuit = async (from, amount, encodedPayload) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  if (encodedPayload) {
    const data = AxieDao.methods.ragequit(amount).encodeABI();
    return data;
  }

  const rage = AxieDao.methods
    .ragequit(amount)
    .send({ from })
    .once('transactionHash', txHash => console.info(txHash))
    .then(resp => resp)
    .catch((err) => {
      console.error(err);
      return { error: 'rejected transaction' };
    });
  return rage;
};

export const processProposal = async (from, id, encodedPayload) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  if (encodedPayload) {
    const data = AxieDao.methods.processProposal(id).encodeABI();
    return data;
  }

  const processedProposal = AxieDao.methods
    .processProposal(id)
    .send({ from })
    .once('transactionHash', txHash => console.info(txHash))
    .then(resp => resp)
    .catch((err) => {
      console.error(err);
      return { error: 'rejected transaction' };
    });
  return processedProposal;
};

export const submitProposal = async (
  from,
  applicant,
  tokenTribute,
  sharesRequested,
  details,
  encodedPayload = false,
) => {
  let { AxieDao } = store.getState().contracts;

  if (!AxieDao) {
    AxieDao = await initContract();
  }

  if (encodedPayload) {
    const data = AxieDao.methods
      .submitProposal(applicant, tokenTribute, sharesRequested, details)
      .encodeABI();
    return data;
  }

  const proposal = AxieDao.methods
    .submitProposal(applicant, tokenTribute, sharesRequested, details)
    .send({ from })
    .once('transactionHash', txHash => console.info(txHash))
    .then(resp => resp)
    .catch((err) => {
      console.error(err);
      return { error: 'rejected transaction' };
    });

  return proposal;
};

const getGeneralData = async () => {
  const shares = await getTotalShares();
  const currentPeriod = await getCurrentPeriod();
  // eslint-disable-next-line
  const bank = await balanceOf(contracts.GuildBank.address);
  // probably will not be dynamically changed
  // const gracePeriodLength = await getGracePeriodLength();
  // const votingPeriodLength = await getVotingPeriodLength();
  // const periodDuration = await getPeriodDuration();

  return {
    shares,
    bank,
    currentPeriod,
    gracePeriodLength: 35,
    votingPeriodLength: 35,
    periodDuration: 17280,
  };
};

const getDataFromEvents = (events, general) => {
  const members = [];
  const tributes = {};
  const proposals = {
    total: [],
    processed: 0,
    aborted: 0,
  };

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
    general,
    initialized: true,
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

  const general = await getGeneralData();

  getDataFromEvents(events, general);

  return events;
};

// Helper utils for getting structured data for members and proposals
export const getAllMembersData = async () => {
  const { members, tributes } = store.getState().daoData;

  const membersDataRequest = [];
  const membersData = [];

  members.forEach((member) => {
    membersDataRequest.push(getMemberData(member));
  });

  await Promise.all(membersDataRequest)
    .then((values) => {
      values.forEach(({
        delegateKey,
        exists,
        highestIndexYesVote,
        shares,
      }, i) => {
        membersData.push({
          address: members[i],
          tribute: tributes[members[i]],
          delegateKey,
          exists,
          highestIndexYesVote,
          shares,
        });
      });

      store.dispatch(setData({
        membersData,
      }));
    });
};

export const getAllProposalsData = async () => {
  const { proposals, general } = store.getState().daoData;
  const { periodDuration, votingPeriodLength, gracePeriodLength, currentPeriod } = general;
  const totalGracePeriod = votingPeriodLength + gracePeriodLength;
  const { VOTING, GRACE, COMPLETED, READY_FOR_PROCESSING } = ProposalStatus;

  const proposalsDataRequest = [];
  const proposalsData = [];

  proposals.total.forEach((proposal) => {
    proposalsDataRequest.push(getProposalData(proposal));
  });

  await Promise.all(proposalsDataRequest)
    .then((values) => {
      values.forEach(({
        aborted,
        applicant,
        details,
        didPass,
        maxTotalSharesAtYesVote,
        noVotes,
        processed,
        proposer,
        sharesRequested,
        startingPeriod,
        tokenTribute,
        yesVotes,
      }, i) => {
        // calculate status and period differences
        const proposalPeriodDifference = currentPeriod - startingPeriod;
        let status;
        let periodDifference;

        if (proposalPeriodDifference < votingPeriodLength) {
          periodDifference = votingPeriodLength - proposalPeriodDifference;
          status = VOTING;
        } else if (proposalPeriodDifference < totalGracePeriod) {
          periodDifference = totalGracePeriod - proposalPeriodDifference;
          status = GRACE;
        } else if (processed) {
          periodDifference = totalGracePeriod - proposalPeriodDifference;
          status = COMPLETED;
        } else {
          periodDifference = totalGracePeriod - proposalPeriodDifference;
          status = READY_FOR_PROCESSING;
        }

        proposalsData.push({
          id: i,
          aborted,
          applicant,
          details,
          didPass,
          maxTotalSharesAtYesVote,
          noVotes: parseInt(noVotes, 10),
          processed,
          proposer,
          sharesRequested,
          startingPeriod,
          tokenTribute: parseInt(fromWei(tokenTribute), 10),
          yesVotes: parseInt(yesVotes, 10),
          status,
          periodDifference,
        });
      });

      store.dispatch(setData({
        proposalsData,
      }));
    });
};
