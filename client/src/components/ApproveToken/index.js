import React, { useEffect, useState } from 'react';

import styles from './index.module.sass';

import Modal from 'components/Modal';
import Input, { Label } from 'components/Input';
import Button from 'components/Button';
import { WithDaiIcon, DaiIcon } from 'components/Icons';

import { balanceOf, approve, allowance } from 'services/ApprovedTokenService';
import contracts from 'shared/contracts';
import { toU256 } from 'shared/contracts/utils';

const ApproveToken = ({
  onClose,
  isOpen,
  currentUser,
}) => {
  const [approvedTokens, onApprovedTokensChange] = useState('');
  const [balance, setBalance] = useState('null');
  const [allowedTokens, setAllowedTokens] = useState('null');

  useEffect(() => {
    const getTokenData = async () => {
      const userBalance = await balanceOf(currentUser);
      const userAllowance = await allowance(currentUser, contracts.AxieDao.address);

      setBalance(userBalance);
      setAllowedTokens(userAllowance);
    };

    getTokenData();
  }, []);

  return (
    <Modal {...{ onClose, isOpen }}>
      <h2 className={styles.title}>Approve <DaiIcon /> Token</h2>
      <div className={styles.inputControl}>
        <Label htmlFor="sharesQuit">Tokens to approve</Label>
        <Input
          value={approvedTokens}
          max={balance}
          step={1}
          onChange={e => onApprovedTokensChange(e.target.value)}
          type="number"
          placeholder="Tokens to approve"
          className={styles.input}
        />
        <div className={styles.hints}>
          <p className={styles.hint}>
            Available:
            <WithDaiIcon type="dark">{balance}</WithDaiIcon>
          </p>
          <p className={styles.hint}>
            Allowed:
            <WithDaiIcon type="dark">{allowedTokens}</WithDaiIcon>
          </p>
        </div>
      </div>
      <Button
        white
        disabled={approvedTokens <= 0}
        onClick={() => approve(contracts.AxieDao.address, toU256(approvedTokens))}
        className={styles.buttonSubmit}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default ApproveToken;
