import React, { ReactNode } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

interface ButtonProps {
  children: ReactNode,
  className?: string,
  white?: boolean,
  type?: any,
  onClick?: (any) => void,
}

const Button = ({ children, className, type, white, ...rest }: ButtonProps) => (
  <button
    className={classnames(
      styles.button,
      className,
      { [styles.white]: white },
    )}
    {...rest}
    type={type || 'button'}
  >
    {children}
  </button>
);

export default Button;
