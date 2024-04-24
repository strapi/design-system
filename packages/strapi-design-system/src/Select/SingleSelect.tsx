import * as React from 'react';

import * as SelectParts from './SelectParts';
import { Box } from '../Box';
import { FieldProps } from '../Field';
import { stripReactIdOfColon } from '../helpers/strings';
import { useId } from '../hooks/useId';
import { useIntersection } from '../hooks/useIntersection';
import { Typography } from '../Typography';

type SingleSelectPropsWithoutLabel = Omit<SelectParts.SingleSelectProps, 'value'> &
  Pick<SelectParts.ContentProps, 'onCloseAutoFocus'> &
  Pick<SelectParts.TriggerProps, 'clearLabel' | 'onClear' | 'size' | 'startIcon'> &
  Pick<SelectParts.ValueProps, 'placeholder'> &
  Pick<FieldProps, 'error' | 'id'> & {
    /**
     * @default (value) => value.toString()
     */
    customizeContent?(value?: string | number): string;
    onChange?: (value: string | number) => void;
    onReachEnd?: (entry: IntersectionObserverEntry) => void;
    value?: string | number | null;
  };

export type SingleSelectProps = SingleSelectPropsWithoutLabel & { 'aria-label'?: string; 'aria-describedby'?: string };

export type SingleSelectElement = HTMLDivElement;

export const SingleSelect = React.forwardRef<SingleSelectElement, SingleSelectProps>(
  (
    {
      children,
      clearLabel = 'Clear',
      customizeContent,
      disabled,
      error,
      id,
      onChange,
      onClear,
      onCloseAutoFocus,
      onReachEnd,
      placeholder,
      required,
      startIcon,
      size = 'M',
      value: passedValue,
      ...restProps
    },
    forwardedRef,
  ) => {
    /**
     * These values are drawn out from the internals of the Radix component
     * We can then use them to react to visual changes for the component
     */
    const [internalValue, setInternalValue] = React.useState<string>();
    const [internalIsOpen, setInternalIsOpen] = React.useState(false);

    const handleOpenChange: SelectParts.SelectProps['onOpenChange'] = (open) => {
      setInternalIsOpen(open);
    };

    const handleOnClear = (e) => {
      if (onClear) {
        onClear(e);
      }

      if (!onChange) {
        setInternalValue('');
      }
    };

    const handleValueChange = (value: string) => {
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

    const viewportRef = React.useRef<HTMLDivElement>(null);
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

    const value =
      (typeof passedValue !== 'undefined' && passedValue !== null ? passedValue.toString() : internalValue) ?? '';

    return (
      <SelectParts.Root
        onOpenChange={handleOpenChange}
        disabled={disabled}
        required={required}
        onValueChange={handleValueChange}
        value={value}
        {...restProps}
      >
        <SelectParts.Trigger
          ref={forwardedRef}
          id={id}
          startIcon={startIcon}
          size={size}
          hasError={Boolean(error)}
          disabled={disabled}
          clearLabel={clearLabel}
          onClear={value && onClear ? handleOnClear : undefined}
          aria-label={restProps['aria-label']}
          aria-describedby={restProps['aria-describedby']}
        >
          <SelectParts.Value placeholder={placeholder} textColor={value ? 'neutral800' : 'neutral600'}>
            {value && customizeContent ? customizeContent(value) : undefined}
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
 * SingleSelectOption
 * -----------------------------------------------------------------------------------------------*/

export interface SingleSelectOptionProps extends Omit<SelectParts.ItemProps, 'value'> {
  startIcon?: React.ReactNode;
  value: string | number;
}

export const SingleSelectOption = React.forwardRef<HTMLDivElement, SingleSelectOptionProps>(
  ({ value, startIcon, children, ...restProps }, ref) => {
    return (
      <SelectParts.Item ref={ref} value={value.toString()} {...restProps}>
        {startIcon && (
          <Box as="span" aria-hidden>
            {startIcon}
          </Box>
        )}
        <Typography textColor="neutral800">
          <SelectParts.ItemText>{children}</SelectParts.ItemText>
        </Typography>
      </SelectParts.Item>
    );
  },
);
