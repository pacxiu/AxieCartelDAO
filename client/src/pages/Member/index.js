import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import { ErrorDesc } from 'components/Typography';

import { getMemberData, canRagequit } from 'services/AxieDaoService';

import MemberPanel from './MemberPanel';

class Member extends Component {
  state = {
    memberData: null,
  };

  componentDidMount() {
    this.loadMemberData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.address !== this.props.match.params.address) {
      this.loadMemberData();
    }
  }

  loadMemberData = async () => {
    const { membersData, match } = this.props;
    const { address } = match.params;
    let memberData;

    try {
      if (membersData) {
        memberData = membersData.find(member => member.address === address);

        if (!memberData) {
          memberData = await getMemberData(address);
          memberData.address = address;
        }
      } else {
        memberData = await getMemberData(address);
        memberData.address = address;
      }

      const canRage = await canRagequit(memberData.highestIndexYesVote);
      memberData.canRageQuit = canRage;

      this.setState({ memberData });
    } catch (error) {
      this.setState({ memberData: 'error' });
    }
  }

  render() {
    const { memberData } = this.state;
    const { address } = this.props;

    return (
      <FullHeight className={styles.container}>
        <Container>
          {memberData
            ? memberData !== 'error'
              ? <MemberPanel member={memberData} currentUser={address} />
              : <ErrorDesc>There was an error fetching data from blockchain.</ErrorDesc>
            : <Loader />
          }
        </Container>
      </FullHeight>
    );
  }
}

const mapStateToProps = ({
  daoData: {
    membersData,
  },
  user: {
    address,
  },
}) => ({
  membersData,
  address,
});

export default connect(mapStateToProps)(Member);
