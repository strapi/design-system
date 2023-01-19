/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import PropTypes from 'prop-types';
import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';

import { Field, FieldError, FieldHint, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

import { useId } from '../helpers/useId';

import { getThemeSize, inputFocusStyle } from '../themes/utils';

export const SingleSelect = ({
  hint,
  disabled,
  error,
  id,
  required,
  label,
  labelAction,
  placeholder,
  children,
  startIcon,
  size,
}) => {
  const [internalValue, setInternalValue] = React.useState('');
  const generatedId = useId('select', id);

  const hintId = `${generatedId}-hint`;
  const errorId = `${generatedId}-error`;

  const hasStringError = typeof error === 'string';

  const handleValueChange = (value) => {
    setInternalValue(value);
  };

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <Stack spacing={label || hint || hasStringError ? 1 : 0}>
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <RadixSelect.Root disabled={disabled} required={required} onValueChange={handleValueChange}>
          <Trigger
            aria-labelledby={`${generatedId} ${hintId} ${errorId}`}
            aria-disabled={disabled}
            $hasError={Boolean(error)}
            $size={size}
          >
            <Flex as="span" gap={4}>
              {/* TODO: make this composable in v2 – <Select.Icon /> */}
              {startIcon && (
                <Box as="span" paddingLeft={3} aria-hidden>
                  {startIcon}
                </Box>
              )}
              <Typography ellipsis textColor={internalValue ? 'neutral800' : 'neutral600'}>
                <RadixSelect.Value placeholder={placeholder} />
              </Typography>
            </Flex>
            <DownIcon>
              <CarretDown />
            </DownIcon>
          </Trigger>
          <RadixSelect.Portal>
            <Content position="popper" sideOffset={4}>
              <Viewport>{children}</Viewport>
            </Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

const Trigger = styled(RadixSelect.Trigger)`
  position: relative;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  min-height: ${({ theme, $size }) => getThemeSize('input')({ theme, size: $size })};
  display: flex;
  align-items: center;
  justify-content: space-between;

  [aria-disabled='true'] {
    color: ${(props) => props.theme.colors.neutral600};
    background: ${(props) => props.theme.colors.neutral150};
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, hasError: $hasError })};
`;

const DownIcon = styled(RadixSelect.Icon)`
  & > svg {
    width: 6px;

    & > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;

const Content = styled(RadixSelect.Content)`
  z-index: 4;
  background: ${({ theme }) => theme.colors.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spaces[1]};
  width: var(--radix-select-trigger-width);
`;

const Viewport = styled(RadixSelect.Viewport)`
  overflow: visible !important;
`;

// NewSelect.propTypes = {
//   'aria-label': PropTypes.string,
//   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
//   clearLabel: PropTypes.string,
//   customizeContent: PropTypes.func,
//   disabled: PropTypes.bool,
//   error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   label: PropTypes.string,
//   labelAction: PropTypes.element,
//   multi: PropTypes.bool,
//   onChange: PropTypes.func,
//   onClear: PropTypes.func,
//   onReachEnd: PropTypes.func,
//   placeholder: PropTypes.string,
//   required: PropTypes.bool,
//   selectButtonTitle: PropTypes.string,
//   size: PropTypes.oneOf(Object.keys(sizes.input)),
//   startIcon: PropTypes.element,
//   value: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
//     PropTypes.string,
//     PropTypes.number,
//   ]),
// };
