import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import DAIIcon from 'assets/icons/dai.png'

// eslint-disable-next-line
// export const DaiIcon = ({ className }) => (
//   <img
//     className={classnames(styles.dai, className)}
//     src={DAIIcon}
//     alt="Dai Icon"
//   />
// );

export const DaiIcon = ({ className, type }) => (
  <svg
    className={classnames(styles.dai, {
      [styles[type]]: type,
    })}
    viewBox="0 0 165 184"
    fill="none"
  >
    <path d="M82.4612 48.0026L124.922 90.0011L82.4612 132L40 90.0011L82.4612 48.0026Z" fill="#fff" />
    <path d="M56.1877 85.5902C55.6105 86.2342 56.0675 87.2576 56.9323 87.2576H73.0095C73.5762 87.2576 74.1162 87.0173 74.4955 86.5962L82.1311 78.1199L90.6914 86.6725C91.0665 87.0472 91.5749 87.2576 92.105 87.2576H108.194C109.067 87.2576 109.521 86.2183 108.928 85.5781L83.6226 58.2575C82.8223 57.3934 81.4522 57.4046 80.6661 58.2816L56.1877 85.5902Z" fill="red" />
  </svg>
);

export const WithDaiIcon = ({ className, type, children }) => (
  <span className={styles.withDai}>
    <DaiIcon {...{ type }} />
    {children}
  </span>
)
