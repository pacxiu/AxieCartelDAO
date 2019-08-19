import React, { Component } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { Container } from 'components/Layout';

const Card = ({ children, className }) => (
  <div
    className={classnames(styles.card, className)}
  >
    {children}
  </div>
);

export const CardsContainer = ({ children }) => (
  <Container className={styles.cards}>
    {children}
  </Container>
);

export default Card;
