import * as React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross } from '@strapi/icons';
import { styled } from 'styled-components';

import { ANIMATIONS } from '../../styles/motion';
import { ScrollArea, ScrollAreaProps } from '../../utilities/ScrollArea';
import { Flex, type FlexComponent, type FlexProps } from '../Flex';
import { IconButton } from '../IconButton';
import { Typography, TypographyProps } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface Props extends Dialog.DialogProps {}

const Root = Dialog.Root;

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = HTMLButtonElement;

interface TriggerProps extends Omit<Dialog.DialogTriggerProps, 'asChild'> {}

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, forwardedRef) => {
  return <Dialog.Trigger {...props} asChild ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = HTMLDivElement;

interface ContentProps extends Dialog.DialogContentProps {}

const Content = React.forwardRef<ContentElement, ContentProps>((props, forwardedRef) => {
  return (
    <Dialog.Portal>
      <Overlay />
      <ContentImpl ref={forwardedRef} {...props} />
    </Dialog.Portal>
  );
});

const Overlay = styled(Dialog.Overlay)`
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

const ContentImpl = styled(Dialog.Content)`
  max-width: 83rem;
  max-height: 80vh;
  height: min-content;
  width: 60%;
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
 * Close
 * -----------------------------------------------------------------------------------------------*/

type CloseElement = HTMLButtonElement;

interface CloseProps extends Omit<Dialog.DialogCloseProps, 'asChild'> {}

const Close = React.forwardRef<CloseElement, CloseProps>((props, forwardedRef) => {
  return <Dialog.Close {...props} asChild ref={forwardedRef} />;
});

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

type HeaderElement = HTMLDivElement;

interface HeaderProps extends Omit<FlexProps<'header'>, 'tag'> {
  /**
   * @default 'Close modal'
   * @description The label for the close button,
   * useful if you want the button to be translated
   * to other languages.
   */
  closeLabel?: string;
}

const Header = React.forwardRef<HeaderElement, HeaderProps>(
  ({ children, closeLabel = 'Close modal', ...restProps }, forwardedRef) => {
    return (
      <Head
        ref={forwardedRef}
        padding={4}
        paddingLeft={5}
        paddingRight={5}
        background="neutral100"
        justifyContent="space-between"
        {...restProps}
        tag="header"
      >
        {children}
        <Close>
          <IconButton withTooltip={false} label={closeLabel}>
            <Cross />
          </IconButton>
        </Close>
      </Head>
    );
  },
);

const Head = styled<FlexComponent<'header'>>(Flex)`
  border-bottom: solid 1px ${(props) => props.theme.colors.neutral150};
`;

/* -------------------------------------------------------------------------------------------------
 * Title
 * -----------------------------------------------------------------------------------------------*/

type TitleElement = HTMLHeadingElement;

interface TitleProps extends TypographyProps<'h2'> {}

const Title = React.forwardRef<TitleElement, TitleProps>((props, forwardedRef) => {
  return (
    <Dialog.Title asChild>
      <Typography tag="h2" variant="omega" fontWeight="bold" ref={forwardedRef} {...props} />
    </Dialog.Title>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Body
 * -----------------------------------------------------------------------------------------------*/

type BodyElement = HTMLDivElement;

interface BodyProps extends ScrollAreaProps {}

const Body = React.forwardRef<BodyElement, BodyProps>(({ children, ...restProps }, forwardedRef) => {
  return (
    <BodyScroll ref={forwardedRef} {...restProps}>
      {children}
    </BodyScroll>
  );
});

const BodyScroll = styled(ScrollArea)`
  padding-inline: ${(props) => props.theme.spaces[8]};

  & > div {
    padding-block: ${(props) => props.theme.spaces[8]};

    & > div {
      // the scroll area component applies a display: table to the child, which we don't want.
      display: block !important;
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Footer
 * -----------------------------------------------------------------------------------------------*/

type FooterElement = HTMLDivElement;

interface FooterProps extends Omit<FlexProps<'footer'>, 'tag'> {}

const Footer = React.forwardRef<FooterElement, FooterProps>((props, forwardedRef) => {
  return (
    <Foot
      ref={forwardedRef}
      padding={4}
      paddingLeft={5}
      paddingRight={5}
      background="neutral100"
      justifyContent="space-between"
      {...props}
      tag="footer"
    />
  );
});

const Foot = styled<FlexComponent<'footer'>>(Flex)`
  border-top: solid 1px ${(props) => props.theme.colors.neutral150};
  flex: 1;
`;

export { Root, Trigger, Close, Content, Header, Title, Body, Footer };
export type {
  Props,
  TriggerElement,
  TriggerProps,
  CloseElement,
  CloseProps,
  ContentProps,
  ContentElement,
  HeaderElement,
  HeaderProps,
  TitleElement,
  TitleProps,
  BodyElement,
  BodyProps,
  FooterElement,
  FooterProps,
};
