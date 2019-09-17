import React, { useState } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import Modal from 'components/Modal';
import Input, { Label } from 'components/Input';
import Button from 'components/Button';

import { submitProposal } from 'services/AxieDaoService';

const NewProposal = ({
  onClose,
  isOpen,
  currentUser,
}) => {
  const [applicant, setApplicant] = useState(currentUser);
  const [tokenTribute, setTokenTribute] = useState(0);
  const [sharesRequested, setSharesRequested] = useState(0);
  const [details, setDetails] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    submitProposal(
      currentUser,
      applicant,
      tokenTribute,
      sharesRequested,
      details,
    );
  };

  return (
    <Modal
      {...{ onClose, isOpen }}
    >
      <h2 className={styles.title}>New Proposal</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputControl}>
          <Label htmlFor="title">Proposal Title</Label>
          <Input
            id="title"
            value={details}
            onChange={e => setDetails(e.target.value)}
            type="text"
            placeholder="Proposal Title"
          />
        </div>
        <div className={styles.inputControl}>
          <Label htmlFor="applicant">Applicant address</Label>
          <Input
            id="applicant"
            value={applicant}
            onChange={e => setApplicant(e.target.value)}
            type="text"
            placeholder="Applicant address"
          />
        </div>
        <div className={styles.inputControl}>
          <Label htmlFor="tokenTribute">Token Tribute</Label>
          <Input
            id="tokenTribute"
            value={tokenTribute}
            step={1}
            onChange={e => setTokenTribute(e.target.value)}
            type="number"
            placeholder="Token Tribute"
          />
        </div>
        <div className={styles.inputControl}>
          <Label htmlFor="sharesRequested">Shares Requested</Label>
          <Input
            id="sharesRequested"
            value={sharesRequested}
            step={1}
            onChange={e => setSharesRequested(e.target.value)}
            type="number"
            placeholder="Shares requested"
          />
        </div>
        <Button
          type="submit"
          className={styles.buttonSubmit}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default NewProposal;
