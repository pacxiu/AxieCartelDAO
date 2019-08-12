import React, { ReactNode } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

interface TextEllipsisProps {
  children: ReactNode,
  className?: string,
  style?: {};
}

const TextEllipsis = ({ className, children, style }: TextEllipsisProps) => (
  <span
    className={classnames(styles.text, className)}
    style={style}
  >
    {children}
  </span>
);

export default TextEllipsis;
