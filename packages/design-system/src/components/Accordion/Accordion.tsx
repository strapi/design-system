import * as React from 'react';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { CaretDown } from '@strapi/icons';
import { css, keyframes, styled } from 'styled-components';

import { createContext } from '../../helpers/context';
import { Box, BoxComponent } from '../Box';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography } from '../Typography';

type Size = 'S' | 'M';
type Variant = 'primary' | 'secondary';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface ContextValue {
  /**
   * @default "S"
   */
  size: Size;
  /**
   * @default "primary"
   */
  variant: Variant;
}

const [AccordionProvider, useAccordion] = createContext<ContextValue>('Accordion');

type Element = HTMLDivElement;

type Props = Omit<RadixAccordion.AccordionSingleProps, 'type'> & Partial<ContextValue>;

const Root = React.forwardRef<Element, Props>(
  ({ children, size = 'S', variant = 'primary', ...props }, forwardedRef) => {
    return (
      <AccordionRoot ref={forwardedRef} $size={size} collapsible {...props} type="single">
        <AccordionProvider size={size} variant={variant}>
          {children}
        </AccordionProvider>
      </AccordionRoot>
    );
  },
);

const AccordionRoot = styled(RadixAccordion.Root)<{ $size: Size }>`
  background-color: ${(props) => props.theme.colors.neutral0};

  ${(props) => {
    if (props.$size === 'S') {
      return css`
        border-radius: ${(props) => props.theme.borderRadius};
        border: solid 1px ${(props) => props.theme.colors.neutral200};
      `;
    } else {
      return css``;
    }
  }}
`;

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

type ItemElement = HTMLDivElement;

interface ItemProps extends RadixAccordion.AccordionItemProps {}

const Item = React.forwardRef<ItemElement, ItemProps>((props, forwardedRef) => {
  const { size } = useAccordion('Item');

  return <AccordionItem $size={size} ref={forwardedRef} {...props} />;
});

const AccordionItem = styled(RadixAccordion.Item)<{ $size: Size }>`
  overflow: hidden;

  &:first-child {
    border-top-left-radius: ${(props) => (props.$size === 'S' ? '0.3rem' : '')};
    border-top-right-radius: ${(props) => (props.$size === 'S' ? '0.3rem' : '')};
  }

  &:last-child {
    border-bottom-left-radius: ${(props) => (props.$size === 'S' ? '0.3rem' : '')};
    border-bottom-right-radius: ${(props) => (props.$size === 'S' ? '0.3rem' : '')};
  }

  & + & {
    border-top: ${(props) => (props.$size === 'S' ? `solid 1px ${props.theme.colors.neutral200}` : 'unset')};
  }

  /* This applies our desired focus effect correctly. */
  &:focus-within {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary600};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = HTMLButtonElement;

interface TriggerProps extends Omit<RadixAccordion.AccordionTriggerProps, 'asChild'> {
  /**
   * @default "left"
   */
  caretPosition?: 'left' | 'right';
  description?: string;
  icon?: React.ElementType;
}

const Trigger = React.forwardRef<TriggerElement, TriggerProps>(
  ({ caretPosition = 'left', description, icon: Icon, children, ...restProps }, forwardedRef) => {
    const { size } = useAccordion('Trigger');

    return (
      <AccordionTrigger $caretPosition={caretPosition} $size={size} ref={forwardedRef} {...restProps}>
        {caretPosition === 'left' ? (
          <TriggerIcon $size={size}>
            <CaretDown width={size === 'S' ? '1.2rem' : '1.6rem'} height={size === 'S' ? '1.2rem' : '1.6rem'} />
          </TriggerIcon>
        ) : null}
        <Flex tag="span" gap={2}>
          {Icon ? (
            <IconBox>
              <Icon />
            </IconBox>
          ) : null}
          <Flex alignItems="flex-start" direction="column" tag="span" ref={forwardedRef}>
            <Typography
              fontWeight={size === 'S' ? 'bold' : undefined}
              ellipsis
              variant={size === 'M' ? 'delta' : undefined}
            >
              {children}
            </Typography>
            {description && size === 'M' ? <Typography>{description}</Typography> : null}
          </Flex>
        </Flex>
        {caretPosition === 'right' ? (
          <TriggerIcon $size={size}>
            <CaretDown width={size === 'S' ? '1.2rem' : '1.6rem'} height={size === 'S' ? '1.2rem' : '1.6rem'} />
          </TriggerIcon>
        ) : null}
      </AccordionTrigger>
    );
  },
);

const IconBox = styled<BoxComponent<'span'>>(Box)`
  color: ${(props) => props.theme.colors.neutral500};

  @media (prefers-reduced-motion: no-preference) {
    transition: color 120ms ${(props) => props.theme.easings.easeOutQuad};
  }
