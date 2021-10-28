import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { useNotifyAT } from './useNotifyAT';

// This component exist to demonstrate the unmounting effect of the hook
// in a condition, in the storybook
export const StoryComponent = ({ notifyType }) => {
  const { notifyAlert, notifyStatus, notifyLog } = useNotifyAT();

  const handleClick = () => {
    if (notifyType === 'log') {
      notifyLog('This is a log message');
    } else if (notifyType === 'alert') {
      notifyAlert('This is an alert');
    } else {
      notifyStatus('This is a status message');
    }
  };

  return <Button onClick={handleClick}>Toggle {notifyType}</Button>;
};

StoryComponent.propTypes = {
  notifyType: PropTypes.string.isRequired,
};
