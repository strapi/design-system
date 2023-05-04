import * as React from 'react';

import { CarretDown, Cross } from '@strapi/icons';
import { Combobox as ComboboxPrimitive } from '@strapi/ui-primitives';
import styled from 'styled-components';

import { Box } from '../Box';
import { Field, FieldError, FieldHint, FieldLabel } from '../Field';
import { Flex } from '../Flex';
import { useControllableState } from '../hooks/useControllableState';
import { useId } from '../hooks/useId';
import { useIntersection } from '../hooks/useIntersection';
import { Loader } from '../Loader';
import { inputFocusStyle } from '../themes';
import { Typography } from '../Typography';

export interface ComboboxProps {
  children: React.ReactNode;
  clearLabel?: string;
  creatable?: boolean;
  createMessage?: (inputValue: string) => string;
  defaultTextValue?: string;
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  error?: string;
  hasMoreItems?: boolean;
  hint?: string;
  id?: string;
  label?: string;
  labelAction?: React.ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  noOptionsMessage?: (inputValue: string) => string;
  onChange?: (value: string) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void;
  onCreateOption?: (inputValue: string) => void;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onLoadMore?: (entry: IntersectionObserverEntry) => void;
  onOpenChange?: (open?: boolean) => void;
  placeholder?: string;
  required?: boolean;
  startIcon?: React.ReactNode;
  textValue?: string;
  value?: string;
}

export const Combobox = ({
  children,
  clearLabel = 'clear',
  creatable = false,
  createMessage = (value) => `Create "${value}"`,
  defaultTextValue,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled = false,
  error,
  hasMoreItems = false,
  hint,
  id,
  label,
  labelAction,
  loading = false,
  loadingMessage = 'Loading content...',
  noOptionsMessage = () => 'No results found',
  onChange,
  onClear,
  onCreateOption,
  onInputChange,
  onLoadMore,
  placeholder = 'Select or enter a value',
  required = false,
  startIcon,
  textValue,
  value,
}: ComboboxProps) => {
  const [internalIsOpen, setInternalIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [internalTextValue, setInternalTextValue] = useControllableState({
    prop: textValue,
    defaultProp: defaultTextValue,
  });
  const [internalFilterValue, setInternalFilterValue] = React.useState<string | undefined>('');

  /**
   * Used for the intersection observer
   */
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLInputElement>(null!);

  const clearRef = React.useRef(null);

  const generatedId = useId(id);

  const handleClearClick: React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    if (onClear && !disabled) {
      setInternalTextValue('');
      setInternalFilterValue('');
      onClear(e);
      triggerRef.current.focus();
    }
  };

  const handleOpenChange: ComboboxPrimitive.RootProps['onOpenChange'] = (open) => {
    setInternalIsOpen(open);
  };

  const handleTextValueChange: ComboboxPrimitive.RootProps['onTextValueChange'] = (textValue) => {
    setInternalTextValue(textValue);
  };

  const handleFilterValueChange: ComboboxPrimitive.RootProps['onFilterValueChange'] = (filterValue) => {
    setInternalFilterValue(filterValue);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onInputChange) {
      onInputChange(e);
    }
  };

  const handleChange: ComboboxPrimitive.RootProps['onValueChange'] = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const intersectionId = `intersection-${CSS.escape(generatedId)}`;

  const handleReachEnd = (entry: IntersectionObserverEntry) => {
    if (onLoadMore && hasMoreItems && !loading) {
      onLoadMore(entry);
    }
  };

  const handleCreateItemClick = () => {
    if (onCreateOption && internalTextValue) {
      onCreateOption(internalTextValue);
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

  const hintId = `${generatedId}-hint`;
  const errorId = `${generatedId}-error`;

  return (
    <Field hint={hint} error={error} id={generatedId} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel action={labelAction}>{label}</FieldLabel>
        <ComboboxPrimitive.Root
          autocomplete={creatable ? 'list' : 'both'}
          onOpenChange={handleOpenChange}
          onTextValueChange={handleTextValueChange}
          textValue={internalTextValue}
          allowCustomValue
          disabled={disabled}
          required={required}
          value={value}
          onValueChange={handleChange}
          filterValue={internalFilterValue}
          onFilterValueChange={handleFilterValueChange}
        >
          <Trigger $hasError={Boolean(error)}>
            <Flex flex="1" as="span" gap={3}>
              {startIcon ? (
                <Box as="span" aria-hidden>
                  {startIcon}
                </Box>
              ) : null}
              <TextInput
                placeholder={placeholder}
                id={generatedId}
                aria-invalid={Boolean(error)}
                aria-labelledby={`${hintId} ${errorId}`}
                onChange={handleInputChange}
                ref={triggerRef}
              />
            </Flex>
            <Flex as="span" gap={3}>
              {internalTextValue && onClear ? (
                <IconBox
                  as="button"
                  hasRadius
                  background="transparent"
                  type="button"
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
          <ComboboxPrimitive.Portal>
            <Content sideOffset={4}>
              <Viewport ref={viewportRef}>
                {children}
                {creatable ? (
                  <ComboboxPrimitive.CreateItem
                    onPointerUp={handleCreateItemClick}
                    onClick={handleCreateItemClick}
                    asChild
                  >
                    <OptionBox>
                      <Typography>{createMessage(internalTextValue ?? '')}</Typography>
                    </OptionBox>
                  </ComboboxPrimitive.CreateItem>
                ) : null}
                {!creatable && !loading ? (
                  <ComboboxPrimitive.NoValueFound asChild>
                    <OptionBox $hasHover={false}>
                      <Typography>{noOptionsMessage(internalTextValue ?? '')}</Typography>
                    </OptionBox>
                  </ComboboxPrimitive.NoValueFound>
                ) : null}
                {loading ? (
                  <Flex justifyContent="center" alignItems="center" paddingTop={2} paddingBottom={2}>
                    <Loader small>{loadingMessage}</Loader>
                  </Flex>
                ) : null}
                <Box id={intersectionId} width="100%" height="1px" />
              </Viewport>
            </Content>
          </ComboboxPrimitive.Portal>
        </ComboboxPrimitive.Root>
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};

export type CreatableComboboxProps = Omit<ComboboxProps, 'onCreateOption'> &
  Required<Pick<ComboboxProps, 'onCreateOption'>>;

export const CreatableCombobox = (props: CreatableComboboxProps) => <Combobox {...props} creatable />;

const IconBox = styled(Box)`
  border: none;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

interface TriggerProps {
  $hasError: boolean;
}

const Trigger = styled(ComboboxPrimitive.Trigger)<TriggerProps>`
  position: relative;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  padding-left: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[4]};

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.neutral600};
    background: ${({ theme }) => theme.colors.neutral150};
    cursor: not-allowed;
  }

  /* Required to ensure the below inputFocusStyles are adhered too */
  &:focus-visible {
    outline: none;
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, hasError: $hasError })};
`;

const TextInput = styled(ComboboxPrimitive.TextInput)`
  width: 100%;
  font-size: ${14 / 16}rem;
  color: ${({ theme }) => theme.colors.neutral800};
  min-height: ${40 / 16}rem;
  border: none;
  background-color: transparent;

  &:focus-visible {
    outline: none;
  }

  &[aria-disabled='true'] {
    cursor: inherit;
  }
