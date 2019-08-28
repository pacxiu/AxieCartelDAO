import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { Container } from 'components/Layout';

const Card = ({ children, className, link }) => (
  link
    ? (
      <Link
        to={link}
        className={classnames(styles.card, className)}
      >
        {children}
      </Link>
    )
    : (
      <div
        className={classnames(styles.card, className)}
      >
        {children}
      </div>
    )
);

export const CardsContainer = ({ children }) => (
  <Container className={styles.cards}>
    {children}
  </Container>
);

export default Card;
