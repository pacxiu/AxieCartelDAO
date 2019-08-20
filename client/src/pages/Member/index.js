import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import { ErrorDesc, Contribution } from 'components/Typography';

import { getMemberData } from 'services/AxieDaoService';

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
      }

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
              ? (
                <React.Fragment>
                  <p className={styles.title}>Address</p>
                  <i>{this.props.match.params.address}</i>
                  <Contribution
                    shares={memberData.shares}
                    tribute={memberData.tribute}
                    className={styles.contribution}
                  />
                  <p className={styles.title}>Delegate Key</p>
                  <i>{memberData.delegateKey}</i>
                </React.Fragment>
              )
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
