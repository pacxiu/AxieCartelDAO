import React, { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';

import classnames from 'classnames';
import styles from './index.module.sass';

interface InputProps {
  className?: string,
  children?: ReactNode,
  type: any,
  value: any,
  step?: string,
  id?: string,
  onChange(e: any): any,
}

const Input = ({ className, children, ...rest }: InputProps) => (
  <Form.Control
    {...rest}
    className={classnames(className, styles.input)}
  >
    {children}
  </Form.Control>
);

export const Label = ({ className, children, ...rest }) => (
  <Form.Label
    {...rest}
    className={classnames(className, styles.label)}
  >
    {children}
  </Form.Label>
);

export default Input;
