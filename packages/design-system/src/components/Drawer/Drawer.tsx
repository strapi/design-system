import * as React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { CaretDown, Cross } from '@strapi/icons';
import { css, CSSProperties, styled } from 'styled-components';

import { createContext } from '../../helpers/context';
import { handleResponsiveValues, ResponsiveProperty } from '../../helpers/handleResponsiveValues';
import { setOpacity } from '../../helpers/setOpacity';
import { useControllableState } from '../../hooks/useControllableState';
import { Box } from '../../primitives/Box';
import { Flex, type FlexComponent, type FlexProps } from '../../primitives/Flex';
import { Typography, TypographyProps } from '../../primitives/Typography';
import { ANIMATIONS } from '../../styles/motion';
import { ScrollArea, ScrollAreaProps } from '../../utilities/ScrollArea';
import { IconButton } from '../IconButton';

export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';

/* -------------------------------------------------------------------------------------------------
 * Drawer default properties
 * -----------------------------------------------------------------------------------------------*/
// Sizes
const DEFAULT_WIDTH = '32rem';
const DEFAULT_HEIGHT = 'auto';
const DEFAULT_MAX_WIDTH = '100%';

// Paddings
const HORIZONTAL_INNER_PADDING = {
  initial: 4,
  large: 3,
} as ResponsiveProperty<CSSProperties['padding']>;
const VERTICAL_INNER_PADDING = {
  initial: 3,
  large: 3,
} as ResponsiveProperty<CSSProperties['padding']>;

// Animations
const OPENING_ANIMATION_DURATION = 200;
const CLOSING_ANIMATION_DURATION = 120;
const DRAWER_ANIMATIONS = {
  bottom: {
    in: ANIMATIONS.drawerSlideUpIn,
    out: ANIMATIONS.drawerSlideUpOut,
  },
  top: {
    in: ANIMATIONS.drawerSlideDownIn,
    out: ANIMATIONS.drawerSlideDownOut,
  },
  left: {
    in: ANIMATIONS.drawerSlideLeftIn,
    out: ANIMATIONS.drawerSlideLeftOut,
  },
  right: {
    in: ANIMATIONS.drawerSlideRightIn,
    out: ANIMATIONS.drawerSlideRightOut,
  },
} as const;

/* -------------------------------------------------------------------------------------------------
 * Drawer context (open, headerVisible)
 * -----------------------------------------------------------------------------------------------*/

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  headerVisible: boolean;
  overlayVisible: boolean;
}

const [DrawerProvider, useDrawer] = createContext<DrawerContextValue | null>('Drawer', null);

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

interface RootProps extends Dialog.DialogProps {
  /**
   * When true, only the header is visible when drawer is closed.
   * Toggling open shows overlay + full content body.
   */
  headerVisible?: boolean;
  /**
   * When true, the overlay is never shown.
   */
  overlayVisible?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  (
    { headerVisible = false, overlayVisible = true, open: openProp, defaultOpen, onOpenChange, children, ...props },
    forwardedRef,
  ) => {
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
    });

    const handleOpenChange = React.useCallback(
      (next: boolean) => {
        setOpen(next);
        onOpenChange?.(next);
      },
      [setOpen, onOpenChange],
    );

    const dialogOpen = headerVisible ? true : open ?? false;
    const isOpen = open ?? false;
    const modal = !!(isOpen && overlayVisible);
    const [delayedModal, setDelayedModal] = React.useState(false);

    /**
     * When headerVisible is true, delay switching modal until after expand/collapse
     * animation to prevent remount. The remount would prevent the expand/collapse
     * transition from happening.
     */
    React.useEffect(() => {
      if (!headerVisible) return;
      if (modal) {
        const t = setTimeout(() => setDelayedModal(true), OPENING_ANIMATION_DURATION);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDelayedModal(false), CLOSING_ANIMATION_DURATION);
        return () => clearTimeout(t);
      }
    }, [headerVisible, modal]);

    return (
      <div ref={forwardedRef}>
        <DrawerProvider
          open={isOpen}
          onOpenChange={handleOpenChange}
          headerVisible={headerVisible}
          overlayVisible={overlayVisible}
        >
          <Dialog.Root
            {...props}
            open={dialogOpen}
            onOpenChange={handleOpenChange}
            modal={headerVisible ? delayedModal : modal}
          >
            {children}
          </Dialog.Root>
        </DrawerProvider>
      </div>
    );
  },
);

