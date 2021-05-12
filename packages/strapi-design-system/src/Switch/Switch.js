import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '../Row';
import { Box } from '../Box';

const SwitchContent = styled.div`
  background: ${({ theme }) => theme.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  transition: all 0.5s;
  height: ${24 / 16}rem;
  width: ${40 / 16}rem;

  & span {
    font-size: ${({ visibleLabels }) => (visibleLabels ? '1rem' : 0)};
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
`;

const SwitchButton = styled.button`
  background: transparent;
  padding: 0;
  border: none;

  &[aria-checked='true'] ${SwitchContent} {
    background: ${({ theme }) => theme.colors.success500};
  }

  &[aria-checked='true'] ${SwitchContent}:before {
    transform: translateX(1rem);
  }
`;

export const Switch = React.forwardRef(
  ({ label, onSwitch, onLabel, offLabel, selected, visibleLabels, ...props }, ref) => {
    return (
      <SwitchButton
        ref={ref}
        role="switch"
        aria-checked={selected}
        aria-label={label}
        onClick={() => onSwitch(!selected)}
        visibleLabels={visibleLabels}
        {...props}
      >
        <Row>
          <SwitchContent>
            <span>{onLabel}</span>
            <span>{offLabel}</span>
          </SwitchContent>

          {visibleLabels && (
            <Box as="span" aria-hidden={true} paddingLeft={2} color={selected ? 'success600' : 'danger600'}>
              {selected ? onLabel : offLabel}
            </Box>
          )}
        </Row>
      </SwitchButton>
    );
  },
);

Switch.defaultProps = {
  onLabel: 'On',
  offLabel: 'Off',
  visibleLabels: false,
};

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
  onSwitch: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  visibleLabels: PropTypes.bool,
};

Switch.displayName = 'Switch';
