import * as React from 'react';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { styled } from 'styled-components';

import { ANIMATIONS } from '../../styles/motion';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography, TypographyComponent, TypographyProps } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface Props extends AlertDialog.AlertDialogProps {}

const Root = AlertDialog.Root;

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = HTMLButtonElement;

interface TriggerProps extends Omit<AlertDialog.AlertDialogTriggerProps, 'asChild'> {}

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, forwardedRef) => {
  return <AlertDialog.Trigger {...props} asChild ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = HTMLDivElement;

interface ContentProps extends AlertDialog.AlertDialogContentProps {}

const Content = React.forwardRef<ContentElement, ContentProps>((props, forwardedRef) => {
  return (
    <AlertDialog.Portal>
      <Overlay />
      <ContentImpl ref={forwardedRef} {...props} />
    </AlertDialog.Portal>
  );
});

const Overlay = styled(AlertDialog.Overlay)`
  background-color: ${(props) => props.theme.colors.neutral800};
  position: fixed;
  inset: 0;
  z-index: ${(props) => props.theme.zIndices.overlay};
  opacity: 0.2;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${ANIMATIONS.overlayFadeIn} ${(props) => props.theme.motion.timings['200']}
      ${(props) => props.theme.motion.easings.authenticMotion};
  }
`;

const ContentImpl = styled(AlertDialog.Content)`
  max-width: 42rem;
  height: min-content;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.neutral0};
  box-shadow: ${(props) => props.theme.shadows.popupShadow};
  z-index: ${(props) => props.theme.zIndices.modal};

  @media (prefers-reduced-motion: no-preference) {
    &[data-state='open'] {
      animation-duration: ${(props) => props.theme.motion.timings['200']};
      animation-timing-function: ${(props) => props.theme.motion.easings.authenticMotion};
      animation-name: ${ANIMATIONS.modalPopIn};
    }

    &[data-state='closed'] {
      animation-duration: ${(props) => props.theme.motion.timings['120']};
      animation-timing-function: ${(props) => props.theme.motion.easings.easeOutQuad};
      animation-name: ${ANIMATIONS.modalPopOut};
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

type HeaderElement = HTMLHeadingElement;

interface HeaderProps extends TypographyProps<'h2'> {}

const Header = React.forwardRef<HeaderElement, HeaderProps>(({ children, ...restProps }, forwardedRef) => {
  return (
    <AlertDialog.Title asChild>
      <Title<'h2'> tag="h2" variant="beta" ref={forwardedRef} padding={6} fontWeight="bold" {...restProps}>
        {children}
      </Title>
    </AlertDialog.Title>
  );
});

const Title = styled<TypographyComponent<'h2'>>(Typography)`
  display: flex;
  justify-content: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.neutral150};
`;

/* -------------------------------------------------------------------------------------------------
 * Body
 * -----------------------------------------------------------------------------------------------*/

type BodyElement = HTMLDivElement;

interface BodyProps extends Omit<FlexProps<'div'>, 'tag'> {
  /**
   * @description optional icon to display, only rendered if
   * children is a string. If provided, it is given the height
   * & width of 24px.
   */
  icon?: React.ReactElement<React.SVGProps<SVGElement>>;
}

const Body = React.forwardRef<BodyElement, BodyProps>(({ children, icon, ...restProps }, forwardedRef) => {
  return (
    <Flex
      ref={forwardedRef}
      gap={2}
      direction="column"
      paddingTop={8}
      paddingBottom={8}
      paddingLeft={6}
      paddingRight={6}
      {...restProps}
    >
      {typeof children === 'string' ? (
        <>
          {icon
            ? React.cloneElement(icon, {
                width: 24,
                height: 24,
              })
            : null}
          <Description>{children}</Description>
        </>
      ) : (
        children
      )}
    </Flex>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Description
 * -----------------------------------------------------------------------------------------------*/

type DescriptionElement = HTMLParagraphElement;

interface DescriptionProps extends Omit<TypographyProps<'p'>, 'tag'> {}

const Description = React.forwardRef<DescriptionElement, DescriptionProps>((props, forwardedRef) => {
  return (
    <AlertDialog.Description asChild>
      <Typography ref={forwardedRef} variant="omega" {...props} tag="p"></Typography>
    </AlertDialog.Description>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Footer
 * -----------------------------------------------------------------------------------------------*/

type FooterElement = HTMLDivElement;

interface FooterProps extends Omit<FlexProps<'footer'>, 'tag'> {}

const Footer = React.forwardRef<FooterElement, FooterProps>((props, forwardedRef) => {
  return <Foot ref={forwardedRef} gap={2} padding={4} justifyContent="space-between" {...props} tag="footer" />;
});

const Foot = styled<FlexComponent<'footer'>>(Flex)`
  border-top: solid 1px ${(props) => props.theme.colors.neutral150};
  flex: 1;
`;

/* -------------------------------------------------------------------------------------------------
 * Cancel
 * -----------------------------------------------------------------------------------------------*/

type CancelElement = HTMLButtonElement;

interface CancelProps extends Omit<AlertDialog.AlertDialogCancelProps, 'asChild'> {}

const Cancel = React.forwardRef<CancelElement, CancelProps>((props, forwardedRef) => {
  return <AlertDialog.Cancel {...props} asChild ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 * Action
 * -----------------------------------------------------------------------------------------------*/

type ActionElement = HTMLButtonElement;

interface ActionProps extends Omit<AlertDialog.AlertDialogActionProps, 'asChild'> {}

const Action = React.forwardRef<ActionElement, ActionProps>((props, forwardedRef) => {
  return <AlertDialog.Action {...props} asChild ref={forwardedRef} />;
});

export { Root, Trigger, Content, Header, Body, Description, Footer, Cancel, Action };
export type {
  Props,
  TriggerElement,
  TriggerProps,
  ContentElement,
  ContentProps,
  HeaderElement,
  HeaderProps,
  BodyElement,
  BodyProps,
  DescriptionElement,
  DescriptionProps,
  FooterElement,
  FooterProps,
  CancelElement,
  CancelProps,
  ActionElement,
  ActionProps,
};