Root.displayName = 'Drawer.Root';

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

interface ContentProps extends Omit<Dialog.DialogContentProps, 'asChild'> {
  /**
   * The edge from which the drawer slides in.
   */
  side?: DrawerSide;
  /**
   * Width of the drawer.
   */
  width?: string;
  /**
   * Maximum width of the drawer.
   */
  maxWidth?: string;
  /**
   * Height of the drawer.
   */
  height?: string;
  /**
   * Maximum height of the drawer.
   */
  maxHeight?: string;
  /**
   * Padding of the drawer content (can be a number or an object of responsive breakpoints).
   */
  padding?: ResponsiveProperty<CSSProperties['padding']>;
}

const Content = React.forwardRef<ContentElement, ContentProps>(
  ({ side = 'right', width, maxWidth, height, maxHeight, padding = 2, children, ...props }, forwardedRef) => {
    const ctx = useDrawer('Drawer.Content');
    const open = ctx?.open ?? false;
    const headerVisible = ctx?.headerVisible ?? false;
    const overlayVisible = ctx?.overlayVisible ?? true;

    const showOverlay = overlayVisible && open;
    const [shouldRenderOverlay, setShouldRenderOverlay] = React.useState(showOverlay);
    const overlayRef = React.useRef<HTMLDivElement | null>(null);

    // Keep overlay mounted during exit animation; unmount only after animation ends
    React.useEffect(() => {
      if (showOverlay) {
        setShouldRenderOverlay(true);
        return;
      }
      const el = overlayRef.current;
      if (!el) {
        setShouldRenderOverlay(false);
        return;
      }
      const onEnd = () => setShouldRenderOverlay(false);
      el.addEventListener('animationend', onEnd, { once: true });
      return () => el.removeEventListener('animationend', onEnd);
    }, [showOverlay]);

    return (
      <Dialog.Portal>
        {shouldRenderOverlay && <Overlay ref={overlayRef} $isVisible={showOverlay} />}
        <ContentContainer
          ref={forwardedRef}
          $side={side}
          $width={width}
          $maxWidth={maxWidth}
          $height={height}
          $maxHeight={maxHeight}
          $headerVisible={headerVisible}
          $open={open}
          $padding={padding}
          {...props}
        >
          <ContentInner>{children}</ContentInner>
        </ContentContainer>
      </Dialog.Portal>
    );
  },
);

const Overlay = styled(Dialog.Overlay)<{ $isVisible: boolean }>`
  background: ${(props) => setOpacity(props.theme.colors.neutral800, 0.2)};
  position: fixed;
  inset: 0;
  z-index: ${(props) => props.theme.zIndices.overlay};
  will-change: opacity;

  @media (prefers-reduced-motion: no-preference) {
    ${({ $isVisible, theme }) =>
      $isVisible
        ? css`
            animation: ${ANIMATIONS.fadeIn} ${theme.motion.timings[OPENING_ANIMATION_DURATION]}
              ${theme.motion.easings.authenticMotion} forwards;
          `
        : css`
            animation: ${ANIMATIONS.fadeOut} ${theme.motion.timings[CLOSING_ANIMATION_DURATION]}
              ${theme.motion.easings.easeOutQuad} forwards;
          `}
  }
`;

interface ContentImplProps {
  $side: DrawerSide;
  $width?: string;
  $maxWidth?: string;
  $height?: string;
  $maxHeight?: string;
  $headerVisible: boolean;
  $open: boolean;
  $padding?: ResponsiveProperty<CSSProperties['padding']>;
}

