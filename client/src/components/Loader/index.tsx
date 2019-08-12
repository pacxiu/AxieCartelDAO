import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

interface LoaderProps {
  className?: string,
}

const Loader = ({ className }: LoaderProps) => (
  <span className={classnames(styles.loader, className)} />
);

export default Loader;
