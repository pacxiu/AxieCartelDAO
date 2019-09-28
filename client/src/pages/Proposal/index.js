import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Countdown from 'components/Countdown';
import { Contribution } from 'components/Card';
import AnchorExternal from 'components/AnchorExternal';

import { convertTitle, ProposalStatus } from 'shared/proposals';
import { getAllProposalsData, processProposal, submitVote } from 'services/AxieDaoService';

import { ReactComponent as VoteYesIcon } from 'assets/icons/vote-yes.svg';
import { ReactComponent as VoteNoIcon } from 'assets/icons/vote-no.svg';

import { createRequest } from 'shared/helpers';

const ProposalData = ({
  proposal: {
    id,
    sharesRequested,
    tokenTribute,
    details,
    yesVotes,
    noVotes,
    periodDifference,
    status,
    didPass,
    applicant,
    additionalData,
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
      <p className={styles.votesTitle}>Votes:</p>
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
    <p className={styles.applicant}>Applicant address:</p>
    <i><Link to={`/member/${applicant}`}>{applicant}</Link></i>
    {additionalData
      ? (
        <div className={styles.additional}>
          <p className={styles.title}>Description</p>
          <div dangerouslySetInnerHTML={{ __html: additionalData.description }} />
          <AnchorExternal
            href={additionalData.link}
            className={styles.link}
          >
            Link
          </AnchorExternal>
        </div>
      )
      : null
    }
    {status === ProposalStatus.VOTING
      ? (
        <div className={styles.buttons}>
          <Button
            className={classnames(styles.button, styles.no)}
            onClick={() => submitVote(id, 2)}
          >
            Vote No <VoteNoIcon />
          </Button>
          <Button
            className={classnames(styles.button, styles.yes)}
            onClick={() => submitVote(id, 1)}
          >
            Vote Yes <VoteYesIcon />
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
        const response = await createRequest('get', `/api/proposal/${id - 1}`);

        this.setState({
          proposalData: {
            ...proposalsData[id],
            additionalData: response.status === 200 ? response.data.proposal : null,
          },
        });
      } else {
        getAllProposalsData();
      }
    } catch (error) {
      this.setState({ proposalData: 'error' });
    }
  }

  render() {
    const { proposalData } = this.state;

    console.log(proposalData);
    return (
      <FullHeight
        className={classnames(styles.container, styles.custom)}
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
