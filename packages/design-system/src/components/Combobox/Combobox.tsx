import * as React from 'react';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { CaretDown, Cross } from '@strapi/icons';
import { Combobox as ComboboxPrimitive } from '@strapi/ui-primitives';
import { styled } from 'styled-components';

import { stripReactIdOfColon } from '../../helpers/strings';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useId } from '../../hooks/useId';
import { useIntersection } from '../../hooks/useIntersection';
import { inputFocusStyle } from '../../themes';
import { Box, BoxComponent } from '../Box';
import { Field, useField } from '../Field';
import { Flex } from '../Flex';
import { Loader } from '../Loader';
import { Typography } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * ComboboxInput
 * -----------------------------------------------------------------------------------------------*/

interface ComboboxProps
  extends Pick<
      ComboboxPrimitive.RootProps,
      | 'allowCustomValue'
      | 'autocomplete'
      | 'children'
      | 'disabled'
      | 'defaultTextValue'
      | 'defaultOpen'
      | 'defaultFilterValue'
      | 'filterValue'
      | 'isPrintableCharacter'
      | 'open'
      | 'onOpenChange'
      | 'onFilterValueChange'
      | 'onTextValueChange'
      | 'required'
      | 'textValue'
      | 'value'
    >,
    Pick<Field.InputProps, 'hasError' | 'name' | 'id'>,
    Omit<ComboboxPrimitive.TextInputProps, 'required' | 'disabled' | 'value' | 'onChange' | 'size'> {
  clearLabel?: string;
  creatable?: boolean;
  createMessage?: (value: string) => string;
  hasMoreItems?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  noOptionsMessage?: (value: string) => string;
  onChange?: ComboboxPrimitive.RootProps['onValueChange'];
  onClear?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  onCreateOption?: (value: string) => void;
  onLoadMore?: (entry: IntersectionObserverEntry) => void;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  startIcon?: React.ReactNode;
}

type ComboboxInputElement = HTMLInputElement;

const Combobox = React.forwardRef<ComboboxInputElement, ComboboxProps>(
  (
    {
      allowCustomValue,
      autocomplete,
      children,
      className,
      clearLabel = 'clear',
      creatable = false,
      createMessage = (value) => `Create "${value}"`,
      defaultFilterValue,
      defaultTextValue,
      defaultOpen = false,
      open,
      onOpenChange,
      disabled = false,
      hasError: hasErrorProp,
      id: idProp,
      filterValue,
      hasMoreItems = false,
      isPrintableCharacter,
      loading = false,
      loadingMessage = 'Loading content...',
      name: nameProp,
      noOptionsMessage = () => 'No results found',
      onChange,
      onClear,
      onCreateOption,
      onFilterValueChange,
      onInputChange,
      onTextValueChange,
      onLoadMore,
      placeholder = 'Select or enter a value',
      required: requiredProp = false,
      startIcon,
      textValue,
      value,
      ...restProps
    },
    forwardedRef,
  ) => {
    const [internalIsOpen, setInternalIsOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    const [internalTextValue, setInternalTextValue] = useControllableState({
      prop: textValue,
      defaultProp: allowCustomValue && !defaultTextValue ? value : defaultTextValue,
      onChange: onTextValueChange,
    });
    const [internalFilterValue, setInternalFilterValue] = useControllableState({
      prop: filterValue,
      defaultProp: defaultFilterValue,
      onChange: onFilterValueChange,
    });

    /**
     * Used for the intersection observer
     */
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLInputElement>(null!);

    const composedTriggerRefs = useComposedRefs(triggerRef, forwardedRef);

    const clearRef = React.useRef(null);

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

    const generatedIntersectionId = useId();
    const intersectionId = `intersection-${stripReactIdOfColon(generatedIntersectionId)}`;

    useIntersection(viewportRef, handleReachEnd, {
      selectorToWatch: `#${intersectionId}`,
      /**
       * We need to know when the select is open because only then will viewportRef
       * not be null. Because it uses a portal that (sensibly) is not mounted 24/7.
       */
      skipWhen: !internalIsOpen,
    });

    const { error, ...field } = useField('Combobox');
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
      <ComboboxPrimitive.Root
        autocomplete={autocomplete || (creatable ? 'list' : 'both')}
        onOpenChange={handleOpenChange}
        open={internalIsOpen}
        onTextValueChange={handleTextValueChange}
        textValue={internalTextValue}
        allowCustomValue={creatable || allowCustomValue}
        disabled={disabled}
        required={required}
        value={value}
        onValueChange={handleChange}
        filterValue={internalFilterValue}
        onFilterValueChange={handleFilterValueChange}
        isPrintableCharacter={isPrintableCharacter}
      >
        <Trigger $hasError={hasError} className={className}>
          <Flex flex="1" tag="span" gap={3}>
            {startIcon ? (
              <Box tag="span" aria-hidden>
                {startIcon}
              </Box>
            ) : null}
            <TextInput
              placeholder={placeholder}
              id={id}
              aria-invalid={Boolean(error)}
              onChange={handleInputChange}
              ref={composedTriggerRefs}
              name={name}
              aria-describedby={ariaDescription}
              {...restProps}
            />
          </Flex>
          <Flex tag="span" gap={3}>
            {internalTextValue && onClear ? (
              <IconBox
                tag="button"
                hasRadius
                background="transparent"
                type="button"
                padding={0}
                color="neutral600"
                borderStyle="none"
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
              <CaretDown />
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
    );
  },
);

const IconBox = styled<BoxComponent<'button'>>(Box)`
  padding: 0;
`;

interface TriggerProps {
  $hasError?: boolean;
}

const Trigger = styled(ComboboxPrimitive.Trigger)<TriggerProps>`
  position: relative;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  padding-left: ${({ theme }) => theme.spaces[3]};
  padding-top: ${({ theme }) => theme.spaces[2]};
  padding-bottom: ${({ theme }) => theme.spaces[2]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[4]};

  s &[data-disabled] {
    color: ${({ theme }) => theme.colors.neutral600};
    background: ${({ theme }) => theme.colors.neutral150};
    cursor: not-allowed;
  }

  /* Required to ensure the below inputFocusStyles are adhered too */
  &:focus-visible {
    outline: none;
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, $hasError })};
`;

const TextInput = styled(ComboboxPrimitive.TextInput)`
  width: 100%;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: ${({ theme }) => theme.colors.neutral800};
  padding: 0;
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
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.colors.neutral600};

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

/* -------------------------------------------------------------------------------------------------
 * ComboboxOption
 * -----------------------------------------------------------------------------------------------*/

interface ComboboxOptionProps extends ComboboxPrimitive.ItemProps {
  children: React.ReactNode;
}

const Option = React.forwardRef<HTMLDivElement, ComboboxOptionProps>(
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

const OptionBox = styled.div<{ $hasHover?: boolean }>`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.borderRadius};
  user-select: none;

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: bold;
  }

  &:hover,
  &[data-highlighted] {
    outline: none;
    background-color: ${({ theme, $hasHover = true }) => ($hasHover ? theme.colors.primary100 : theme.colors.neutral0)};
  }

  &[data-highlighted] {
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: bold;
  }
`;

export { Combobox, Option as ComboboxOption };
export type { ComboboxInputElement, ComboboxOptionProps, ComboboxProps };
