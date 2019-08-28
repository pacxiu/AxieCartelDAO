import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { WithDaiIcon } from 'components/Icons';

const Votes = ({ shares, tribute, className }) => (
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

export default Votes;
