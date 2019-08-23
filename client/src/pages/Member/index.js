import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { ErrorDesc, Contribution } from 'components/Typography';

import { getMemberData, rageQuit, canRagequit } from 'services/AxieDaoService';

const MemberData = ({
  member: {
    address,
    shares,
    tribute,
    delegateKey,
    exists,
    canRageQuit,
  },
}) => {
  const [modalOpen, toggleModal] = useState(false);

  return (
    <div className={styles.member}>
      <div className={styles.memberDetails}>
        <p className={styles.title}>Address</p>
        <i>{address}</i>
        <Contribution
          shares={shares}
          tribute={tribute}
          className={styles.contribution}
        />
        <p className={styles.title}>Delegate Key</p>
        <i>{delegateKey}</i>
      </div>
      <div>
        {exists
          ? (
            <React.Fragment>
              exists
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <Button onClick={() => toggleModal(true)}>
                Rage Quit
              </Button>
            </React.Fragment>
          )
        }
        <Link to="/proposal-new">
          <Button>New Proposal</Button>
        </Link>
      </div>
      <Modal
        onClose={() => toggleModal(false)}
        isOpen={modalOpen}
      >
        {canRageQuit ? 'Can' : 'Cant'}
        {shares}
      </Modal>
    </div>
  );
};

class Member extends Component {
  state = {
    memberData: null,
  };

  componentDidMount() {
    this.loadMemberData();
  }

  loadMemberData = async () => {
    const { membersData, match } = this.props;
    const { address } = match.params;
    let memberData;

    try {
      if (membersData) {
        memberData = membersData.find(member => member.address === address);
        console.log(memberData);
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

    return (
      <FullHeight className={classnames(styles.container, styles.custom)}>
        <Container>
          {memberData
            ? memberData !== 'error'
              ? <MemberData member={memberData} />
              : <ErrorDesc>There was an error fetching data from blockchain.</ErrorDesc>
            : <Loader />
          }
        </Container>
      </FullHeight>
    );
  }
}

const mapStateToProps = ({ daoData: { membersData } }) => ({
  membersData,
});

export default connect(mapStateToProps)(Member);
