import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { inputFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';
import { Box } from '../Box';
import { useField } from '../Field';
import { Flex } from '../Flex';

const Label = styled.label`
  position: relative;
  display: inline-block;
  z-index: 0;
  width: 100%;
`;

const ToggleCheckboxWrapper = styled(Box)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  // Masks the background of each value
  overflow: hidden;
  flex-wrap: wrap;

  ${inputFocusStyle()}
`;

const ValueBox = styled(Flex).attrs({
  hasRadius: true,
})`
  background-color: ${({ theme, checked, disabled }) => {
    if (checked) {
      return disabled ? theme.colors.neutral200 : theme.colors.neutral0;
    }

    return 'transparent';
  }};
  border: 1px solid
    ${({ theme, checked, disabled }) => {
      if (checked && checked !== null) {
        return disabled ? theme.colors.neutral300 : theme.colors.neutral200;
      }

      return disabled ? theme.colors.neutral150 : theme.colors.neutral100;
    }};
  position: relative;
  user-select: none;
  z-index: 2;
  flex: 1 1 50%;
  /**
    We declare the defined value because we want the height of the input when 
    the values are in a row to be 40px. But defining a height on the label
    would break the input when it wraps.
  */
  padding-top: ${({ size }) => `${size === 'S' ? '2px' : '6px'}`};
  padding-bottom: ${({ size }) => `${size === 'S' ? '2px' : '6px'}`};
`;

/**
 * visually hiding the input without SR-only helps Android SR to provide information with touch and haptic
 */
const Input = styled.input`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
`;

export const ToggleCheckbox = React.forwardRef(
  ({ size, onLabel, offLabel, children, checked, disabled, onChange, ...props }, ref) => {
    const { name, required } = useField();

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

        <ToggleCheckboxWrapper
          hasRadius
          disabled={disabled}
          padding={1}
          display="flex"
          background={disabled ? 'neutral150' : 'neutral100'}
          borderStyle="solid"
          borderWidth="1px"
          borderColor="neutral200"
        >
          <ValueBox
            size={size}
            paddingLeft={3}
            paddingRight={3}
            justifyContent="center"
            alignItems="center"
            aria-hidden
            checked={checked === null ? false : !checked}
            disabled={disabled}
          >
            <Typography
              variant="pi"
              fontWeight="bold"
              textTransform="uppercase"
              textColor={disabled ? 'neutral700' : offCheckboxLabelColor}
            >
              {offLabel}
            </Typography>
          </ValueBox>

          <ValueBox
            size={size}
            paddingLeft={3}
            paddingRight={3}
            justifyContent="center"
            alignItems="center"
            aria-hidden
            checked={checked === null ? false : checked}
            disabled={disabled}
          >
            <Typography
              variant="pi"
              fontWeight="bold"
              textTransform="uppercase"
              textColor={disabled ? 'neutral700' : onCheckboxLabelColor}
            >
              {onLabel}
            </Typography>
          </ValueBox>

          <Input
            type="checkbox"
            aria-disabled={disabled}
            onChange={(e) => handleChange(e)}
            name={name}
            ref={ref}
            aria-required={required}
            {...props}
            checked={!(checked === null || !checked)}
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
