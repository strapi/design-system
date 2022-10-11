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
  z-index: 0;
`;

const ToggleCheckboxWrapper = styled(Box)`
  height: ${getThemeSize('input')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  // Masks the background of each value
  overflow: hidden;

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
          size={size}
          disabled={disabled}
          padding={1}
          display="inline-flex"
          background={disabled ? 'neutral150' : 'neutral100'}
          borderStyle="solid"
          borderWidth="1px"
          borderColor="neutral200"
        >
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
              textColor={disabled ? 'neutral700' : offCheckboxLabelColor}
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
              textColor={disabled ? 'neutral700' : onCheckboxLabelColor}
            >
              {onLabel}
            </Typography>
          </ValueBox>

          <Input
            type="checkbox"
            aria-disabled={disabled}
            onChange={(e) => handleChange(e)}
            ref={ref}
            {...props}
            checked={checked === null || !checked ? false : true}
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
