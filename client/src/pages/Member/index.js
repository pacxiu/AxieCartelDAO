import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

import { getMemberData } from 'services/AxieDaoService';

class Member extends Component {
  state = {
    memberData: null,
  };

  componentDidMount() {
    this.loadMemberData();
  }

  loadMemberData = async () => {
    const memberData = await getMemberData(this.props.match.params.address);
    console.info(memberData);
    this.setState({ memberData });
  }

  render() {
    const { memberData } = this.state;

    return (
      <FullHeight className={classnames(styles.container, styles.custom)}>
        {memberData
          ? (
            <Container>
              {memberData.shares}
              {memberData.delegateKey}
            </Container>
          )
          : <Loader />
        }
      </FullHeight>
    );
  }
}

export default Member;
