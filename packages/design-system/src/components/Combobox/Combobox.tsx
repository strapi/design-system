import * as React from 'react';

import { CaretDown, Cross } from '@strapi/icons';
import { Combobox as ComboboxPrimitive } from '@strapi/ui-primitives';
import { css, styled } from 'styled-components';

import { stripReactIdOfColon } from '../../helpers/strings';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useControllableState } from '../../hooks/useControllableState';
import { useId } from '../../hooks/useId';
import { useIntersection } from '../../hooks/useIntersection';
import { Box } from '../../primitives/Box';
import { Flex } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { ANIMATIONS } from '../../styles/motion';
import { inputFocusStyle } from '../../themes';
import { ScrollArea } from '../../utilities/ScrollArea';
import { Field, useField } from '../Field';
import { IconButton } from '../IconButton';
import { Loader } from '../Loader';

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
  creatable?: boolean | 'visible';
  creatableDisabled?: boolean;
  createMessage?: (value: string) => string;
  creatableStartIcon?: React.ReactNode;
  hasMoreItems?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  noOptionsMessage?: (value: string) => string;
  onChange?: ComboboxPrimitive.RootProps['onValueChange'];
  onClear?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  onCreateOption?: (value?: string) => void;
  onLoadMore?: (entry: IntersectionObserverEntry) => void;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * @default "M"
   */
  size?: 'S' | 'M';
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
      clearLabel = 'Clear',
      creatable = false,
      creatableDisabled = false,
      creatableStartIcon,
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
      size = 'M',
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
      if (onCreateOption && internalTextValue && creatable !== 'visible') {
        onCreateOption(internalTextValue);
      } else if (onCreateOption && creatable === 'visible') {
        onCreateOption();
        setInternalIsOpen(false);
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
        autocomplete={autocomplete || (creatable === true ? 'list' : 'both')}
        onOpenChange={handleOpenChange}
        open={internalIsOpen}
        onTextValueChange={handleTextValueChange}
        textValue={internalTextValue}
        allowCustomValue={!!creatable || allowCustomValue}
        disabled={disabled}
        required={required}
        value={value}
        onValueChange={handleChange}
        filterValue={internalFilterValue}
        onFilterValueChange={handleFilterValueChange}
        isPrintableCharacter={isPrintableCharacter}
        visible={creatable === 'visible'}
      >
        <Trigger $hasError={hasError} $size={size} className={className}>
          <Flex flex="1" tag="span" gap={3}>
            {startIcon ? (
              <Flex flex="0 0 1.6rem" tag="span" aria-hidden>
                {startIcon}
              </Flex>
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
              <IconButton
                size="XS"
                variant="ghost"
                onClick={handleClearClick}
                aria-disabled={disabled}
                aria-label={clearLabel}
                label={clearLabel}
                ref={clearRef}
              >
                <Cross />
              </IconButton>
            ) : null}
            <DownIcon>
              <CaretDown fill="neutral500" />
            </DownIcon>
          </Flex>
        </Trigger>
        <ComboboxPrimitive.Portal>
          <Content sideOffset={4}>
            <ComboboxPrimitive.Viewport ref={viewportRef}>
              <ScrollAreaCombobox>
                {children}
                {creatable !== true && !loading ? (
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
              </ScrollAreaCombobox>
              {creatable ? (
                <ComboboxCreateItem
                  onPointerUp={handleCreateItemClick}
                  onClick={handleCreateItemClick}
                  disabled={creatableDisabled}
                  asChild
                >
                  <OptionBox>
                    <Flex gap={2}>
                      {creatableStartIcon && (
                        <Box tag="span" aria-hidden display={'inline-flex'}>
                          {creatableStartIcon}
                        </Box>
                      )}
                      <Typography>{createMessage(internalTextValue ?? '')}</Typography>
                    </Flex>
                  </OptionBox>
                </ComboboxCreateItem>
              ) : null}
            </ComboboxPrimitive.Viewport>
          </Content>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    );
  },
);

const Trigger = styled(ComboboxPrimitive.Trigger)<{
  $hasError?: boolean;
  $size: ComboboxProps['size'];
}>`
  position: relative;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[4]};

  ${(props) => {
    switch (props.$size) {
      case 'S':
        return css`
          padding-inline-start: ${({ theme }) => theme.spaces[4]};
          padding-inline-end: ${({ theme }) => theme.spaces[3]};
          padding-block: ${({ theme }) => theme.spaces[1]};
        `;
      default:
        return css`
          padding-inline-start: ${({ theme }) => theme.spaces[4]};
          padding-inline-end: ${({ theme }) => theme.spaces[3]};
          padding-block: ${({ theme }) => theme.spaces[2]};
        `;
    }
  }}

  &[data-disabled] {
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

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral600};
    opacity: 1;
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
  display: flex;

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
  z-index: ${({ theme }) => theme.zIndices.popover};

  &:focus-visible {
    outline: ${({ theme }) => `2px solid ${theme.colors.primary600}`};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: ${(props) => props.theme.motion.timings['200']};

    /* The select can't animate out yet, watch https://github.com/radix-ui/primitives/issues/1893, or take a look and solve it yourself. */
    &[data-state='open'] {
      animation-timing-function: ${(props) => props.theme.motion.easings.authenticMotion};

      &[data-side='top'] {
        animation-name: ${ANIMATIONS.slideUpIn};
      }

      &[data-side='bottom'] {
        animation-name: ${ANIMATIONS.slideDownIn};
      }
    }
  }
`;

const ComboboxCreateItem = styled(ComboboxPrimitive.CreateItem)`
  && {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: ${({ theme }) => theme.colors.neutral0};
    cursor: pointer;
    padding: ${({ theme }) => theme.spaces[1]};
    position: sticky;
    bottom: 0;
    left: 0;
  }
  &&:hover,
  &&[data-highlighted] {
    background: ${({ theme }) => theme.colors.neutral0};
  }
  &&[data-disabled] {
    color: ${({ theme }) => theme.colors.neutral600};
    cursor: not-allowed;
  }
  &&[data-disabled] svg {
    fill: ${({ theme }) => theme.colors.neutral300};
  }
  && > div {
    padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
  }
  && > div:hover,
  &&[data-highlighted] > div {
    background-color: ${({ theme }) => theme.colors.primary100};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  &&[data-disabled] > div {
    background-color: inherit;
  }
`;

const ScrollAreaCombobox = styled(ScrollArea)`
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
