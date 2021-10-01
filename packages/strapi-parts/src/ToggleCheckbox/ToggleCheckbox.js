import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sizes } from '../themes/sizes';
import { getThemeSize } from '../themes/utils';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { Box } from '../Box';
import { Row } from '../Row';

const Label = styled.label`
  position: relative;
  display: inline-block;

  &:active,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6);
  }
`;

const ToggleCheckboxWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  display: inline-flex;
  // Masks the background of each value
  overflow: hidden;
`;

const OnBox = styled(Row)`
  text-transform: uppercase;
  height: ${getThemeSize('input')};
`;

const OffBox = styled(Row)`
  text-transform: uppercase;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  height: ${getThemeSize('input')};
`;

/**
 * visually Hiding the input under the wrapper without SR-only
 * helps Android SR to provide information with touch and haptic
 */
const Input = styled.input`
  position: absolute;
  // These are pixel in order to escape the focus offset set in pixel. It's just a hack to hide
  // the Input behind the toggle checkbox
  left: 4px;
  top: 4px;
`;

export const ToggleCheckbox = React.forwardRef(({ size, onLabel, offLabel, children, checked, ...props }, ref) => {
  const labelColor = 'neutral800';

  return (
    <Label>
      <VisuallyHidden>{children}</VisuallyHidden>

      <Input type="checkbox" ref={ref} {...props} checked={checked} />

      <ToggleCheckboxWrapper background="neutral0" aria-hidden={true} hasRadius>
        <OffBox size={size} background={checked ? undefined : 'danger100'} paddingLeft={7} paddingRight={7}>
          <Text small={true} bold={true} textColor={checked ? labelColor : 'danger700'}>
            {offLabel}
          </Text>
        </OffBox>

        <OnBox size={size} background={checked ? 'primary100' : undefined} paddingLeft={7} paddingRight={7}>
          <Text small={true} bold={true} textColor={checked ? 'primary700' : labelColor}>
            {onLabel}
          </Text>
        </OnBox>
      </ToggleCheckboxWrapper>
    </Label>
  );
});

ToggleCheckbox.displayName = 'ToggleCheckbox';

ToggleCheckbox.defaultProps = {
  size: 'M',
};

ToggleCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  offLabel: PropTypes.string.isRequired,
  onLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
};
