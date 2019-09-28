import React from 'react';
import { connect } from 'react-redux';
import { ProposalStatus } from 'shared/proposals';

const periodsToTime = (periods, status, didPass, periodDuration = 17280) => {
  if (status === ProposalStatus.READY_FOR_PROCESSING) {
    return 'Ready for processing';
  }

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
  string = days ? `${days} d` : string;
  string = hours ? `${string} ${hours} h` : string;
  string = minutes ? `${string} ${minutes} min` : string;

  if (status === ProposalStatus.GRACE) {
    return `Grace Period Ends in: ${string}`;
  }

  return `Voting Ends in: ${string}`;
};

const Countdown = ({ className, periodDifference, status, didPass, periodDuration }) => (
  <p className={className}>
    {periodsToTime(periodDifference, status, didPass, periodDuration)}
  </p>
);

const mapStateToProps = ({
  daoData: {
    general: {
      periodDuration,
    },
  },
}) => ({
  periodDuration,
});

export default connect(mapStateToProps)(Countdown);
