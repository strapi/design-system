import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { getThemeSize, inputFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';
import { Box } from '../Box';
import { Flex } from '../Flex';

const Label = styled.label`
  position: relative;
  display: inline-block;
`;

const ToggleCheckboxWrapper = styled(Box)`
  height: ${getThemeSize('input')};
  background-color: ${({ theme }) => theme.colors.neutral100};
  border: 1px solid ${({ theme, disabled }) => (disabled ? theme.colors.neutral300 : theme.colors.neutral200)};
  display: inline-flex;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  // Masks the background of each value
  overflow: hidden;
  padding: ${({ theme }) => theme.spaces[1]};

  ${inputFocusStyle()}
`;

const ValueBox = styled(Flex).attrs({
  hasRadius: true,
})`
  background-color: ${({ theme, disabled, checked }) => (checked && !disabled ? theme.colors.neutral0 : 'transparent')};
  border: ${({ theme, disabled, checked }) =>
    checked && checked !== null && !disabled ? `1px solid ${theme.colors.neutral200}` : '0'};
  position: relative;
  user-select: none;
  z-index: 2;
`;

/**
 * visually hiding the input without SR-only helps Android SR to provide information with touch and haptic
 */
const Input = styled.input`
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const ToggleCheckbox = React.forwardRef(
  ({ size, onLabel, offLabel, children, checked, disabled, onChange, ...props }, ref) => {
    const labelColor = 'neutral600';

    let offCheckboxLabelColor = !checked && checked !== null ? 'danger700' : labelColor;
    let onCheckboxLabelColor = checked ? 'primary600' : labelColor;

    const handleChange = (e) => {
      if (disabled) return;

      onChange(e);
    };

    return (
      <Label>
        <VisuallyHidden>{children}</VisuallyHidden>

        <ToggleCheckboxWrapper background="neutral0" hasRadius size={size} disabled={disabled}>
          <ValueBox
            paddingLeft={7}
            paddingRight={7}
            aria-hidden={true}
            checked={checked === null ? false : !checked}
            disabled={disabled}
          >
            <Typography
              variant="pi"
              fontWeight="bold"
              textTransform="uppercase"
              textColor={disabled ? 'neutral600' : offCheckboxLabelColor}
            >
              {offLabel}
            </Typography>
          </ValueBox>

          <ValueBox
            paddingLeft={7}
            paddingRight={7}
            aria-hidden={true}
            checked={checked === null ? false : checked}
            disabled={disabled}
          >
            <Typography
              variant="pi"
              fontWeight="bold"
              textTransform="uppercase"
              textColor={disabled ? 'neutral600' : onCheckboxLabelColor}
            >
              {onLabel}
            </Typography>
          </ValueBox>

          <Input
            type="checkbox"
            aria-disabled={disabled}
            onChange={handleChange}
            ref={ref}
            {...props}
            checked={checked}
          />
        </ToggleCheckboxWrapper>
      </Label>
    );
  },
);

ToggleCheckbox.displayName = 'ToggleCheckbox';

ToggleCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onChange: undefined,
  size: 'M',
};

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  offLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
