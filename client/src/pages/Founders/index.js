import React from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import { FullHeight, Container } from 'components/Layout';
import AnchorExternal from 'components/AnchorExternal';

import ExhumanImage from 'assets/founders/Exhuman.png';
import ClumsierImage from 'assets/founders/Clumsier.png';
import YuurinImage from 'assets/founders/Yuurin.jpg';

const Founders = () => (
  <FullHeight start className={classnames(styles.container, styles.page)}>
    <Container>
      <h1>Founders</h1>
      <ul className={styles.listFounders}>
        <li>
          <img src={ExhumanImage} alt="Exhuman avatar" />
        </li>
        <li>
          <img src={ClumsierImage} alt="Clumsier avatar" />
        </li>
        <li className={styles.yuurin}>
          <img src={YuurinImage} alt="YuurinB avatar" />
        </li>
      </ul>
      <ul className={styles.listFounders}>
        <li>
          <b>Summoner</b>
          <p><AnchorExternal href="https://twitter.com/3xhuman">ExHuman</AnchorExternal></p>
        </li>
        <li>
          <b>DAO First Dev</b>
          <p>Clumsier</p>
        </li>
        <li>
          <b>DAO Logo design</b>
          <p><AnchorExternal href="https://twitter.com/YuurinB">YuurinBe</AnchorExternal></p>
        </li>
      </ul>
    </Container>
  </FullHeight>
);

export default Founders;
