import React, { Component } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { ReactComponent as DiscordIcon } from 'assets/icons/discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';

const Footer = () => (
  <footer className={styles.footer} >
    <div className={styles.footerNav}>
      <ul className={styles.footerList}>
        <span className={styles.footerListTitle}>Articles</span>
        <li><a href="">What is Axie Cartel DAO</a></li>
      </ul>
      <div>
        <span className={styles.footerListTitle}>Social</span>
        <ul className={classnames(styles.footerList, styles.social)}>
          <li><a href=""><TwitterIcon /></a></li>
          <li><a href=""><DiscordIcon /></a></li>
        </ul>
      </div>
    </div>
    <p>&copy;&nbsp;{new Date().getFullYear()}&nbsp;AxieCartelDAO</p>
    <p className={styles.credentials}>Icons design <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a></p>
  </footer>
);

export default Footer;
