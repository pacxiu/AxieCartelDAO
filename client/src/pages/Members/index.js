import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';

const Members = () => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    Members
  </FullHeight>
);

export default Members;
