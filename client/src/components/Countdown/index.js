import React, { Component } from 'react';
import { ProposalStatus } from 'pages/Proposals';

const periodsToTime = (periods, status, didPass, periodDuration = 17280) => {
  if (periods < 0) {
    if (didPass) {
      return 'Passed';
    }

    return 'Failed';
  }

  const seconds = periodDuration * periods;

  const days = Math.floor((seconds % 31536000) / 86400);
  const hours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);

  let string = '';
  string = days ? `${days} days` : string;
  string = hours ? `${string} ${hours} hours` : string;
  string = minutes ? `${string} ${minutes} minutes` : string;

  if (status === ProposalStatus.GRACE) {
    return `Grace Period Ends: ${string}`;
  }

  return `Voting Ends: ${string}`;
};

const Countdown = ({ periodDifference, status, didPass }) => (
  <p>{periodsToTime(periodDifference, status, didPass)}</p>
);

export default Countdown;
