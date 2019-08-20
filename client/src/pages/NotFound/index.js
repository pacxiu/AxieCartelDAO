import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';

const NotFound = () => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      <h1 className={styles.title}>Page Not Found</h1>
    </Container>
  </FullHeight>
);

export default NotFound;
