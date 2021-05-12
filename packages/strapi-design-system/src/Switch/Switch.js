import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SwitchButton = styled.button`
  background: ${({ theme }) => theme.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  transition: all 0.5s;
  height: ${24 / 16}rem;
  width: ${40 / 16}rem;

  & span {
    font-size: 0px;
  }

  &:before {
    content: '';
    background: ${({ theme }) => theme.colors.neutral0};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    transition: all 0.5s;
    left: ${({ theme }) => theme.spaces[1]};
    top: ${({ theme }) => theme.spaces[1]};
  }

  &[aria-checked='true'] {
    background: ${({ theme }) => theme.colors.success500};
  }

  &[aria-checked='true']:before {
    transform: translateX(1rem);
  }
`;

export const Switch = React.forwardRef(({ label, onSwitch, onLabel, offLabel, selected, ...props }, ref) => {
  return (
    <SwitchButton
      ref={ref}
      role="switch"
      aria-checked={selected}
      aria-label={label}
      onClick={() => onSwitch(!selected)}
      {...props}
    >
      <span>{onLabel}</span>
      <span>{offLabel}</span>
    </SwitchButton>
  );
});

Switch.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
};

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
  onSwitch: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

Switch.displayName = 'Switch';
