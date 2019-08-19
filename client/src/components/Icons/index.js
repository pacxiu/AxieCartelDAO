import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import DAIIcon from 'assets/icons/dai.png'

// eslint-disable-next-line
export const DaiIcon = ({ className }) => (
  <img
    className={classnames(styles.dai, className)}
    src={DAIIcon}
    alt="Dai Icon"
  />
);

export const WithDaiIcon = ({ className, children }) => (
  <span className={styles.withDai}>
    <DaiIcon />
    {children}
  </span>
)
