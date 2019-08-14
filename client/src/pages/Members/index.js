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
  state = {
    memberData: null,
  };

  componentDidMount() {
    this.loadMemberData();
  }

  loadMemberData = async () => {
    const memberData = await getMemberData(this.props.member);
    this.setState({ memberData });
  }

  render() {
    const { member, tribute } = this.props;
    const { memberData } = this.state;

    return (
      memberData
        ? (
          <React.Fragment>
            <p><Link to={`/member/${member}`}>{member}</Link>Tribute {tribute}</p>
            <p>Shares: {memberData.shares}</p>
          </React.Fragment>
        )
        : null
    );
  }
}

const Members = ({ members, tributes }) => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      {members && tributes
        ? members.map(member => (
          <MemberCard key={member} {...{ member, tribute: tributes[member] }} />
        ))
        : <Loader />
      }
    </Container>
  </FullHeight>
);

const mapStateToProps = ({
  daoData: {
    members,
    tributes,
  },
}) => ({
  members,
  tributes,
});

export default connect(mapStateToProps)(Members);
