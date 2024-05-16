/* eslint-disable no-nested-ternary */
import * as React from 'react';

import { Cross } from '@strapi/icons';

import { stripReactIdOfColon } from '../../helpers/strings';
import { useId } from '../../hooks/useId';
import { useIntersection } from '../../hooks/useIntersection';
import { Box } from '../Box';
import { Checkbox } from '../Checkbox';
import { useField } from '../Field';
import { Tag } from '../Tag';
import { Typography } from '../Typography';

import * as SelectParts from './SelectParts';

type MultiSelectPropsWithoutLabel = Omit<SelectParts.MultiSelectProps, 'value' | 'multi'> &
  Pick<SelectParts.ContentProps, 'onCloseAutoFocus'> &
  Pick<SelectParts.TriggerProps, 'clearLabel' | 'onClear' | 'startIcon' | 'hasError' | 'id' | 'name'> &
  Pick<SelectParts.ValueProps, 'placeholder'> & {
    /**
     * @default (value) => value.join(',')
     */
    customizeContent?(value?: string[]): string;
    onChange?: (value: string[]) => void;
    onReachEnd?: (entry: IntersectionObserverEntry) => void;
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
      hasError: hasErrorProp,
      id: idProp,
      name: nameProp,
      onChange,
      onClear,
      onCloseAutoFocus,
      onReachEnd,
      placeholder,
      required: requiredProp,
      startIcon,
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

    const { error, ...field } = useField('MultiSelect');
    const hasError = Boolean(error) || hasErrorProp;
    const id = field.id ?? idProp;
    const name = field.name ?? nameProp;
    const required = field.required ?? requiredProp;
    let ariaDescription: string | undefined;
    if (error) {
      ariaDescription = `${id}-error`;
    } else if (field.hint) {
      ariaDescription = `${id}-hint`;
    }

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
          name={name}
          aria-label={restProps['aria-label']}
          aria-describedby={ariaDescription ?? restProps['aria-describedby']}
          startIcon={startIcon}
          hasError={hasError}
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
          <Box tag="span" aria-hidden>
            {startIcon}
          </Box>
        )}
        <SelectParts.ItemIndicator>
          {({ isSelected, isIntermediate }) => <Checkbox checked={isIntermediate ? 'indeterminate' : isSelected} />}
        </SelectParts.ItemIndicator>
        <Typography>
          <SelectParts.ItemText>{children}</SelectParts.ItemText>
        </Typography>
      </SelectParts.Item>
    );
  },
);

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
            <Box tag="span" aria-hidden>
              {startIcon}
            </Box>
          )}
          <SelectParts.ItemIndicator>
            {({ isSelected, isIntermediate }) => <Checkbox checked={isIntermediate ? 'indeterminate' : isSelected} />}
          </SelectParts.ItemIndicator>
          <Typography>{label}</Typography>
        </SelectParts.Item>
        {children}
      </SelectParts.Group>
    );
  },
);
