import * as React from 'react';

import { CaretDown, Cross } from '@strapi/icons';
import { Select } from '@strapi/ui-primitives';
import { styled, css } from 'styled-components';

import { useComposedRefs } from '../../hooks/useComposeRefs';
import { inputFocusStyle } from '../../themes';
import { Box, BoxComponent, BoxProps } from '../Box';
import { Field, useField } from '../Field';
import { Flex, FlexComponent } from '../Flex';
import { Typography, TypographyComponent, TypographyProps } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * -----------------------------------------------------------------------------------------------*/

interface TriggerProps extends BoxProps<'div'>, Pick<Field.InputProps, 'name' | 'id'> {
  /**
   * @default "Clear"
   */
  clearLabel?: string;
  disabled?: boolean;
  hasError?: boolean;
  onClear?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  startIcon?: React.ReactElement;
}

const SelectTrigger = React.forwardRef<HTMLDivElement, TriggerProps>(
  ({ onClear, clearLabel = 'Clear', startIcon, disabled, hasError, children, id, ...restProps }, ref) => {
    const triggerRef = React.useRef<HTMLSpanElement>(null!);

    const handleClearClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (onClear && !disabled) {
        onClear(e);
        triggerRef.current.focus();
      }
    };

    const { labelNode } = useField('SelectTrigger');

    const composedRefs = useComposedRefs(triggerRef, ref);

    return (
      <Select.Trigger asChild>
        <StyledTrigger
          aria-disabled={disabled}
          $hasError={hasError}
          ref={composedRefs}
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          overflow="hidden"
          hasRadius
          background={disabled ? 'neutral150' : 'neutral0'}
          paddingLeft={3}
          paddingRight={3}
          paddingTop={2}
          paddingBottom={2}
          gap={4}
          cursor="default"
          aria-labelledby={labelNode ? `${id}-label` : undefined}
          {...restProps}
        >
          <Flex flex="1" tag="span" gap={3}>
            {/* TODO: make this composable in v2 – <Select.Icon /> */}
            {startIcon && (
              <Box tag="span" aria-hidden>
                {startIcon}
              </Box>
            )}
            {children}
          </Flex>
          <Flex tag="span" gap={3}>
            {onClear ? (
              <IconBox
                tag="button"
                hasRadius
                background="transparent"
                role="button"
                tabIndex={0}
                onClick={handleClearClick}
                aria-disabled={disabled}
                aria-label={clearLabel}
                title={clearLabel}
                cursor="pointer"
              >
                <Cross />
              </IconBox>
            ) : null}
            <DownIcon>
              <CaretDown />
            </DownIcon>
          </Flex>
        </StyledTrigger>
      </Select.Trigger>
    );
  },
);

const IconBox = styled<BoxComponent<'button'>>(Box)`
  border: none;

  svg {
    height: 1.1rem;
    width: 1.1rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

const StyledTrigger = styled<FlexComponent>(Flex)<{
  $hasError?: boolean;
}>`
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};

  &[aria-disabled='true'] {
    color: ${(props) => props.theme.colors.neutral600};
  }

  /* Required to ensure the below inputFocusStyles are adhered too */
  &:focus-visible {
    outline: none;
  }

  ${({ theme, $hasError }) => inputFocusStyle()({ theme, $hasError })};
`;

const DownIcon = styled(Select.Icon)`
  & > svg {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * -----------------------------------------------------------------------------------------------*/

interface ValueProps
  extends Omit<TypographyProps, 'children' | 'placeholder'>,
    Pick<Select.SelectValueProps, 'placeholder' | 'children'> {
  asChild?: boolean;
}

const SelectValue = React.forwardRef<HTMLSpanElement, ValueProps>(({ children, placeholder, ...restProps }, ref) => (
  <ValueType ref={ref} ellipsis {...restProps}>
    <StyledValue placeholder={placeholder}>{children}</StyledValue>
  </ValueType>
));

const ValueType = styled<TypographyComponent>(Typography)`
  flex: 1;
  font-size: 1.4rem;
  line-height: 2.2rem;
`;

const StyledValue = styled(Select.Value)`
  display: flex;
  gap: ${({ theme }) => theme.spaces[1]};
  flex-wrap: wrap;
`;

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * -----------------------------------------------------------------------------------------------*/

const SelectContent = styled(Select.Content)`
  background: ${({ theme }) => theme.colors.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  min-width: var(--radix-select-trigger-width);
  /* This is from the design-system figma file. */
  max-height: 15rem;
  z-index: ${({ theme }) => theme.zIndices.popover};
`;

/* -------------------------------------------------------------------------------------------------
 * SelectViewport
 * -----------------------------------------------------------------------------------------------*/

const SelectViewport = styled(Select.Viewport)`
  padding: ${({ theme }) => theme.spaces[1]};
`;

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * -----------------------------------------------------------------------------------------------*/

interface ItemProps extends Select.SelectItemProps {}

const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => (
  <StyledSelectItem ref={ref} {...props} />
));

const itemStyles = css`
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
  gap: ${({ theme }) => theme.spaces[2]};
  white-space: nowrap;
  user-select: none;

  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.colors.primary100};
  }
`;

const StyledSelectItem = styled(Select.Item)`
  ${itemStyles}

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
  }

  &[data-state='checked'] {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary600};
  }
`;

const Root = Select.Root;
const Trigger = SelectTrigger;
const Value = SelectValue;
const Portal = Select.Portal;
const Content = SelectContent;
const Viewport = SelectViewport;
const Item = SelectItem;
const ItemIndicator = Select.ItemIndicator;
const ItemText = Select.ItemText;
const Group = Select.Group;

type SelectProps = Select.SelectProps;
type SingleSelectProps = Select.SingleSelectProps;
type MultiSelectProps = Select.MultiSelectProps;
type PortalProps = Select.SelectPortalProps;
type ContentProps = Select.SelectContentProps;
type ViewportProps = Select.SelectViewportProps;
type ItemIndicatorProps = Select.SelectItemIndicatorProps;
type ItemTextProps = Select.SelectItemTextProps;
type GroupProps = Select.SelectGroupProps;
type ValueRenderFn = Select.SelectValueRenderFn;

export { Root, Trigger, Value, Portal, Content, Viewport, Item, ItemIndicator, ItemText, Group };
export type {
  SingleSelectProps,
  MultiSelectProps,
  SelectProps,
  TriggerProps,
  ValueProps,
  ValueRenderFn,
  PortalProps,
  ContentProps,
  ViewportProps,
  ItemProps,
  ItemIndicatorProps,
  ItemTextProps,
  GroupProps,
};
