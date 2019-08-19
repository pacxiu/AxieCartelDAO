import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Card, { CardsContainer } from 'components/Card';
import { WithDaiIcon } from 'components/Icons';

import { getProposalData } from 'services/AxieDaoService';

// interface Proposal {
//   sharesRequested: number;
// }

class ProposalCard extends Component {
  state = {
    proposalData: null,
  };

  componentDidMount() {
    this.loadProposalData();
  }

  loadProposalData = async () => {
    const proposalData = await getProposalData(this.props.proposal);
    this.setState({ proposalData });
  }

  render() {
    const { proposal } = this.props;
    const { proposalData } = this.state;

    return (
      proposalData
        ? (
          <Card className={styles.proposal}>
            <Link to={`/proposal/${proposal}`}>
              <p>Timer</p>
              <p className={styles.proposalTitle}>Title</p>
              <div className={styles.data}>
                <div className={styles.dataItem}>
                  <p>Shares:</p>
                  <p>{proposalData.sharesRequested}</p>
                </div>
                <div className={styles.dataItem}>
                  <p>Tribute</p>
                  <WithDaiIcon type="dark">{proposalData.tribute}</WithDaiIcon>
                </div>
              </div>
            </Link>
          </Card>
        )
        : null
    )
  }
}

const Proposals = ({ proposals }) => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <CardsContainer>
      {proposals
        ? proposals.total.map(proposal => (
          <ProposalCard key={proposal} {...{ proposal }} />
        ))
        : <Loader />
      }
    </CardsContainer>
  </FullHeight>
);


const mapStateToProps = ({
  daoData: {
    proposals,
  },
}) => ({
  proposals,
});

export default connect(mapStateToProps)(Proposals);
