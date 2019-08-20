import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Card, { CardsContainer } from 'components/Card';
import { Contribution } from 'components/Typography';
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
  },
}) => (
  <Card className={styles.proposal}>
    <p>Timer</p>
    <p className={styles.proposalTitle}>Title</p>
    <p className={styles.proposalTitle}>{details}</p>
    <Contribution
      shares={sharesRequested}
      tribute={tokenTribute}
    />
    <p>Yes: {yesVotes}</p>
    <p>No: {noVotes}</p>
    <Link to={`/proposal/${id}`}>
      <Button>View</Button>
    </Link>
  </Card>
);

const ProposalsNavItems = [
  { name: 'Voting', state: 'voting' },
  { name: 'Grace', state: 'grace' },
  { name: 'Completed', state: 'completed' },
  { name: 'Ready for processing', state: 'readyForProcess' },
];

class Proposals extends React.Component {
  state = {
    proposals: null,
    activeTab: 'voting',
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
    const { proposalsData, general } = this.props;
    const { periodDuration, votingPeriodLength, gracePeriodLength } = general;
    const totalGracePeriod = votingPeriodLength + gracePeriodLength;
    const currentPeriod = await getCurrentPeriod();
    const proposals = {
      voting: [],
      grace: [],
      completed: [],
      readyForProcess: [],
    }

    proposalsData.forEach((proposal) => {
      const {
        startingPeriod,
        processed,
      } = proposal;
      const periodDifference = currentPeriod - startingPeriod;

      if (periodDifference <= votingPeriodLength) {
        proposals.voting.push(proposal);
      } else if (periodDifference <= totalGracePeriod) {
        proposals.grace.push(proposal);
      } else if (processed) {
        proposals.completed.push(proposal);
      } else {
        proposals.readyForProcess.push(proposal);
      }
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
