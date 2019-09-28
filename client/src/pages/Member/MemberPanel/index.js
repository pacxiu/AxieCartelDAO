import React, { useState } from 'react';

import classnames from 'classnames';
import styles from './index.module.sass';

import Button from 'components/Button';
import RageQuit from 'components/RageQuit';
import NewProposal from 'components/NewProposal';
import ApproveToken from 'components/ApproveToken';
import { Contribution } from 'components/Card';

const MemberPanel = ({
  member: {
    address,
    shares,
    tribute,
    delegateKey,
    exists,
  },
  currentUser,
}) => {
  const [rageQuitOpen, toggleRageQuit] = useState(false);
  const [newProposalOpen, toggleNewProposal] = useState(false);
  const [approveTokenOpen, toggleApproveToken] = useState(false);

  return (
    <div className={styles.member}>
      <div className={styles.memberDetails}>
        <p className={styles.title}>Address</p>
        <i>{address}</i>
        <Contribution
          shares={shares}
          tribute={tribute}
          className={styles.contribution}
        />
        <p className={styles.title}>Delegate Key</p>
        <i>{delegateKey}</i>
      </div>
      {currentUser === address
        ? (
          <div className={styles.buttonsContainer}>
            {exists
              ? (
                <React.Fragment>
                  <Button
                    className={styles.button}
                    onClick={() => toggleNewProposal(true)}
                  >
                    New Proposal
                  </Button>
                  <NewProposal
                    onClose={() => toggleNewProposal(false)}
                    isOpen={newProposalOpen}
                    {...{ currentUser }}
                  />
                </React.Fragment>
              )
              : null
            }
            <Button
              className={classnames(styles.button, styles.approve)}
              onClick={() => toggleApproveToken(true)}
            >
              Approve Token
            </Button>
            <ApproveToken
              onClose={() => toggleApproveToken(false)}
              isOpen={approveTokenOpen}
              {...{ currentUser }}
            />
            {exists
              ? (
                <React.Fragment>
                  <Button
                    className={classnames(styles.button, styles.rage)}
                    onClick={() => toggleRageQuit(true)}
                  >
                    Rage Quit
                  </Button>
                  <RageQuit
                    onClose={() => toggleRageQuit(false)}
                    isOpen={rageQuitOpen}
                    {...{ shares, currentUser }}
                  />
                </React.Fragment>
              )
              : null
            }
          </div>
        )
        : null
      }
    </div>
  );
};

export default MemberPanel;
