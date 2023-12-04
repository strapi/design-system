import * as React from 'react';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { createContext } from '@radix-ui/react-context';
import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';

import { Flex, FlexProps } from '../Flex';

type Variant = 'primary' | 'secondary';
type Size = 'S' | 'M';

interface AccordionContextValue {
  disabled: boolean;
  variant: Variant;
  size: Size;
}

const [AccordionProvider, useAccordionContext] = createContext<AccordionContextValue>('Accordion');

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface AccordionSharedProps {
  /**
   * @default 'primary'
   */
  variant?: Variant;
  /**
   * @default 'M'
   */
  size?: Size;
}

interface AccordionSingleProps extends RadixAccordion.AccordionSingleProps, AccordionSharedProps {}

interface AccordionMultipleProps extends RadixAccordion.AccordionMultipleProps, AccordionSharedProps {}

const Root = React.forwardRef<HTMLDivElement, AccordionSingleProps | AccordionMultipleProps>(
  ({ variant = 'primary', disabled = false, size = 'M', ...props }, ref) => {
    return (
      <AccordionProvider disabled={disabled} variant={variant} size={size}>
        <StyledRoot ref={ref} variant={disabled ? 'disabled' : variant} disabled={disabled} {...props} />
      </AccordionProvider>
    );
  },
);

const StyledRoot = styled(RadixAccordion.Root)<{ variant: Variant | 'disabled' }>`
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => {
    switch (props.variant) {
      case 'disabled':
        return `1px solid ${props.theme.colors.neutral150}`;
      case 'primary':
        return `1px solid ${props.theme.colors.neutral0}`;
      default:
        return `1px solid ${props.theme.colors.neutral100}`;
    }
  }};
  overflow: hidden;
`;

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

interface ItemProps extends RadixAccordion.AccordionItemProps {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  return <AccordionItem ref={ref} {...props} />;
});

const AccordionItem = styled(RadixAccordion.Item)``;

/* -------------------------------------------------------------------------------------------------
 * Icon
 * -----------------------------------------------------------------------------------------------*/

const ICON_NAME = 'Icon';

interface IconProps extends FlexProps<'span'> {}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { disabled, size } = useAccordionContext(ICON_NAME);

  return (
    <IconContainer
      ref={ref}
      justifyContent="center"
      borderRadius="50%"
      height={size === 'M' ? `3.2rem` : `2.4rem`}
      width={size === 'M' ? `3.2rem` : `2.4rem`}
      aria-hidden
      as="span"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      shrink={0}
      {...props}
    >
      <CarretDown width={size === 'M' ? `1.1rem` : `0.8rem`} />
    </IconContainer>
  );
});

const IconContainer = styled(Flex)``;

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

const HEADER_NAME = 'Header';

interface HeaderProps extends RadixAccordion.AccordionHeaderProps {}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { size, variant } = useAccordionContext(HEADER_NAME);

  return <AccordionHeader variant={variant} ref={ref} size={size} {...props} />;
});

const AccordionHeader = styled(RadixAccordion.Header)<{ size: Size; variant: Variant }>`
  padding: ${(props) =>
    props.size === 'M' ? `${props.theme.spaces[6]}` : `${props.theme.spaces[4]} ${props.theme.spaces[2]}`};

  &[data-state='open'] {
    background-color: ${(props) => props.theme.colors.primary100};

    ${IconContainer} {
      transform: rotate(180deg);
      background-color: ${(props) => props.theme.colors.primary200};
    }
  }

  &[data-state='closed'] {
    &[data-disabled='true'] {
      background-color: ${(props) => props.theme.colors.neutral150};
    }

    &:not([data-disabled='true']) {
      background-color: ${(props) =>
        props.variant === 'primary' ? props.theme.colors.neutral0 : props.theme.colors.neutral100};
    }

    ${IconContainer} {
      background-color: ${(props) => props.theme.colors.neutral200};
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

const Trigger = RadixAccordion.Trigger;

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

const Content = RadixAccordion.Content;

const Accordion = { Root, Item, Content, Trigger, Header, Icon };

export { Accordion };
