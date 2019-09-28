import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { setToken, setUserData } from 'duck/user';

import { initWeb3 } from 'services/Web3Service';
import { getAllEvents } from 'services/AxieDaoService';

import Routes from 'Routes';

class App extends Component {
  componentDidMount() {
    this.setup();
    // this.getCookie('token');
  }

  setup = async () => {
    await initWeb3();
    getAllEvents();
  }

  getCookie = (cName) => {
    const { setToken } = this.props;

    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(`${cName}=`);
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1;
        let cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = document.cookie.length;
        }

        const token = unescape(document.cookie.substring(cStart, cEnd));
        if (!token || token === 'null') {
          // setAuthenticationStatus(false);
          // this.setState({ isLoading: false });
        } else {
          setToken(token);
        }
      }
    }
  }

  render() {
    const { initialized } = this.props;

    return (
      <Routes {...{ initialized }} />
    );
  }
}

const mapStateToProps = ({ daoData: { initialized } }) => ({
  initialized,
});

const mapDispatchToProps = {
  setToken,
  setUserData,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
