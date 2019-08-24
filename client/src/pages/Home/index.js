import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Particles from 'components/Particles';
import { WithDaiIcon } from 'components/Icons';

const Home = ({ general }) => (
  <FullHeight className={classnames(styles.container, styles.custom)}>
    <Container>
      <Particles className={styles.particles} />
      <h1 className={styles.title}>Axie Cartel Dao</h1>
      <h2 className={styles.subtitle}>Where dev dreams come true.</h2>
      <div className={styles.dataContainer}>
        {general
          ? (
            <React.Fragment>
              <p className={styles.bankValue}>
                <span className={styles.dataTitle}>Bank</span>
                <WithDaiIcon>
                  {parseFloat(general.bank).toFixed(2)}
                </WithDaiIcon>
              </p>
              <div className={styles.shares}>
                <p className={styles.sharesValue}>
                  <span className={styles.dataTitle}>Shares</span>
                  {general.shares}
                </p>
                <p className={styles.sharesValue}>
                  <span className={styles.dataTitle}>Share Value</span>
                  <WithDaiIcon>
                    {parseFloat(general.bank / general.shares).toFixed(2)}
                  </WithDaiIcon>
                </p>
              </div>
            </React.Fragment>
          )
          : <Loader />
        }
      </div>
    </Container>
  </FullHeight>
);

const mapStateToProps = ({ daoData: { general } }) => ({
  general,
});

export default connect(mapStateToProps)(Home);
