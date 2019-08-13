import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { getMemberData } from 'services/AxieDaoService';

class MemberCard extends Component {
  componentDidMount() {
    getMemberData(this.props.member);
  }

  render() {
    const { member } = this.props;

    return (
      <p>{member}</p>
    )
  }
}

const Members = ({ members }) => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      {members
        ? members.map(member => (
          <MemberCard key={member} {...{ member }} />
        ))
        : <Loader />
      }
    </Container>
  </FullHeight>
);

const mapStateToProps = ({ daoData: { members } }) => ({
  members,
});

export default connect(mapStateToProps)(Members);
