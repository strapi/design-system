import React from 'react';

import styled, { type DefaultTheme } from 'styled-components';

import { Box } from '../Box';
import { useField } from '../Field';
import { Flex } from '../Flex';
import type { InputSizes } from '../themes/sizes';
import { inputFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const Label = styled.label`
  position: relative;
  display: inline-block;
  z-index: 0;
  width: 100%;
`;

export interface ToggleCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'children'> {
  children: string;
  offLabel: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLabel: string;
  size?: InputSizes;
}

type ValueBoxProps = Pick<ToggleCheckboxProps, 'checked' | 'disabled' | 'size'>;

const ToggleCheckboxWrapper = styled(Box)<{ disabled: boolean; hasError: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  // Masks the background of each value
  overflow: hidden;
  flex-wrap: wrap;

  ${inputFocusStyle()}
`;

const ValueBox = styled(Flex).attrs<{ hasRadius: boolean }>({
  hasRadius: true,
})<ValueBoxProps>`
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

export const ToggleCheckbox = React.forwardRef<HTMLInputElement, ToggleCheckboxProps>(
  ({ size = 'M', onLabel, offLabel, children, checked = false, disabled = false, onChange, ...props }, ref) => {
    const { error, hint, id, name, required } = useField();

    const labelColor = 'neutral600';

    let offCheckboxLabelColor: keyof DefaultTheme['colors'] = !checked && checked !== null ? 'danger700' : labelColor;
    let onCheckboxLabelColor: keyof DefaultTheme['colors'] = checked ? 'primary600' : labelColor;

    const handleChange = (e) => {
      if (disabled) return;

      if (onChange) {
        onChange(e);
      }
    };

    // Ensuring we pass the right aria-describedby attribute to the Input component as
    // ToggleCheckbox is not using FieldInput which would allow us to pass on the error or hint with aria-describedby
    let ariaDescription;

    if (error) {
      ariaDescription = `${id}-error`;
    } else if (hint) {
      ariaDescription = `${id}-hint`;
    }

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
          hasError={Boolean(error)}
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
            aria-describedby={ariaDescription}
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
