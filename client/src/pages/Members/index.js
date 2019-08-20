import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Card, { CardsContainer } from 'components/Card';
import TextEllipsis from 'components/TextEllipsis';
import { WithDaiIcon } from 'components/Icons';

import { getAllMembersData } from 'services/AxieDaoService';

const MemberCard = ({ member }) => (
  <Card className={styles.member} link={`/member/${member.address}`}>
    <p>
      <TextEllipsis className={styles.memberAddress}>
        {member.address}
      </TextEllipsis>
    </p>
    <div className={styles.data}>
      <div className={styles.dataItem}>
        <p>Shares:</p>
        <p>{member.shares}</p>
      </div>
      <div className={styles.dataItem}>
        <p>Tribute</p>
        <WithDaiIcon type="dark">{member.tribute}</WithDaiIcon>
      </div>
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
