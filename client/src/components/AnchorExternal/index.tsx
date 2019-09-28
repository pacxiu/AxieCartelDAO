import React, { ReactNode } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

interface AnchorExternalProps {
  href: string;
  children: ReactNode;
  className?: string;
  rest?: {},
}

const AnchorExternal = ({
  href,
  className,
  children,
  rest,
}: AnchorExternalProps) => (
  <a
    className={classnames(className, styles.link)}
    target="_blank"
    rel="noopener noreferrer"
    {...{ href, ...rest }}
  >
    {children}
  </a>
);

export default AnchorExternal;
