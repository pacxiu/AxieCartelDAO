import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Loader from 'components/Loader';

const LoadingScreen = () => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      <Loader />
    </Container>
  </FullHeight>
);

export default LoadingScreen;
