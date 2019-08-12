import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';
import { ZombieButton } from 'components/Button';

import { createRequest } from 'shared/helpers';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      profile: null,
    };

    this.loadProfile = this.loadProfile.bind(this);
    this.deleteDeck = this.deleteDeck.bind(this);
  }

  componentDidMount() {
    this.loadProfile();
  }

  async loadProfile() {
    const { address } = this.props.match.params;

    console.log(address);
  }

  render() {
    const { profile } = this.state;
    const { user } = this.props;

    return (
      <FullHeight className={classnames(styles.container, styles.custom)}>
        {profile
          ? (
            <Container>
              Test
            </Container>
          )
          : <Loader />
        }
      </FullHeight>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Profile);
