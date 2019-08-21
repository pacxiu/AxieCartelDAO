import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import logo from 'assets/logo.png';

interface LoaderProps {
  className?: string,
}

const Loader = ({ className }: LoaderProps) => (
  <div className={classnames(styles.loaderContainer, className)}>
    <span className={classnames(styles.loader, className)} />
    <img className={styles.loaderImg} src={logo} alt="Logo as loader" />
  </div>
);

export default Loader;
