/* eslint-disable no-nested-ternary */
import * as React from 'react';

import { styled } from 'styled-components';

import { useControllableState } from '../../hooks/useControllableState';
import { inputFocusStyle } from '../../themes';
import { Field, useField } from '../Field';
import { Flex, FlexComponent } from '../Flex';
import { Typography } from '../Typography';

import type { InputSizes } from '../../themes/sizes';

interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'name' | 'children' | 'required' | 'id' | 'size' | 'checked'>,
    Pick<Field.InputProps, 'required' | 'name' | 'id' | 'hasError'> {
  onLabel: string;
  offLabel: string;
  checked?: boolean | null;
  size?: InputSizes;
}

type ToggleInputElement = HTMLInputElement;

/**
 * TODO: This should probably follow the switch button pattern
 * as seen – https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-button/
 */
const Toggle = React.forwardRef<ToggleInputElement, ToggleProps>(
  (
    {
      offLabel,
      onLabel,
      disabled,
      hasError: hasErrorProp,
      required: requiredProp,
      id: idProp,
      name: nameProp,
      checked: checkedProp,
      onChange,
      size = 'M',
      ...props
    },
    forwardedRef,
  ) => {
    const [checked = false, setChecked] = useControllableState<boolean | null>({
      prop: checkedProp,
    });

    const isFalseyChecked = checked !== null && !checked;

    const { error, ...field } = useField('Toggle');
    const hasError = Boolean(error) || hasErrorProp;
    const id = field.id ?? idProp;
    const name = field.name ?? nameProp;
    const required = field.required || requiredProp;

    let ariaDescription: string | undefined;
    if (error) {
      ariaDescription = `${id}-error`;
    } else if (field.hint) {
      ariaDescription = `${id}-hint`;
    }

    return (
      <ToggleWrapper
        position="relative"
        hasRadius
        padding={1}
        background={disabled ? 'neutral150' : 'neutral100'}
        borderStyle="solid"
        borderWidth="1px"
        borderColor="neutral200"
        wrap="wrap"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        $hasError={hasError}
      >
        <ToggleOption
          hasRadius
          flex="1 1 50%"
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={3}
          paddingRight={3}
          justifyContent="center"
          background={disabled && isFalseyChecked ? 'neutral200' : isFalseyChecked ? 'neutral0' : 'transparent'}
          borderColor={
            disabled && isFalseyChecked
              ? 'neutral300'
              : isFalseyChecked
                ? 'neutral200'
                : disabled
                  ? 'neutral150'
                  : 'neutral100'
          }
          $size={size}
        >
          <Typography
            variant="pi"
            fontWeight="bold"
            textTransform="uppercase"
            textColor={disabled ? 'neutral700' : isFalseyChecked ? 'danger700' : 'neutral600'}
          >
            {offLabel}
          </Typography>
        </ToggleOption>
        <ToggleOption
          hasRadius
          flex="1 1 50%"
          paddingLeft={3}
          paddingRight={3}
          justifyContent="center"
          background={disabled && checked ? 'neutral200' : checked ? 'neutral0' : 'transparent'}
          borderColor={
            disabled && checked ? 'neutral300' : checked ? 'neutral200' : disabled ? 'neutral150' : 'neutral100'
          }
          $size={size}
        >
          <Typography
            variant="pi"
            fontWeight="bold"
            textTransform="uppercase"
            textColor={disabled ? 'neutral700' : checked ? 'primary600' : 'neutral600'}
          >
            {onLabel}
          </Typography>
        </ToggleOption>
        <Input
          {...props}
          id={id}
          name={name}
          ref={forwardedRef}
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
            onChange?.(e);
          }}
          type="checkbox"
          aria-required={required}
          disabled={disabled}
          aria-disabled={disabled}
          checked={Boolean(checked)}
          aria-describedby={ariaDescription}
        />
      </ToggleWrapper>
    );
  },
);

const ToggleWrapper = styled<FlexComponent>(Flex)<{ $hasError?: boolean }>`
  ${inputFocusStyle()}
`;

const ToggleOption = styled<FlexComponent>(Flex)<{ $size: InputSizes }>`
  /**
    We declare the defined value because we want the height of the input when 
    the values are in a row to be 40px. But defining a height on the label
    would break the input when it wraps.
  */
  padding-top: ${({ $size }) => `${$size === 'S' ? '2px' : '6px'}`};
  padding-bottom: ${({ $size }) => `${$size === 'S' ? '2px' : '6px'}`};
`;

const Input = styled.input`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
`;

export { Toggle };
export type { ToggleProps };
