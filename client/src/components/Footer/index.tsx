import React, { Component } from 'react';

import styles from './index.module.sass';

const Footer = () => (
  <footer className={styles.container} >
    <p>&copy;&nbsp;{new Date().getFullYear()}&nbsp;AxieCartelDAO</p>
  </footer>
);

export default Footer;
