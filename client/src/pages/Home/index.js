import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';

const Home = () => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    Axie Cartel Dao
  </FullHeight>
);

export default Home;
