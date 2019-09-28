import React, { ReactNode } from 'react';

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
    {...{ href, className, ...rest }}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default AnchorExternal;
