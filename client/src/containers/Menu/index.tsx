import React, { Component, ReactType } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import logo from 'assets/logo.png';

import { ReactComponent as ProposalsIcon } from 'assets/icons/menu/proposals.svg';
import { ReactComponent as MembersIcon } from 'assets/icons/menu/members.svg';
import { ReactComponent as ManifestoIcon } from 'assets/icons/menu/manifesto.svg';
import { ReactComponent as TeamIcon } from 'assets/icons/menu/team.svg';

import MenuAccount from './MenuAccount';

interface MenuState {
  fixed: boolean,
  hovered: boolean,
  forceNoHover: boolean,
}

interface MenuProps {
  history: any;
}

interface MenuItem {
  link: string;
  icon: ReactType;
  title: string;
}

const MENU_ITEMS = [
  { link: '/proposals', icon: ProposalsIcon, title: 'Proposals'},
  { link: '/members', icon: MembersIcon, title: 'Members'},
  { link: '/manifesto', icon: ManifestoIcon, title: 'Manifesto'},
  { link: '/founders', icon: TeamIcon, title: 'Founders'},
];

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
        <ul className={styles.menuList}>
          {MENU_ITEMS.map((item: MenuItem) => (
            <li className={styles.menuItem}>
              <Link className={styles.menuItemLink} to={item.link}>
                <item.icon className={styles.menuItemIcon} />
                <span className={styles.menuItemTitle}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <MenuAccount />
        </div>
      </nav>
    );
  }
}

export default withRouter(Menu);