const ContentContainer = styled(Dialog.Content)<ContentImplProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: ${(props) => props.theme.zIndices.modal};

  ${({ $side, theme, $width, $maxWidth, $height, $maxHeight, $padding, $headerVisible, $open }) => {
    const animation = DRAWER_ANIMATIONS[$side];
    const radius = $padding ? theme.borderRadius : 0;
    const base = css`
      width: ${$width || DEFAULT_WIDTH};
      height: ${$height || DEFAULT_HEIGHT};
      ${handleResponsiveValues({ padding: $padding }, theme)}

      ${!$headerVisible &&
      css`
        @media (prefers-reduced-motion: no-preference) {
          &[data-state='open'] {
            animation-duration: ${theme.motion.timings[OPENING_ANIMATION_DURATION]};
            animation-timing-function: ${theme.motion.easings.authenticMotion};
            animation-name: ${animation.in};
          }
          &[data-state='closed'] {
            animation-duration: ${theme.motion.timings[CLOSING_ANIMATION_DURATION]};
            animation-timing-function: ${theme.motion.easings.easeOutQuad};
            animation-name: ${animation.out};
          }
        }
      `}
      
      ${ContentInner} {
        border-radius: ${radius};

        /* When headerVisible && !open: overlay not used; content impl is direct child of Portal. Ensure it’s positioned. */
        ${$headerVisible &&
        !$open &&
        css`
          box-shadow: none;
        `}
      }
    `;
    switch ($side) {
      case 'bottom':
        return css`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          ${base}
          max-width: ${$maxWidth || DEFAULT_MAX_WIDTH};
          max-height: ${$maxHeight || '80vh'};
        `;
      case 'top':
        return css`
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          ${base}
          max-width: ${$maxWidth || DEFAULT_MAX_WIDTH};
          max-height: ${$maxHeight || '80vh'};
        `;
      case 'left':
        return css`
          left: 0;
          bottom: 0;
          ${base}
          max-width: ${$maxWidth || DEFAULT_MAX_WIDTH};
          max-height: ${$maxHeight || '100vh'};
        `;
      case 'right':
      default:
        return css`
          right: 0;
          bottom: 0;
          ${base}
          max-width: ${$maxWidth || DEFAULT_MAX_WIDTH};
          max-height: ${$maxHeight || '100vh'};
        `;
    }
  }}
`;

const ContentInner = styled(Flex)`
  flex: 1;
  align-items: stretch;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.neutral0};
  box-shadow: ${(props) => props.theme.shadows.popupShadow};
  overflow: hidden;

  > form {
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
   * The label for the close button.
   */
  closeLabel?: string;
  /**
   * A custom close button to replace the default close button. Put `null` to remove it.
   */
  customCloseButton?: React.ReactNode | null;
  /**
   * The label for the expand/collapse toggle when using `headerVisible` on Root (can be a string or an object with `expand` and `collapse` labels).
   */
  toggleLabel?: string | { expand: string; collapse: string };
  /**
   * A custom toggle button to replace the default toggle button. Put `null` to remove it.
   */
  customToggleButton?: React.ReactNode | null;
}

const DEFAULT_TOGGLE_LABELS = { expand: 'Expand drawer', collapse: 'Collapse drawer' } as const;

const ToggleButton = styled(IconButton)`
  padding: 0;
  border: none;
  background: ${({ theme }) => theme.colors.neutral200};
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = React.forwardRef<HeaderElement, HeaderProps>(
  (
    { children, closeLabel = 'Close drawer', customCloseButton, toggleLabel, customToggleButton, ...restProps },
    forwardedRef,
  ) => {
    const drawer = useDrawer('Drawer.Header');
    const open = drawer?.open ?? false;
    const onOpenChange = drawer?.onOpenChange ?? (() => {});
    const headerVisible = drawer?.headerVisible ?? false;
    const toggleLabelResolved =
      toggleLabel === undefined
        ? DEFAULT_TOGGLE_LABELS
        : typeof toggleLabel === 'string'
          ? { expand: toggleLabel, collapse: toggleLabel }
          : toggleLabel;

    return (
      <Head
        ref={forwardedRef}
        alignItems="center"
        gap={2}
        paddingTop={VERTICAL_INNER_PADDING}
        paddingBottom={VERTICAL_INNER_PADDING}
        paddingLeft={HORIZONTAL_INNER_PADDING}
        paddingRight={HORIZONTAL_INNER_PADDING}
        background="neutral0"
        justifyContent="space-between"
        {...restProps}
        tag="header"
      >
        <Box flex={1}>{children}</Box>
        {!headerVisible && open ? (
          <Close>
            {/* The purpose would be to be able to completely remove the close button by passing null */}
            {typeof customCloseButton !== 'undefined' ? (
              customCloseButton
            ) : (
              <IconButton withTooltip={false} label={closeLabel}>
                <Cross />
              </IconButton>
            )}
          </Close>
        ) : headerVisible && typeof customToggleButton !== 'undefined' ? (
          customToggleButton
        ) : headerVisible ? (
          <ToggleButton
            withTooltip={false}
            label={open ? toggleLabelResolved.collapse : toggleLabelResolved.expand}
            onClick={() => onOpenChange(!open)}
            aria-expanded={open}
          >
            <ToggleIconWrapper $expanded={open} aria-hidden>
              <CaretDown width="1.2rem" height="1.2rem" />
            </ToggleIconWrapper>
          </ToggleButton>
        ) : null}
      </Head>
    );
  },
);

const Head = styled<FlexComponent<'header'>>(Flex)`
  flex-shrink: 0;

  & + * {
    border-top: solid 1px ${(props) => props.theme.colors.neutral150};
  }
