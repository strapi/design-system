import * as React from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import { css, styled } from 'styled-components';

import { createContext } from '../../helpers/context';
import { Typography, TypographyComponent } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

type Variant = 'regular' | 'simple';

interface ContextValue {
  /**
   * @default false
   * @description This will disable all tabs, you can pass
   * this attribute to individual triggers to disable them.
   * If you provide a string, it should be the value of a trigger.
   */
  disabled: boolean | string;
  /**
   * @description This will show an error state on the tab
   * that matches the value provided.
   */
  hasError?: string;
  /**
   * @default 'regular'
   */
  variant: Variant;
}

const [TabsProvider, useTabs] = createContext<ContextValue>('Tabs');

type Element = HTMLDivElement;

interface Props extends Tabs.TabsProps, Partial<ContextValue> {}

const Root = React.forwardRef<Element, Props>(
  ({ disabled = false, variant = 'regular', hasError, ...props }, forwardedRef) => {
    return (
      <TabsProvider disabled={disabled} hasError={hasError} variant={variant}>
        <TabsRoot ref={forwardedRef} {...props} />
      </TabsProvider>
    );
  },
);

const TabsRoot = styled(Tabs.Root)`
  width: 100%;
  position: relative;
`;

/* -------------------------------------------------------------------------------------------------
 * List
 * -----------------------------------------------------------------------------------------------*/

type ListElement = HTMLDivElement;

interface ListProps extends Tabs.TabsListProps {}

const List = React.forwardRef<ListElement, ListProps>((props, forwardedRef) => {
  const { variant } = useTabs('List');
  return <TabsList ref={forwardedRef} {...props} $variant={variant} />;
});

const TabsList = styled(Tabs.List)<{ $variant: Variant }>`
  display: flex;
  align-items: ${(props) => (props.$variant === 'regular' ? 'flex-end' : 'unset')};
  position: relative;
  z-index: 0;
`;

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = HTMLButtonElement;

interface TriggerProps extends Tabs.TabsTriggerProps {}

const Trigger = React.forwardRef<TriggerElement, TriggerProps>(
  ({ children, disabled: disabledProp, ...props }, forwardedRef) => {
    const { disabled: disabledContext, variant, hasError } = useTabs('Trigger');

    const isDisabled = disabledContext === true || disabledContext === props.value || disabledProp;
    const isErrored = hasError === props.value;

    return (
      <TabsTrigger ref={forwardedRef} {...props} $hasError={isErrored} $variant={variant} disabled={isDisabled}>
        <TriggerTypography fontWeight="bold" variant={variant === 'simple' ? 'sigma' : undefined}>
          {children}
        </TriggerTypography>
        {variant === 'simple' ? <TabBar /> : null}
      </TabsTrigger>
    );
  },
);

/**
 * TODO: do we want to implement a moving tab indicator?
 * This can be done by keeping hold of the active tab's position & dimensions
 * setting that as the default state of the indicator, and then updating it with
 * the new active tab. Probably need to internally control the state.
 */
const TabBar = styled.span`
  display: block;
  width: 100%;
  background-color: currentColor;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  height: 0.2rem;

  @media (prefers-reduced-motion: no-preference) {
    transition: ${(props) => `opacity 200ms ${props.theme.motion.easings.authenticMotion}`};
  }
`;

const TriggerTypography = styled<TypographyComponent>(Typography)``;

const TabsTrigger = styled(Tabs.Trigger)<{ $hasError?: boolean; $variant: Variant }>`
  position: relative;
  color: ${(props) => (props.$hasError ? props.theme.colors.danger600 : props.theme.colors.neutral600)};
  cursor: pointer;
  z-index: 0;

  ${(props) => {
    if (props.$variant === 'simple') {
      return css`
        padding-block: ${(props) => props.theme.spaces[4]};
        padding-inline: ${(props) => props.theme.spaces[4]};

        & > ${TriggerTypography} {
          line-height: 1.2rem;
        }

        &[data-state='active'] {
          color: ${props.$hasError ? props.theme.colors.danger600 : props.theme.colors.primary700};

          & > ${TabBar} {
            opacity: 1;
          }
        }
      `;
    } else {
      return css`
        padding-block: ${(props) => props.theme.spaces[3]};
        padding-inline: ${(props) => props.theme.spaces[3]};
        flex: 1;
        background-color: ${(props) => props.theme.colors.neutral100};
        border-bottom: solid 1px ${(props) => props.theme.colors.neutral150};

        &:not([data-state='active']) + &:not([data-state='active']) {
          border-left: solid 1px ${(props) => props.theme.colors.neutral150};
        }

        &[data-state='active'] {
          padding-block: ${(props) => props.theme.spaces[4]};
          padding-inline: ${(props) => props.theme.spaces[4]};
          color: ${props.$hasError ? props.theme.colors.danger600 : props.theme.colors.primary700};
          border-top-right-radius: ${(props) => props.theme.borderRadius};
          border-top-left-radius: ${(props) => props.theme.borderRadius};
          background-color: ${(props) => props.theme.colors.neutral0};
          border-bottom: solid 1px ${(props) => props.theme.colors.neutral0};
          box-shadow: ${props.theme.shadows.tableShadow};
          z-index: 1;
        }
      `;
    }
  }}

  @media (prefers-reduced-motion: no-preference) {
    transition: ${(props) =>
      `${props.theme.transitions.color}, ${props.theme.transitions.backgroundColor}, box-shadow ${props.theme.motion.timings['120']} ${props.theme.motion.easings.easeOutQuad}`};
  }

  &[data-disabled] {
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.neutral400};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = HTMLDivElement;

interface ContentProps extends Tabs.TabsContentProps {}

const Content = React.forwardRef<ContentElement, ContentProps>((props, forwardedRef) => {
  return <TabsContent ref={forwardedRef} {...props} />;
});

const TabsContent = styled(Tabs.Content)`
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.neutral0};
`;

export { Root, List, Trigger, Content };
export type { Props, Element, ListProps, ListElement, TriggerProps, TriggerElement, ContentProps, ContentElement };
