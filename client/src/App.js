import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import components and containers
import Menu from 'containers/Menu';
import NotificationsList from 'containers/NotificationsList';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Footer from 'components/Footer';

import { setToken, setUserData } from 'duck/user';
import { createRequest } from 'shared/helpers';

import { initWeb3 } from 'services/Web3Service';
import { getCurrentPeriod } from 'services/AxieDaoService';

class App extends Component {
  componentDidMount() {
    this.setup();
    // this.getCookie('token');
  }

  setup = async () => {
    await initWeb3();
    getCurrentPeriod();
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
    return (
      <Router>
        <Route render={({ location }) => (
          <div id="app">
            <NotificationsList />
            <Menu />
            <Switch>
              <Route path="/profile/:address" component={Profile} />
              <Route path="/" component={Home} />
            </Switch>
            <Footer {...{ location }} />
          </div>)}
        />
      </Router>
    );
  }
}

const mapDispatchToProps = {
  setToken,
  setUserData,
};

export default hot(module)(connect(null, mapDispatchToProps)(App));
