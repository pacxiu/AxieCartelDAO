import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';

const NotFound = () => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      Not Found
    </Container>
  </FullHeight>
);

export default NotFound;
