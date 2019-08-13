import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { getProposalData } from 'services/AxieDaoService';

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
          <React.Fragment>
            <p><Link to={`/proposal/${proposal}`}>{proposal}</Link></p>
            <p>Shares:</p>
          </React.Fragment>
        )
        : null
    )
  }
}

const Proposals = ({ proposals }) => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      {proposals
        ? proposals.total.map(proposal => (
          <ProposalCard key={proposal} {...{ proposal }} />
        ))
        : <Loader />
      }
    </Container>
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
