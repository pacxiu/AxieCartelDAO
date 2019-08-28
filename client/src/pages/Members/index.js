import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Card, { CardsContainer, Contribution } from 'components/Card';
import TextEllipsis from 'components/TextEllipsis';

import { getAllMembersData } from 'services/AxieDaoService';

const MemberCard = ({
  member: {
    address,
    shares,
    tribute,
  },
}) => (
  <Card className={styles.member} link={`/member/${address}`}>
    <div>
      <p>
        <TextEllipsis className={styles.memberAddress}>
          {address}
        </TextEllipsis>
      </p>
      <Contribution {...{ shares, tribute }} />
    </div>
  </Card>
);

class Members extends React.Component {
  componentDidMount() {
    const { membersData } = this.props;

    if (!membersData) {
      this.getMembersData();
    }
  }

  getMembersData = () => {
    getAllMembersData();
  }

  render() {
    const { membersData } = this.props;

    return (
      <FullHeight className={classnames(styles.container, styles.custom)}>
        <CardsContainer>
          {membersData
            ? membersData.map(member => (
              <MemberCard
                key={member.address}
                {...{ member }}
              />
            ))
            : <Loader />
          }
        </CardsContainer>
      </FullHeight>
    )
  }
}

const mapStateToProps = ({
  daoData: {
    membersData,
  },
}) => ({
  membersData,
});

export default connect(mapStateToProps)(Members);
