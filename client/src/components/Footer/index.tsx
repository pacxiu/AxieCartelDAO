import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { ReactComponent as DiscordIcon } from 'assets/icons/discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import AnchorExternal from 'components/AnchorExternal';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerNav}>
      <ul className={styles.footerList}>
        <span className={styles.footerListTitle}>Articles</span>
        <li><AnchorExternal href="https://twitter.com/AxieCartelDAO">What is Axie Cartel DAO</AnchorExternal></li>
      </ul>
      <div>
        <span className={styles.footerListTitle}>Social</span>
        <ul className={classnames(styles.footerList, styles.social)}>
          <li><AnchorExternal href="https://twitter.com/AxieCartelDAO"><TwitterIcon /></AnchorExternal></li>
          <li><AnchorExternal href="https://discord.gg/PMa7PRF"><DiscordIcon /></AnchorExternal></li>
        </ul>
      </div>
    </div>
    <p>&copy;&nbsp;{new Date().getFullYear()}&nbsp;AxieCartelDAO</p>
    <p className={styles.credentials}>Icons design <AnchorExternal href="https://www.flaticon.com/">www.flaticon.com</AnchorExternal></p>
  </footer>
);

export default Footer;
