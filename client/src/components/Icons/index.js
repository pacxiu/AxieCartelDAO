import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

export const DaiIcon = ({ className, type }) => (
  <svg
    className={classnames(
      styles.dai,
      className,
      {
        [styles[type]]: type,
      },
    )}
    fill="none"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 628.3 628.3"
  >
    <title>Dai Icon</title>
    <path fill="#ffce45" d="M314.152 72.307L550.856 309.01 314.152 545.715 77.448 309.01z" />
    <path fill="#febe44" d="M314.15 386.25L77.25 309l236.9-236.7L551.05 309l-236.9 77.25z" />
    <path fill="#fff" d="M159.65 293.55H267.8l46.35-51.5 51.5 51.5H473.8L314.15 121.03l-154.5 172.52z" />
    <path fill="#d9a547" opacity=".42" d="M314.15 545.7V72.3L550.85 309l-236.7 236.7z" />
  </svg>
);

export const WithDaiIcon = ({ className, type, children }) => (
  <span className={classnames(styles.withDai, className)}>
    <DaiIcon {...{ type }} />
    {children}
  </span>
);
