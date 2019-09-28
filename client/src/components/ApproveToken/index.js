import React, { useEffect, useState } from 'react';

import styles from './index.module.sass';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import { WithDaiIcon } from 'components/Icons';

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
      setAllowedTokens((userAllowance / 1e18).toFixed(1));
    };

    getTokenData();
  }, []);

  return (
    <Modal {...{ onClose, isOpen }}>
      <div className={styles.inputControl}>
        <Input
          value={approvedTokens}
          max={balance}
          step={1}
          onChange={e => onApprovedTokensChange(e.target.value)}
          type="number"
          placeholder="Tokens to approve"
        />
        <p className={styles.hint}>
          Available tokens:
          <WithDaiIcon type="dark">{balance}</WithDaiIcon>
        </p>
        <p className={styles.hint}>
          Current allowance:
          <WithDaiIcon type="dark">{allowedTokens}</WithDaiIcon>
        </p>
      </div>
      <Button
        disabled={approvedTokens <= 0}
        onClick={() => approve(contracts.AxieDao.address, toU256(approvedTokens))}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default ApproveToken;
