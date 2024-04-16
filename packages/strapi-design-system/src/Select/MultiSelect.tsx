/* eslint-disable no-nested-ternary */
import * as React from 'react';

import { Cross } from '@strapi/icons';
import styled, { css } from 'styled-components';

import * as SelectParts from './SelectParts';
import checkmarkIcon from '../BaseCheckbox/assets/checkmark.svg';
import { Box } from '../Box';
import { FieldProps } from '../Field';
import { stripReactIdOfColon } from '../helpers/strings';
import { useId } from '../hooks/useId';
import { useIntersection } from '../hooks/useIntersection';
import { Tag } from '../Tag';
import { Typography } from '../Typography';

type MultiSelectPropsWithoutLabel = Omit<SelectParts.MultiSelectProps, 'value' | 'multi'> &
  Pick<SelectParts.ContentProps, 'onCloseAutoFocus'> &
  Pick<SelectParts.TriggerProps, 'clearLabel' | 'onClear' | 'size' | 'startIcon'> &
  Pick<SelectParts.ValueProps, 'placeholder'> &
  Pick<FieldProps, 'error'> & {
    /**
     * @default (value) => value.join(',')
     */
    customizeContent?(value?: string[]): string;
    onChange?: (value: string[]) => void;
    onReachEnd?: (entry: IntersectionObserverEntry) => void;
    /**
     * @preserve
     * @deprecated This prop is no longer required and will be removed in v2 of the DS.
     * It has no effect on the component.
     */
    selectButtonTitle?: string;
    value?: string[] | null;
    withTags?: boolean;
  };

