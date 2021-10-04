import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttonFocusStyle } from '../themes/utils';

export const BaseButtonWrapper = styled.button`
  display: flex;
  cursor: pointer;
  padding: ${({ theme }) => theme.spaces[2]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  svg {
    height: ${({ theme }) => theme.spaces[3]};
    width: ${({ theme }) => theme.spaces[3]};
  }
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral0};
    }
  }
  &[aria-disabled='true'] {
    pointer-events: none;
  }

  ${buttonFocusStyle}
`;

export const BaseButton = React.forwardRef(({ disabled, children, ...props }, ref) => {
  return (
    <BaseButtonWrapper ref={ref} aria-disabled={disabled} type="button" disabled={disabled} {...props}>
      {children}
    </BaseButtonWrapper>
  );
});

BaseButton.displayName = 'BaseButton';

BaseButton.defaultProps = {
  disabled: false,
};
BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};
