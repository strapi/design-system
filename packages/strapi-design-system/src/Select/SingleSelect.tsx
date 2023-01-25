import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { CarretDown, Cross } from '@strapi/icons';
import styled from 'styled-components';

import { Field, FieldError, FieldHint, FieldLabel } from '../Field';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

import { useId } from '../helpers/useId';

import { getThemeSize, inputFocusStyle } from '../themes/utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { useIntersection } from '../helpers/useIntersection';

interface SingleSelectProps {
  children: React.ReactNode;
  /**
   * @default "Clear"
   */
  clearLabel?: string;
  /**
   * @default (value) => value.toString()
   */
  customizeContent?: (value: string | number) => string;
  disabled?: boolean;
  error?: string | boolean;
  hint?: string | React.ReactNode | React.ReactNode[];
  id?: string | number;
  label: string;
  labelAction?: React.ReactElement;
  onChange?: (value: string | number) => void;
  onClear?: React.MouseEventHandler<HTMLDivElement>;
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
  placeholder?: string;
  required?: boolean;
  /**
   * @deprecated This prop is no longer required and will be removed in v2 of the DS.
   * It has no effect on the component.
   */
  selectButtonTitle?: string;
  /**
   * @default "M"
   */
  size?: 'S' | 'M';
  startIcon?: React.ReactElement;
  value?: string | number;
}

export const SingleSelect = ({
  children,
  clearLabel = 'Clear',
  customizeContent = (value) => value.toString(),
  disabled,
  error,
  hint,
  id,
  label,
  labelAction,
  onChange,
  onClear,
  onReachEnd,
  placeholder,
  required,
  selectButtonTitle,
  startIcon,
  size = 'M',
  value: passedValue,
}: SingleSelectProps) => {
  const viewportRef = React.useRef<HTMLDivElement>(null!);

  const [internalValue, setInternalValue] = React.useState('');
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const generatedId = useId('select', id);

  const hintId = `${generatedId}-hint`;
  const errorId = `${generatedId}-error`;

  const hasStringError = typeof error === 'string';

  const handleValueChange: Pick<RadixSelect.SelectProps, 'onValueChange'>['onValueChange'] = (value) => {
    if (onChange) {
      const shouldBeNumber = typeof passedValue === 'number';
      onChange(shouldBeNumber ? Number(value) : value);
    } else {
      setInternalValue(value);
    }
  };

  const handleClearClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClear) {
      onClear(e);
    }
  };

  const handleOpenChange: Pick<RadixSelect.SelectProps, 'onOpenChange'>['onOpenChange'] = (open) => {
    setInternalIsOpen(open);
  };

  const value = typeof passedValue !== 'undefined' ? passedValue.toString() : internalValue;

  const intersectionId = `intersection-${generatedId}`;

  const handleReachEnd = (entry: IntersectionObserverEntry) => {
    if (onReachEnd) {
      onReachEnd(entry);
    }
  };

  useIntersection(viewportRef, handleReachEnd, {
    selectorToWatch: `#${intersectionId}`,
    skipWhen: !internalIsOpen,
  });

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <Stack spacing={label || hint || hasStringError ? 1 : 0}>
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <RadixSelect.Root
          onOpenChange={handleOpenChange}
          disabled={disabled}
          required={required}
          onValueChange={handleValueChange}
        >
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
              <Typography ellipsis textColor={value ? 'neutral800' : 'neutral600'}>
                <RadixSelect.Value aria-label={value}>
                  {value ? customizeContent(value) : placeholder}
                </RadixSelect.Value>
              </Typography>
            </Flex>
            <Flex as="span" gap={3}>
              {value && onClear ? (
                <IconBox
                  role="button"
                  onClick={handleClearClick}
                  aria-disabled={disabled}
                  aria-label={clearLabel}
                  title={clearLabel}
                >
                  <Cross />
                </IconBox>
              ) : null}
              <DownIcon>
                <CarretDown />
              </DownIcon>
            </Flex>
          </Trigger>
          <RadixSelect.Portal>
            <Content position="popper" sideOffset={4}>
              <RadixSelect.Viewport ref={viewportRef}>
                {children}
                <Box id={intersectionId} width="100%" height="1px" />
              </RadixSelect.Viewport>
            </Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

interface TriggerProps {
  $hasError: boolean;
  $size: Required<Pick<SingleSelectProps, 'size'>>['size'];
}

const Trigger = styled(RadixSelect.Trigger)<TriggerProps>`
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
  max-height: 15rem;
`;

const IconBox = styled(Box)`
  background: transparent;
  border: none;
  position: relative;
  z-index: 1;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