`;

const ToggleIconWrapper = styled.span<{ $expanded: boolean }>`
  display: inline-flex;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${(props) => props.theme.motion.timings['200']}
      ${(props) => props.theme.motion.easings.authenticMotion};
  }

  ${(props) => (props.$expanded ? 'transform: rotate(180deg);' : '')}
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
  const drawer = useDrawer('Drawer.Body');
  const headerVisible = drawer?.headerVisible ?? false;
  const open = drawer?.open ?? false;
  const expandable = headerVisible;

  const content = (
    <BodyScroll ref={forwardedRef} {...restProps}>
      {children}
    </BodyScroll>
  );

  if (!expandable) return content;

  return (
    <ExpandableSection $open={open} $flex>
      {content}
    </ExpandableSection>
  );
});

const BodyScroll = styled(ScrollArea)`
  flex: 1;
  min-height: 0;
  ${({ theme }) =>
    handleResponsiveValues({ paddingLeft: HORIZONTAL_INNER_PADDING, paddingRight: HORIZONTAL_INNER_PADDING }, theme)};

  & > div {
    margin: 0 -2px 0 -2px;
    padding-left: 2px;
    padding-right: 2px;
    ${({ theme }) =>
      handleResponsiveValues({ paddingTop: VERTICAL_INNER_PADDING, paddingBottom: VERTICAL_INNER_PADDING }, theme)};

    & > div {
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
  const drawer = useDrawer('Drawer.Footer');
  const headerVisible = drawer?.headerVisible ?? false;
  const open = drawer?.open ?? false;
  const expandable = headerVisible;

  const content = (
    <Foot
      ref={forwardedRef}
      paddingTop={VERTICAL_INNER_PADDING}
      paddingBottom={VERTICAL_INNER_PADDING}
      paddingLeft={HORIZONTAL_INNER_PADDING}
      paddingRight={HORIZONTAL_INNER_PADDING}
      background="neutral0"
      justifyContent="space-between"
      {...props}
      tag="footer"
      gap={3}
    />
  );

  if (!expandable) return content;

  return <ExpandableSection $open={open}>{content}</ExpandableSection>;
});

const Foot = styled<FlexComponent<'footer'>>(Flex)`
  border-top: solid 1px ${(props) => props.theme.colors.neutral150};
  flex-shrink: 0;
`;

const ExpandableSection = styled.div<{ $open: boolean; $flex?: boolean }>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${(props) => props.$flex && 'flex: 1; min-height: 0;'}
  max-height: ${(props) => (props.$open ? '100vh' : '0')};
  opacity: ${(props) => (props.$open ? 1 : 0)};

  @media (prefers-reduced-motion: no-preference) {
    transition:
      max-height
        ${(p) =>
          p.$open
            ? p.theme.motion.timings[OPENING_ANIMATION_DURATION]
            : p.theme.motion.timings[CLOSING_ANIMATION_DURATION]}
        ${(p) => p.theme.motion.easings.authenticMotion},
      opacity
        ${(p) =>
          p.$open
            ? p.theme.motion.timings[OPENING_ANIMATION_DURATION]
            : p.theme.motion.timings[CLOSING_ANIMATION_DURATION]}
        ${(p) => p.theme.motion.easings.authenticMotion};
  }
`;

type Props = RootProps;

export { Root, Trigger, Close, Content, Header, Title, Body, Footer };
export type {
  RootProps,
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
