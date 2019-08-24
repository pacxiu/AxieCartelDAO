import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import Button from 'components/Button';
import RageQuit from 'components/RageQuit';
import NewProposal from 'components/NewProposal';
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
  currentUser,
}) => {
  const [rageQuitOpen, toggleRageQuit] = useState(false);
  const [newProposalOpen, toggleNewProposal] = useState(false);

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
      {currentUser === address
        ? (
          <React.Fragment>
            <div className={styles.buttonsContainer}>
              {exists
                ? (
                  <React.Fragment>
                    exists
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <Button
                      className={classnames(styles.button, styles.rage)}
                      onClick={() => toggleRageQuit(true)}
                    >
                      Rage Quit
                    </Button>
                  </React.Fragment>
                )
              }
              <Button
                className={styles.button}
                onClick={() => toggleNewProposal(true)}
              >
                New Proposal
              </Button>
            </div>
            <RageQuit
              onClose={() => toggleRageQuit(false)}
              isOpen={rageQuitOpen}
              {...{ shares, currentUser }}
            />
            <NewProposal
              onClose={() => toggleNewProposal(false)}
              isOpen={newProposalOpen}
              {...{ currentUser }}
            />
          </React.Fragment>
        )
        : null
      }
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
      <FullHeight className={classnames(styles.container, styles.custom)}>
        <Container>
          {memberData
            ? memberData !== 'error'
              ? <MemberData member={memberData} currentUser={address} />
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
