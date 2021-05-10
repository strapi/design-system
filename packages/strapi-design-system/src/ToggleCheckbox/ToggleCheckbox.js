import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { Box } from '../Box';

const ToggleCheckboxWrapper = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  display: inline-flex;
  // Masks the background of each value
  overflow: hidden;
`;

const Label = styled.label`
  &:active,
  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
  }
`;

const OnBox = styled(Box)`
  text-transform: uppercase;
`;

const OffBox = styled(Box)`
  text-transform: uppercase;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
`;

export const ToggleCheckbox = React.forwardRef(({ onLabel, offLabel, children, checked, ...props }, ref) => {
  const labelColor = 'neutral800';

  return (
    <Label>
      <VisuallyHidden>
        {children}
        <input type="checkbox" ref={ref} {...props} checked={checked} />
      </VisuallyHidden>

      <ToggleCheckboxWrapper background="neutral0" aria-hidden={true} hasRadius>
        <OffBox
          background={checked ? undefined : 'danger100'}
          paddingLeft={7}
          paddingRight={7}
          paddingTop={3}
          paddingBottom={3}
        >
          <Text small={true} highlighted={true} as="span" textColor={checked ? labelColor : 'danger700'}>
            {offLabel}
          </Text>
        </OffBox>

        <OnBox
          background={checked ? 'primary100' : undefined}
          paddingLeft={7}
          paddingRight={7}
          paddingTop={3}
          paddingBottom={3}
        >
          <Text small={true} highlighted={true} as="span" textColor={checked ? 'primary700' : labelColor}>
            {onLabel}
          </Text>
        </OnBox>
      </ToggleCheckboxWrapper>
    </Label>
  );
});

ToggleCheckbox.displayName = 'ToggleCheckbox';

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  offLabel: PropTypes.string.isRequired,
  onLabel: PropTypes.string.isRequired,
};
