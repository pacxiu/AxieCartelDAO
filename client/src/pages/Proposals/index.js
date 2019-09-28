import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Countdown from 'components/Countdown';
import Card, { CardsContainer, Contribution } from 'components/Card';

import { ProposalStatus, convertTitle } from 'shared/proposals';
import { getAllProposalsData, getCurrentPeriod } from 'services/AxieDaoService';

// interface Proposal {
//   sharesRequested: number;
//   tokenTribute: number;
// }

const ProposalCard = ({
  proposal: {
    id,
    sharesRequested,
    tokenTribute,
    title,
    details,
    yesVotes,
    noVotes,
    periodDifference,
    status,
    didPass,
  },
}) => (
  <Card className={styles.proposal} link={`/proposal/${id}`}>
    <Countdown {...{ periodDifference, status, didPass, className: styles.proposalTimer }} />
    <p className={styles.proposalTitle}>{convertTitle(details, id)}</p>
    <Contribution
      shares={sharesRequested}
      tribute={tokenTribute}
    />
    <div className={styles.votesContainer}>
      <p className={styles.votesTitle}>Votes:</p>
      <span className={classnames(styles.votesCount, styles.votesNo)}>{noVotes}</span>
      <span className={classnames(styles.votesCount, styles.votesYes)}>{yesVotes}</span>
      <div className={styles.votesBar}>
        <div
          className={classnames(styles.votesBarFill, styles.votesBarNo)}
          style={{ width: (noVotes + yesVotes) !== 0 ? `${noVotes / (noVotes + yesVotes) * 100}%` : '50%' }}
        />
        <div
          className={classnames(styles.votesBarFill, styles.votesBarYes)}
          style={{ width: (noVotes + yesVotes) !== 0 ? `${yesVotes / (noVotes + yesVotes) * 100}%` : '50%' }}
        />
      </div>
    </div>
  </Card>
);

const ProposalsNavItems = [
  { name: 'Voting', state: ProposalStatus.VOTING },
  { name: 'Grace', state: ProposalStatus.GRACE },
  { name: 'Completed', state: ProposalStatus.COMPLETED },
  { name: 'Ready for processing', state: ProposalStatus.READY_FOR_PROCESSING },
];

class Proposals extends React.Component {
  state = {
    proposals: null,
    activeTab: ProposalStatus.VOTING,
  };

  componentDidMount() {
    const { proposalsData } = this.props;

    if (!proposalsData) {
      this.getProposalData();
    } else {
      this.filterProposals();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.proposalsData && this.props.proposalsData.length > 0) {
      this.filterProposals();
    }
  }

  getProposalData = () => {
    getAllProposalsData();
  }

  filterProposals = async () => {
    const { proposalsData } = this.props;
    const { VOTING, GRACE, COMPLETED, READY_FOR_PROCESSING, CAN_ABORT } = ProposalStatus;

    const proposals = {
      [VOTING]: [],
      [GRACE]: [],
      [COMPLETED]: [],
      [READY_FOR_PROCESSING]: [],
      [CAN_ABORT]: [],
    };

    proposalsData.forEach((proposal) => {
      proposals[proposal.status].push(proposal);
    });

    this.setState({ proposals });
  }

  changeActiveTab = (activeTab) => {
    this.setState({ activeTab });
  }

  render() {
    const { proposals, activeTab } = this.state;

    return (
      <FullHeight
        className={classnames(styles.container, styles.custom)}
        start={proposals !== null}
      >
        <CardsContainer>
          {proposals
            ? (
              <React.Fragment>
                <ul className={styles.nav}>
                  {ProposalsNavItems.map(({ name, state }) => (
                    <li
                      key={name}
                      onClick={() => { this.changeActiveTab(state); }}
                      className={classnames(
                        styles.navItem,
                        {
                          [styles.active]: state === activeTab,
                        },
                      )}
                    >
                      {name} ({proposals[state].length})
                    </li>
                  ))}
                </ul>
                {proposals[activeTab].map(proposal => (
                  <ProposalCard
                    key={proposal.id}
                    {...{ proposal }}
                  />
                ))}
              </React.Fragment>
            )
            : <Loader />
          }
        </CardsContainer>
      </FullHeight>
    )
  }
}

const mapStateToProps = ({
  daoData: {
    proposalsData,
    general,
  },
}) => ({
  proposalsData,
  general,
});

export default connect(mapStateToProps)(Proposals);
