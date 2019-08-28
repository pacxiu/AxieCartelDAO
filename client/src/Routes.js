import React from 'react';
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
import LoadingScreen from 'pages/LoadingScreen';
import Manifesto from 'pages/Manifesto';
import Founders from 'pages/Founders';

import Footer from 'components/Footer';

const Routes = ({ basename, initialized }) => (
  <Router basename={basename}>
    <Route render={({ location }) => (
      <div id="app">
        <NotificationsList />
        <Menu />
        {initialized
          ? (
            <Switch>
              <Route path="/manifesto" component={Manifesto} />
              <Route path="/Founders" component={Founders} />
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

export default Routes;