`;

const TriggerIcon = styled<FlexComponent<'span'>>(Flex).attrs((props) => ({
  ...props,
  tag: 'span',
}))<{ $size: Size }>`
  background-color: ${(props) => props.theme.colors.neutral200};
  width: ${(props) => (props.$size === 'S' ? '2.4rem' : '3.2rem')};
  height: ${(props) => (props.$size === 'S' ? '2.4rem' : '3.2rem')};
  flex: ${(props) => (props.$size === 'S' ? '0 0 2.4rem' : '0 0 3.2rem')};
  border-radius: 50%;
  justify-content: center;

  @media (prefers-reduced-motion: no-preference) {
    transition:
      transform 300ms ${(props) => props.theme.easings.authenticMotion},
      background-color 120ms ${(props) => props.theme.easings.easeOutQuad};
  }
`;

const AccordionTrigger = styled(RadixAccordion.Trigger)<{ $caretPosition: TriggerProps['caretPosition']; $size: Size }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$caretPosition === 'left' ? 'flex-start' : 'space-between')};
  width: 100%;
  gap: ${(props) => props.theme.spaces[4]};
  padding-inline: ${(props) => (props.$size === 'S' ? props.theme.spaces[4] : props.theme.spaces[6])};
  padding-block: ${(props) => (props.$size === 'S' ? props.theme.spaces[3] : props.theme.spaces[6])};
  cursor: pointer;
  color: ${(props) => props.theme.colors.neutral800};

  &[data-disabled] {
    cursor: default;
    color: ${(props) => props.theme.colors.neutral600};
  }

  &[data-state='open'] > ${TriggerIcon} {
    transform: rotate(180deg);
  }

  /* we remove the default focus because the entire item should have the focus style and the default would be hidden. */
  &:focus-visible {
    outline: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: color 120ms ${(props) => props.theme.easings.easeOutQuad};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Actions
 * -----------------------------------------------------------------------------------------------*/

type ActionsElement = HTMLSpanElement;

interface ActionsProps extends FlexProps<'span'> {}

const Actions = React.forwardRef<ActionsElement, ActionsProps>((props, forwardedRef) => {
  const { size } = useAccordion('Trigger');

  return <ActionWrapper $size={size} {...props} ref={forwardedRef} />;
});

const ActionWrapper = styled<FlexComponent<'span'>>(Flex).attrs((props) => ({
  ...props,
  tag: 'span',
}))<{ $size: Size }>`
  padding-inline: ${(props) => (props.$size === 'S' ? props.theme.spaces[2] : props.theme.spaces[6])};
  padding-block: ${(props) => (props.$size === 'S' ? props.theme.spaces[2] : props.theme.spaces[6])};

  // Remove default IconButton styles so there are no backgrounds or borders.
  & > button {
    border: none;
    background: none;
    color: ${(props) => props.theme.colors.neutral600};

    @media (prefers-reduced-motion: no-preference) {
      transition: color 120ms ${(props) => props.theme.easings.easeOutQuad};
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

type HeaderElement = HTMLHeadingElement;

interface HeaderProps extends Omit<RadixAccordion.AccordionHeaderProps, 'asChild'> {}

const Header = React.forwardRef<HeaderElement, HeaderProps>((props, forwardedRef) => {
  const { variant } = useAccordion('Trigger');

  return <AccordionHeader $variant={variant} ref={forwardedRef} {...props} />;
});

const AccordionHeader = styled(RadixAccordion.Header)<{ $variant: Variant }>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.$variant === 'primary' ? props.theme.colors.neutral0 : props.theme.colors.neutral100};

  &[data-disabled] {
    background-color: ${(props) => props.theme.colors.neutral150};
  }

  &:not([data-disabled]) {
    &:hover,
    &[data-state='open'] {
      background-color: ${(props) => props.theme.colors.primary100};

      & > ${AccordionTrigger} {
        color: ${(props) => props.theme.colors.primary600};

        & ${IconBox} {
          color: ${(props) => props.theme.colors.primary600};
        }

        & ${TriggerIcon} {
          background-color: ${(props) => props.theme.colors.primary200};
        }
      }

      & > ${ActionWrapper} > button {
        color: ${(props) => props.theme.colors.primary600};
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 120ms ${(props) => props.theme.easings.easeOutQuad};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = HTMLDivElement;

interface ContentProps extends RadixAccordion.AccordionContentProps {}

const Content = React.forwardRef<ContentElement, ContentProps>((props, forwardedRef) => {
  return <AccordionContent ref={forwardedRef} {...props} />;
});

const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`;

const AccordionContent = styled(RadixAccordion.Content)`
  overflow: hidden;

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation: ${slideDown} 0.3s ${(props) => props.theme.easings.authenticMotion};
    }

    &[data-state='closed'] {
      animation: ${slideUp} 0.3s ${(props) => props.theme.easings.authenticMotion};
    }
  }
`;

export { Root, Item, Header, Trigger, Actions, Content };
export type {
  ContextValue,
  Element,
  Props,
  ItemElement,
  ItemProps,
  HeaderElement,
  HeaderProps,
  TriggerElement,
  TriggerProps,
  ActionsElement,
  ActionsProps,
  ContentElement,
  ContentProps,
  Size,
  Variant,
};
