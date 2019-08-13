import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import { ZombieButton } from 'components/Button';

import { getProposalData } from 'services/AxieDaoService';

class Proposal extends Component {
  state = {
    proposalData: null,
  };

  componentDidMount() {
    this.loadProposalData();
  }

  loadProposalData = async () => {
    const proposalData = await getProposalData(this.props.match.params.id);
    console.log(proposalData);
    this.setState({ proposalData });
  }

  render() {
    const { proposalData } = this.state;
    const { user } = this.props;

    return (
      <FullHeight className={classnames(styles.container, styles.custom)}>
        {proposalData
          ? (
            <Container>
              {proposalData.proposalIndex}
              {proposalData.applicant}
            </Container>
          )
          : <Loader />
        }
      </FullHeight>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Proposal);
