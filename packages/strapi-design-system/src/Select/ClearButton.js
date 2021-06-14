import React from 'react';
import PropTypes from 'prop-types';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { IconBox } from './components';
import { useSelect } from './SelectContext';
import { VisuallyHidden } from '../VisuallyHidden';

export const ClearButton = ({ children, onClick, ...props }) => {
  const { disabled, focusButton } = useSelect();

  const handleClick = (e) => {
    if (disabled) return;
    onClick(e);
    focusButton();
  };

  return (
    <IconBox as="button" onClick={handleClick} aria-disabled={disabled} {...props}>
      <CloseAlertIcon />
      <VisuallyHidden>{children}</VisuallyHidden>
    </IconBox>
  );
};

ClearButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