`;

const DownIcon = styled(ComboboxPrimitive.Icon)`
  & > svg {
    width: ${6 / 16}rem;

    & > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &[aria-disabled='true'] {
    cursor: inherit;
  }
`;

const Content = styled(ComboboxPrimitive.Content)`
  background: ${({ theme }) => theme.colors.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: var(--radix-combobox-trigger-width);
  /* This is from the design-system figma file. */
  max-height: 15rem;
  z-index: ${({ theme }) => theme.zIndices[1]};
`;

const Viewport = styled(ComboboxPrimitive.Viewport)`
  padding: ${({ theme }) => theme.spaces[1]};
`;

export interface ComboboxOptionProps extends ComboboxPrimitive.ItemProps {
  children: React.ReactNode;
}

export const Option = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(
  ({ children, value, disabled, textValue, ...props }, ref) => {
    return (
      <ComboboxPrimitive.ComboboxItem asChild value={value} disabled={disabled} textValue={textValue}>
        <OptionBox ref={ref} {...props}>
          <ComboboxPrimitive.ItemText asChild>
            <Typography>{children}</Typography>
          </ComboboxPrimitive.ItemText>
        </OptionBox>
      </ComboboxPrimitive.ComboboxItem>
    );
  },
);

export const OptionBox = styled.div<{ $hasHover?: boolean }>`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.borderRadius};
  user-select: none;

  &[data-selected] {
    background-color: ${({ theme }) => theme.colors.primary100};

    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: bold;
    }
  }

  &:hover,
  &[data-highlighted] {
    outline: none;
    background-color: ${({ theme, $hasHover = true }) => ($hasHover ? theme.colors.primary100 : theme.colors.neutral0)};
  }

  &[data-highlighted] {
    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: bold;
    }
  }
`;
