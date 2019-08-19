import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Card, { CardsContainer } from 'components/Card';
import TextEllipsis from 'components/TextEllipsis';
import { WithDaiIcon } from 'components/Icons';

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
          <Card className={styles.member}>
            <Link to={`/member/${member}`}>
              <p>
                <TextEllipsis className={styles.memberAddress}>
                  {member}
                </TextEllipsis>
              </p>
              <div className={styles.data}>
                <div className={styles.dataItem}>
                  <p>Shares:</p>
                  <p>{memberData.shares}</p>
                </div>
                <div className={styles.dataItem}>
                  <p>Tribute</p>
                  <WithDaiIcon type="dark">{tribute}</WithDaiIcon>
                </div>
              </div>
            </Link>
          </Card>
        )
        : null
    );
  }
}

const Members = ({ members, tributes }) => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <CardsContainer>
      {members && tributes
        ? members.map(member => (
          <MemberCard key={member} {...{ member, tribute: tributes[member] }} />
        ))
        : <Loader />
      }
    </CardsContainer>
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
