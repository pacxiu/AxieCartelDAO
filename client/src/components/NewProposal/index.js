import React, { useState } from 'react';

import styles from './index.module.sass';

import Modal from 'components/Modal';
import Input, { Label } from 'components/Input';
import Button from 'components/Button';

import { submitProposal, getProposalQueueLength } from 'services/AxieDaoService';
import { toU256 } from 'shared/contracts/utils';

const NewProposal = ({
  onClose,
  isOpen,
  currentUser,
}) => {
  const [applicant, setApplicant] = useState(currentUser);
  const [tokenTribute, setTokenTribute] = useState(0);
  const [sharesRequested, setSharesRequested] = useState(0);
  const [details, setDetails] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    submitProposal(
      currentUser,
      applicant,
      toU256(tokenTribute),
      sharesRequested,
      details,
      link,
      description,
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
        <div className={styles.additional}>
          <h5>Additional Information</h5>
          <div className={styles.inputControl}>
            <Label htmlFor="proposalLink">Link</Label>
            <Input
              id="proposalLink"
              value={link}
              onChange={e => setLink(e.target.value)}
              type="text"
              placeholder="Link"
            />
          </div>
          <div>
            <Label htmlFor="proposalDescription">Description</Label>
            <Input
              id="proposalDescription"
              value={description}
              onChange={e => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              as="textarea"
              rows="3"
              className={styles.textarea}
            />
          </div>
        </div>
        <Button
          white
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
