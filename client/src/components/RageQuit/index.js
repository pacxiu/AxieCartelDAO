import React, { useState } from 'react';

import styles from './index.module.sass';

import Modal from 'components/Modal';
import Input, { Label } from 'components/Input';
import Button from 'components/Button';

import { rageQuit } from 'services/AxieDaoService';

const RageQuitModal = ({
  onClose,
  isOpen,
  shares,
  currentUser,
}) => {
  const [sharesQuit, onSharesQuitChange] = useState('');

  return (
    <Modal {...{ onClose, isOpen }}>
      <h2 className={styles.title}>Rage Quit</h2>
      <div className={styles.inputControl}>
        <Label htmlFor="sharesQuit">Shares to quit</Label>
        <Input
          id="sharesQuit"
          value={sharesQuit}
          max={shares}
          step={1}
          onChange={e => onSharesQuitChange(e.target.value)}
          type="number"
          placeholder="Shares to quit"
        />
        <p className={styles.hint}>Owned: {shares}</p>
      </div>
      <Button
        white
        disabled={sharesQuit <= 0}
        onClick={() => rageQuit(currentUser, sharesQuit)}
        className={styles.buttonSubmit}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default RageQuitModal;
