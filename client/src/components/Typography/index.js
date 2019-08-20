import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { WithDaiIcon } from 'components/Icons';

export const Title = ({ children, className }) => (
  <h1 className={classnames(styles.title, className)}>{children}</h1>
);

export const Subtitle = ({ children, className }) => (
  <h2 className={classnames(styles.subtitle, className)}>{children}</h2>
);

export const ErrorDesc = ({ children, className }) => (
  <h3 className={classnames(styles.error, className)}>{children}</h3>
);

export const Contribution = ({ shares, tribute, className }) => (
  <div className={classnames(styles.contribution, className)}>
    <div className={styles.contributionItem}>
      <p><span className={styles.contributionItemTitle}>Shares:</span></p>
      <p>{shares}</p>
    </div>
    <div className={styles.contributionItem}>
      <p><span className={styles.contributionItemTitle}>Tribute</span></p>
      <WithDaiIcon type="dark">{tribute}</WithDaiIcon>
    </div>
  </div>
);
