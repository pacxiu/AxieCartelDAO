import React, { useState } from 'react';

import styles from './index.module.sass';

import Modal from 'components/Modal';
import Input from 'components/Input';
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
      <div className={styles.inputControl}>
        <Input
          value={sharesQuit}
          max={shares}
          step={1}
          onChange={e => onSharesQuitChange(e.target.value)}
          type="number"
          placeholder="Shares to quit"
        />
        <p className={styles.hint}>Shares Owned: {shares}</p>
      </div>
      <Button
        disabled={sharesQuit <= 0}
        onClick={() => rageQuit(currentUser, sharesQuit)}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default RageQuitModal;
