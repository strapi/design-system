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
  border: 1px solid ${({ theme, disabled }) => (disabled ? theme.colors.neutral300 : theme.colors.neutral200)};
  display: inline-flex;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  // Masks the background of each value
  overflow: hidden;

  ${inputFocusStyle()}
`;

const OnBox = styled(Flex)`
  text-transform: uppercase;
  position: relative;
  z-index: 2;
`;

const OffBox = styled(Flex)`
  text-transform: uppercase;
  border-right: 1px solid ${({ theme, disabled }) => (disabled ? theme.colors.neutral300 : theme.colors.neutral200)};
  position: relative;
  z-index: 2;
`;

/**
 * visually Hiding the input under the wrapper without SR-only
 * helps Android SR to provide information with touch and haptic
 */
const Input = styled.input`
  position: absolute;
  z-index: 1;
  // These are pixel in order to escape the focus offset set in pixel. It's just a hack to hide
  // the Input behind the toggle checkbox
  left: 4px;
  top: 4px;
`;

export const ToggleCheckbox = React.forwardRef(
  ({ size, onLabel, offLabel, children, checked, disabled, onChange, id, ...props }, ref) => {
    const labelColor = 'neutral800';
    let offCheckboxLabelColor = checked ? labelColor : 'danger700';
    let onCheckboxLabelColor = checked ? 'primary700' : labelColor;
    let offCheckboxBackgroundColor = checked ? 'neutral0' : 'danger100';
    let onCheckboxBackgroundColor = checked ? 'primary100' : 'neutral0';

    if (checked === null) {
      offCheckboxBackgroundColor = 'neutral0';
      onCheckboxBackgroundColor = 'neutral0';
      offCheckboxLabelColor = 'neutral600';
      onCheckboxLabelColor = 'neutral600';
    }

    const handleChange = (e) => {
      if (disabled) return;

      onChange(e);
    };

    return (
      <Label>
        <VisuallyHidden>{children}</VisuallyHidden>

        <ToggleCheckboxWrapper id={id} background="neutral0" hasRadius size={size} disabled={disabled}>
          <OffBox
            background={disabled ? 'neutral150' : offCheckboxBackgroundColor}
            paddingLeft={7}
            paddingRight={7}
            aria-hidden={true}
            disabled={disabled}
          >
            <Typography variant="pi" fontWeight="bold" textColor={disabled ? 'neutral600' : offCheckboxLabelColor}>
              {offLabel}
            </Typography>
          </OffBox>

          <OnBox
            background={disabled ? 'neutral200' : onCheckboxBackgroundColor}
            paddingLeft={7}
            paddingRight={7}
            aria-hidden={true}
          >
            <Typography variant="pi" fontWeight="bold" textColor={disabled ? 'neutral700' : onCheckboxLabelColor}>
              {onLabel}
            </Typography>
          </OnBox>

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
  checked: false,
  disabled: false,
  id: undefined,
  onChange: undefined,
  size: 'M',
};

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  offLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
