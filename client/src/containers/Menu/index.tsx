import React, { Component, ReactNode } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import logo from 'assets/logo.png';

import MenuAccount from './MenuAccount';

interface MenuState {
  fixed: boolean,
  hovered: boolean,
  forceNoHover: boolean,
}

interface MenuProps {
  history: any;
}

class Menu extends Component<MenuProps, MenuState> {
  state = {
    fixed: false,
    hovered: false,
    forceNoHover: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.pageYOffset;
    const { fixed } = this.state;

    if (scrollY > 0 && !fixed) {
      this.setState({ fixed: true });
    } else if (scrollY === 0 && fixed) {
      this.setState({ fixed: false });
    }
  }

  setHovered = (hovered: boolean) => {
    this.setState({ hovered });
  }

  setForceNoHover = (e, url) => {
    if (url) {
      e.preventDefault();
      e.stopPropagation();
      this.props.history.push(url);
    }

    this.setState({ forceNoHover: true });
    setTimeout(() => {
      this.setState({ forceNoHover: false });
    }, 1000);
  }

  render() {
    const { fixed, hovered, forceNoHover } = this.state;

    return (
      <nav className={classnames(
        styles.nav,
        {
          [styles.fixed]: fixed,
          [styles.hovered]: hovered,
          [styles.hoveredNo]: forceNoHover,
        },
      )}
      >
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="AxieCartelDAO logo" />
        </Link>
        <div className={styles.menuItems}>
          Test Link
        </div>
        <div>
          <MenuAccount />
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu);
