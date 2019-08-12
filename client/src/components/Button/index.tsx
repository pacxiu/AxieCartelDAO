import React, { ReactNode } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

interface ButtonProps {
  children: ReactNode,
  className?: string,
  white?: boolean,
  type?: any,
  onClick?: () => void,
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

export const ZombieButton = ({ onClick, children, className }) => (
  <Button
    className={classnames(styles.zombie, className)}
    {...{ onClick }}
  >
    {children}
  </Button>
);

export const LabelButton = ({ children, customClass, htmlFor }) => (
  // eslint-disable-next-line
  <label
    className={classnames(styles.button, styles.label, customClass)}
    {...{ htmlFor }}
  >
    {children}
  </label>
);

export default Button;