export type MultiSelectProps = MultiSelectPropsWithoutLabel & { 'aria-label'?: string; 'aria-describedby'?: string };

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      children,
      clearLabel = 'Clear',
      customizeContent,
      disabled,
      error,
      onChange,
      onClear,
      onCloseAutoFocus,
      onReachEnd,
      placeholder,
      required,
      selectButtonTitle: _deprecatedSelectButtonTitle,
      startIcon,
      size = 'M',
      value: passedValue,
      withTags,
      ...restProps
    },
    forwardedRef,
  ) => {
    /**
     * Used for the intersection observer
     */
    const viewportRef = React.useRef<HTMLDivElement>(null);

    /**
     * These values are drawn out from the internals of the Radix component
     * We can then use them to react to visual changes for the component
     */
    const [internalValue, setInternalValue] = React.useState<string[]>();
    const [internalIsOpen, setInternalIsOpen] = React.useState(false);

    const id = useId();

    const handleValueChange = (value: string[]) => {
      /**
       * If it's being externally managed then we shouldn't
       * both setting our copy of the internal value.
       */
      if (onChange) {
        onChange(value);
      } else {
        setInternalValue(value);
      }
    };

    const handleTagClick = (value: string) => () => {
      const newValue = Array.isArray(passedValue)
        ? passedValue.filter((val) => val !== value)
        : (internalValue ?? []).filter((val) => val !== value);

      if (onChange) {
        onChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    };

    const handleOpenChange: SelectParts.SelectProps['onOpenChange'] = (open) => {
      setInternalIsOpen(open);
    };

    const generatedIntersectionId = useId();
    const intersectionId = `intersection-${stripReactIdOfColon(generatedIntersectionId)}`;

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

    const value = typeof passedValue !== 'undefined' && passedValue !== null ? passedValue : internalValue;

    const renderTags: SelectParts.ValueRenderFn = (arg?: { value?: string; textValue?: string } | string) => {
      if (arg && typeof arg === 'object' && arg.value) {
        return (
          <Tag tabIndex={-1} key={arg.value} disabled={disabled} icon={<Cross />} onClick={handleTagClick(arg.value)}>
            {arg.textValue}
          </Tag>
        );
      }

      return null;
    };

    return (
      <SelectParts.Root
        onOpenChange={handleOpenChange}
        disabled={disabled}
        required={required}
        onValueChange={handleValueChange}
        value={value}
        {...restProps}
        multi
      >
        <SelectParts.Trigger
          ref={forwardedRef}
          id={id}
          startIcon={startIcon}
          size={size}
          hasError={Boolean(error)}
          disabled={disabled}
          clearLabel={clearLabel}
          onClear={value?.length ? onClear : undefined}
          paddingLeft={withTags && value?.length ? 1 : 3}
        >
          <SelectParts.Value placeholder={placeholder} textColor={value?.length ? 'neutral800' : 'neutral600'}>
            {value?.length
              ? withTags
                ? renderTags
                : customizeContent
                  ? customizeContent(value)
                  : undefined
              : undefined}
          </SelectParts.Value>
        </SelectParts.Trigger>
        <SelectParts.Portal>
          <SelectParts.Content position="popper" sideOffset={4} onCloseAutoFocus={onCloseAutoFocus}>
            <SelectParts.Viewport ref={viewportRef}>
              {children}
              <Box id={intersectionId} width="100%" height="1px" />
            </SelectParts.Viewport>
          </SelectParts.Content>
        </SelectParts.Portal>
      </SelectParts.Root>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * MultiSelectOption
 * -----------------------------------------------------------------------------------------------*/

export interface MultiSelectOptionProps extends Omit<SelectParts.ItemProps, 'value'> {
  startIcon?: React.ReactNode;
  value: string | number;
}

export const MultiSelectOption = React.forwardRef<HTMLDivElement, MultiSelectOptionProps>(
  ({ value, children, startIcon, ...restProps }, ref) => {
    return (
      <SelectParts.Item ref={ref} value={value.toString()} {...restProps}>
        {startIcon && (
          <Box as="span" aria-hidden>
            {startIcon}
          </Box>
        )}
        <SelectParts.ItemIndicator>
          {({ isSelected, isIntermediate }) => (
            <CheckMark
              hasRadius
              overflow="hidden"
              position="relative"
              $indeterminate={isIntermediate}
              $selected={isSelected}
              zIndex={1}
              height="18px"
              width="18px"
            />
          )}
        </SelectParts.ItemIndicator>
        <Typography textColor="neutral800">
          <SelectParts.ItemText>{children}</SelectParts.ItemText>
        </Typography>
      </SelectParts.Item>
    );
  },
);

interface CheckMarkProps {
  $selected?: boolean;
  $indeterminate?: boolean;
}

const CheckMark = styled(Box)<CheckMarkProps>`
  border: 1px solid
    ${({ theme, $selected, $indeterminate }) =>
      $selected || $indeterminate ? theme.colors.primary600 : theme.colors.neutral300};
  background-color: ${({ theme, $selected, $indeterminate }) =>
    $selected || $indeterminate ? theme.colors.primary600 : theme.colors.neutral0};

  ${({ theme, $indeterminate }) =>
    $indeterminate &&
    css`
      &::after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: ${theme.colors.neutral0};
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    `}

  ${({ $selected }) =>
    $selected &&
    css`
      &::after {
        content: '';
        background: ${() => `url("${checkmarkIcon}") no-repeat no-repeat center center`};
        width: 100%;
        height: 100%;
        position: absolute;
      }
    `}
`;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectGroup
 * -----------------------------------------------------------------------------------------------*/

export interface MultiSelectGroupProps extends Pick<MultiSelectOptionProps, 'startIcon'> {
  children: React.ReactNode;
  label: string;
  values?: string[];
}

export const MultiSelectGroup = React.forwardRef<HTMLDivElement, MultiSelectGroupProps>(
  ({ children, label, startIcon, values = [], ...restProps }, ref) => {
    return (
      <SelectParts.Group ref={ref}>
        <SelectParts.Item value={values} {...restProps}>
          {startIcon && (
            <Box as="span" aria-hidden>
              {startIcon}
            </Box>
          )}
          <SelectParts.ItemIndicator>
            {({ isSelected, isIntermediate }) => (
              <CheckMark
                hasRadius
                overflow="hidden"
                position="relative"
                $indeterminate={isIntermediate}
                $selected={isSelected}
                zIndex={1}
                height="18px"
                width="18px"
              />
            )}
          </SelectParts.ItemIndicator>
          <Typography textColor="neutral800">{label}</Typography>
        </SelectParts.Item>
        {children}
      </SelectParts.Group>
    );
  },
);
