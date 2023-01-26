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

import { useIntersection } from '../hooks/useIntersection';

import { getThemeSize, inputFocusStyle } from '../themes/utils';

export interface SingleSelectProps {
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
  onClear?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
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

/**
 * INTERNAL FOR RADIX – required to override the default behaviour of the component
 * to allow clearing.
 */
const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];

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
  /**
   * Used for the intersection observer
   */
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const clearRef = React.useRef(null);

  /**
   * These values are drawn out from the internals of the Radix component
   * We can then use them to react to visual changes for the component
   */
  const [internalValue, setInternalValue] = React.useState('');
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);

  const generatedId = useId(id);

  const hintId = `${generatedId}-hint`;
  const errorId = `${generatedId}-error`;

  const handleValueChange: Pick<RadixSelect.SelectProps, 'onValueChange'>['onValueChange'] = (value) => {
    /**
     * If it's being externally managed then we shouldn't
     * both setting our copy of the internal value.
     */
    if (onChange) {
      const shouldBeNumber = typeof passedValue === 'number';
      onChange(shouldBeNumber ? Number(value) : value);
    } else {
      setInternalValue(value);
    }
  };

  const handleClearClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClear && !disabled) {
      onClear(e);
    }
  };

  const handleOpenChange: Pick<RadixSelect.SelectProps, 'onOpenChange'>['onOpenChange'] = (open) => {
    setInternalIsOpen(open);
  };

  /**
   * We need to do this so the clear button can actually be
   * used as opposed to the trigger swallowing the event.
   *
   * I'm not proud of it, but people are asking for it so maybe
   * we can remove this in the future – https://github.com/radix-ui/primitives/issues/1569
   */
  const handleTriggerPointerDown: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    // @ts-ignore
    if (clearRef.current && clearRef.current === e.target.closest('div')) {
      e.preventDefault();
    }
  };

  const handleTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    /**
     * If the key pressed is one of the OPEN_KEYS and the clear button is the button we've tried to hit
     * and the trigger is not disabled and there is an onClear handler then we should prevent the default
     * and fire our onClear handler.
     */
    if (
      OPEN_KEYS.includes(e.key) &&
      clearRef.current &&
      // @ts-ignore
      clearRef.current === e.target.closest('div') &&
      !disabled &&
      onClear
    ) {
      e.preventDefault();
      onClear(e);
    }
  };

  const intersectionId = `intersection-${generatedId}`;

  const handleReachEnd = (entry: IntersectionObserverEntry) => {
    if (onReachEnd) {
      onReachEnd(entry);
    }
  };

  useIntersection(viewportRef, handleReachEnd, {
    selectorToWatch: `#${intersectionId}`,
    /**
     * We need to know when the select is open because only then will viewportRef
     * not be null. Because it uses a portal that (sensibly) is not mounted 24/7.
     */
    skipWhen: !internalIsOpen,
  });

  const value = typeof passedValue !== 'undefined' ? passedValue.toString() : internalValue;

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <Stack spacing={1}>
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <RadixSelect.Root
          onOpenChange={handleOpenChange}
          disabled={disabled}
          required={required}
          onValueChange={handleValueChange}
          value={value}
        >
          <Trigger
            id={generatedId}
            aria-labelledby={`${hintId} ${errorId}`}
            aria-disabled={disabled}
            $hasError={Boolean(error)}
            $size={size}
            onPointerDown={handleTriggerPointerDown}
            onKeyDown={handleTriggerKeyDown}
          >
            <Flex as="span" gap={4}>
              {/* TODO: make this composable in v2 – <Select.Icon /> */}
              {startIcon && (
                <Box as="span" aria-hidden>
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
                  tabIndex={0}
                  onClick={handleClearClick}
                  aria-disabled={disabled}
                  aria-label={clearLabel}
                  title={clearLabel}
                  ref={clearRef}
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
              <Viewport ref={viewportRef}>
                {children}
                <Box id={intersectionId} width="100%" height="1px" />
              </Viewport>
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
  padding-left: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  min-height: ${({ theme, $size }) => getThemeSize('input')({ theme, size: $size })};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[4]};

  &[aria-disabled='true'] {
    color: ${(props) => props.theme.colors.neutral600};
    background: ${(props) => props.theme.colors.neutral150};
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, hasError: $hasError })};
`;

const DownIcon = styled(RadixSelect.Icon)`
  & > svg {
    width: ${6 / 16}rem;

    & > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;

const Content = styled(RadixSelect.Content)`
  background: ${({ theme }) => theme.colors.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: var(--radix-select-trigger-width);
  /* This is from the design-system figma file. */
  max-height: 15rem;
`;

const Viewport = styled(RadixSelect.Viewport)`
  padding: ${({ theme }) => theme.spaces[1]};
`;

const IconBox = styled(Box)`
  background: transparent;
  border: none;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

/***
 *
 * Option
 *
 */

export interface SingleSelectOptionProps {
  children: string | number;
  startIcon?: React.ReactNode;
  value: string | number;
}

export const SingleSelectOption = ({ children, startIcon, value }: SingleSelectOptionProps) => (
  <SelectItem textValue={children.toString()} value={value.toString()}>
    {startIcon && (
      <Box as="span" paddingRight={2} aria-hidden>
        {startIcon}
      </Box>
    )}
    <Typography textColor={'neutral800'}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </Typography>
  </SelectItem>
);

const SelectItem = styled(RadixSelect.Item)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => `${props.theme.spaces[2]} ${props.theme.spaces[4]}`};
  padding-left: ${({ theme }) => theme.spaces[4]};
  background-color: ${({ theme }) => theme.colors.neutral0};
  display: flex;
  align-items: center;

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.primary100};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
  }

  &[data-state='checked'] {
    ${Typography} {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
