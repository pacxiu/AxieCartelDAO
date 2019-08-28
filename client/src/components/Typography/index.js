import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

export const Title = ({ children, className }) => (
  <h1 className={classnames(styles.title, className)}>{children}</h1>
);

export const Subtitle = ({ children, className }) => (
  <h2 className={classnames(styles.subtitle, className)}>{children}</h2>
);

export const ErrorDesc = ({ children, className }) => (
  <h3 className={classnames(styles.error, className)}>{children}</h3>
);
