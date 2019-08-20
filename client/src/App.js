import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import components and containers
import Menu from 'containers/Menu';
import NotificationsList from 'containers/NotificationsList';

import Home from 'pages/Home';
import Members from 'pages/Members';
import Member from 'pages/Member';
import Proposals from 'pages/Proposals';
import Proposal from 'pages/Proposal';
import NotFound from 'pages/NotFound';
import LoadingScreen from 'pages/LoadingScreen'

import Footer from 'components/Footer';

import { setToken, setUserData } from 'duck/user';
import { createRequest } from 'shared/helpers';

import { initWeb3 } from 'services/Web3Service';
import { getAllEvents } from 'services/AxieDaoService';

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
      <Router>
        <Route render={({ location }) => (
          <div id="app">
            <NotificationsList />
            <Menu />
            {initialized
              ? (
                <Switch>
                  <Route path="/member/:address" component={Member} />
                  <Route path="/members/" component={Members} />
                  <Route path="/proposals" component={Proposals} />
                  <Route path="/proposal/:id" exact component={Proposal} />
                  <Route path="/" exact component={Home} />
                  <Route path="/" component={NotFound} />
                </Switch>
              )
              : <LoadingScreen />
            }
            <Footer {...{ location }} />
          </div>)}
        />
      </Router>
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
