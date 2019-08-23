import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Countdown from 'components/Countdown';
import { Contribution } from 'components/Typography';

import { convertTitle, ProposalStatus } from 'shared/proposals';
import { getAllProposalsData, processProposal, submitVote } from 'services/AxieDaoService';

const ProposalData = ({
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
  <div className={styles.proposal}>
    <Countdown {...{ periodDifference, status, didPass, className: styles.proposalTimer }} />
    <p className={styles.proposalTitle}>{convertTitle(details, id)}</p>
    <Contribution
      shares={sharesRequested}
      tribute={tokenTribute}
    />
    <div className={styles.votesContainer}>
      <span className={classnames(styles.votesCount, styles.votesNo)}>{noVotes}</span>
      <span className={classnames(styles.votesCount, styles.votesYes)}>{yesVotes}</span>
      <div className={styles.votesBar}>
        <div
          className={classnames(styles.votesBarFill, styles.votesBarNo)}
          style={{ width: `${noVotes / (noVotes + yesVotes) * 100}%` }}
        />
        <div
          className={classnames(styles.votesBarFill, styles.votesBarYes)}
          style={{ width: `${yesVotes / (noVotes + yesVotes) * 100}%` }}
        />
      </div>
    </div>
    {status === ProposalStatus.VOTING
      ? (
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            onClick={() => submitVote(id, 2)}
          >
            Vote No
          </Button>
          <Button
            className={styles.button}
            onClick={() => submitVote(id, 1)}
          >
            Vote Yes
          </Button>
        </div>
      )
      : status === ProposalStatus.READY_FOR_PROCESSING
        ? (
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              onClick={() => processProposal(id)}
            >
              Process
            </Button>
          </div>
        )
        : null
    }
  </div>
);

class Proposal extends Component {
  state = {
    proposalData: null,
  };

  componentDidMount() {
    this.loadProposalData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.proposalsData && this.props.proposalsData.length > 0) {
      this.loadProposalData();
    }
  }

  loadProposalData = async () => {
    const { match, proposalsData } = this.props;
    const { id } = match.params;

    try {
      if (proposalsData) {
        this.setState({ proposalData: proposalsData[id] });
      } else {
        getAllProposalsData();
      }
    } catch (error) {
      this.setState({ proposalData: 'error' });
    }
  }

  render() {
    const { proposalData } = this.state;
    const { user } = this.props;

    return (
      <FullHeight
        className={classnames(styles.container, styles.custom)}
        start={proposalData && proposalData !== 'error'}
      >
        <Container>
          {proposalData
            ? <ProposalData proposal={proposalData} />
            : <Loader />
          }
        </Container>
      </FullHeight>
    );
  }
}

const mapStateToProps = ({ daoData: { proposalsData } }) => ({
  proposalsData,
});

export default connect(mapStateToProps)(Proposal);
