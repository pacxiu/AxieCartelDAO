import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

export const FullHeight = ({ children, className, start, zombies, axie }) => (
  <div
    className={classnames(
      styles.fullHeight,
      className,
      {
        [styles.start]: start,
        [styles.zombies]: zombies,
        [styles.axie]: axie,
      },
    )}
  >
    {children}
  </div>
);

export const Container = ({ children, className }) => (
  <div className={classnames(styles.container, className)}>{children}</div>
);

export const Col12 = ({ children, className }) => (
  <div className={classnames(styles.col12, className)}>{children}</div>
);
