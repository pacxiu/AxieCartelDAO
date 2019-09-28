export const ProposalStatus = {
  VOTING: 'VOTING',
  GRACE: 'GRACE',
  COMPLETED: 'COMPLETED',
  READY_FOR_PROCESSING: 'READY_FOR_PROCESSING',
  CAN_ABORT: 'CAN_ABORT',
};

export const convertTitle = (title, id) => {
  const defaultTitle = `Genesis Proposal ${id}`;

  if (title.includes('title~')) {
    return title.split('title~')[1];
  }

  if (title.includes('://') || !title) {
    return defaultTitle;
  }

  return title;
};
