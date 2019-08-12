import React from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

const style = {
  Dismiss: {
    DefaultStyle: {
      lineHeight: '18px',
      width: '15px',
      height: '15px',
    },
  },
};

const NotificationsList = ({ notifications }) => (
  <Notifications
    {... { style, notifications }}
  />
);

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(NotificationsList);
