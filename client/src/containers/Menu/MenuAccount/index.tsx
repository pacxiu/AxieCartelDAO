import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classnames from 'classnames';
import styles from './index.module.sass';

import TextEllipsis from 'components/TextEllipsis';
import Tooltip from 'components/Tooltip';

import { setToken, setUserData } from 'duck/user';
import { createRequest, setCookie } from 'shared/helpers';

interface UserObject {
  address: string,
  nickname: string,
  token: string,
}

interface MenuAccountProps {
  web3: any,
  user: UserObject,
  setToken(token: string | null): any,
  setUserData(token: string): any,
}

class MenuAccount extends Component<MenuAccountProps> {
  signIn = () => {
    const { user, web3, setToken } = this.props;
    const { address } = user;

    web3.eth.personal.sign(web3.utils.fromUtf8('DappsUniverse login'), address, async (err, res) => {
      const { status, data } = await createRequest('get', '/api/login', { signature: res });

      if (status === 200) {
        const { token } = data;
        setToken(token);
        setCookie(token);
      } else {
        console.error(data);
      }
    });
  }

  signOut = () => {
    this.props.setToken(null);
    setCookie(null);
  }

  changeNick = async (e: any) => {
    e.stopPropagation();

    const nickname = window.prompt('Change nick, max 25 characters');

    if (nickname === null) {
      return;
    }

    const { status, data } = await createRequest('post', '/api/user', { nickname });
    if (status === 200) {
      this.props.setUserData({ ...data.profile });
    }
  }

  render() {
    const { address, token, nickname } = this.props.user;

    return (
      <div className={styles.accountContainer}>
        { address
          ? (
            <React.Fragment>
              { token
                ? (
                  <button
                    data-for="login-tip"
                    data-tip="You are logged in.<br />Click to logout."
                    className={styles.login}
                    onClick={this.signOut}
                  />
                )
                : (
                  <button
                    data-for="login-tip"
                    data-tip="You are not logged in.<br />Some features will not be available to use.<br />Click to log in with Metamask signature."
                    className={classnames(styles.login, styles.in)}
                    onClick={this.signIn}
                  />
                )
              }
              <div className={styles.dropdown}>
                <TextEllipsis><Link to={`/member/${address}`}>{nickname || address }</Link></TextEllipsis>
                <div className={styles.dropdownContent}>
                  <div className={styles.dropdownButton} role="presentation" onClick={this.changeNick}>Change Nick</div>
                </div>
              </div>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <button
                data-for="login-tip"
                data-tip="You are not logged in.<br />Some features will not be available for use. Please enable Metamask and then log in."
                className={classnames(styles.login, styles.in)}
              />
              <span>No wallet</span>
            </React.Fragment>
          )
        }
        {
          // <Tooltip className={styles.tooltip} id="login-tip" place="bottom" border />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user, web3 }) => ({
  user,
  web3,
});

const mapDispatchToProps = {
  setToken,
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuAccount);
