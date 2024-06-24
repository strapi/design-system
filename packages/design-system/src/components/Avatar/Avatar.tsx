import * as React from 'react';

import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import { css, styled } from 'styled-components';

import { useControllableState } from '../../hooks/useControllableState';
import { ANIMATIONS } from '../../styles/motion';
import { Box, BoxComponent } from '../Box';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography } from '../Typography';

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

/**
 * The size of the avatar in pixels.
 */
const SIZE = 32;
/**
 * The scale of the preview image relative to the avatar.
 */
const PREVIEW_SCALE = 2;

type ItemElement = HTMLSpanElement;

interface ItemProps extends Avatar.AvatarProps, Pick<Avatar.AvatarImageProps, 'onLoadingStatusChange' | 'src' | 'alt'> {
  /**
   * @default 600
   * @description Useful for delaying rendering so it only
   * appears for those with slower connections.
   */
  delayMs?: Avatar.AvatarFallbackProps['delayMs'];
  fallback: React.ReactNode;
  /**
   * @default false
   * @description Useful for showing a preview of the image
   * on hover in a tooltip.
   */
  preview?: boolean;
}

const Item = React.forwardRef<ItemElement, ItemProps>(
  ({ onLoadingStatusChange, delayMs = 600, src, alt, fallback, preview = false, ...restProps }, forwardedRef) => {
    const [loadingStatus, setLoadingStatus] = useControllableState({
      onChange: onLoadingStatusChange,
    });
    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const hasPreview = preview && loadingStatus === 'loaded';

    const handleTooltipOpen = (isOpen: boolean) => {
      if (hasPreview) {
        setTooltipOpen(isOpen);
      }
    };

    return (
      <Tooltip.Root onOpenChange={handleTooltipOpen}>
        <Tooltip.Trigger asChild>
          <AvatarRoot ref={forwardedRef} {...restProps}>
            {hasPreview ? (
              <AvatarOverlay
                width="100%"
                height="100%"
                position="absolute"
                background="neutral0"
                zIndex="overlay"
                style={{ opacity: tooltipOpen ? 0.4 : 0 }}
              />
            ) : null}
            <AvatarImage src={src} alt={alt} onLoadingStatusChange={setLoadingStatus} />
            <Avatar.Fallback delayMs={delayMs}>
              <Typography fontWeight="bold" textTransform="uppercase">
                {fallback}
              </Typography>
            </Avatar.Fallback>
          </AvatarRoot>
        </Tooltip.Trigger>
        {hasPreview ? (
          <Tooltip.Portal>
            <PreviewContent side="top" sideOffset={4}>
              <PreviewImg src={src} alt={alt} />
            </PreviewContent>
          </Tooltip.Portal>
        ) : null}
      </Tooltip.Root>
    );
  },
);

const avatarStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  overflow: hidden;
  border-radius: 50%;
`;

const imgStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AvatarRoot = styled(Avatar.Root)`
  position: relative;
  z-index: 0;
  ${avatarStyles}
  width: ${SIZE / 10}rem;
  height: ${SIZE / 10}rem;
  /* TODO: we should get the user email & hash it to turn it into a hex-value so different emails can consistently get a different background */
  background-color: ${(p) => p.theme.colors.primary600};
  color: ${(p) => p.theme.colors.neutral0};
`;

const AvatarOverlay = styled<BoxComponent>(Box)`
  @media (prefers-reduced-motion: no-preference) {
    transition: opacity ${(props) => props.theme.motion.timings['200']}
      ${(props) => props.theme.motion.easings.authenticMotion};
  }
`;

const AvatarImage = styled(Avatar.Image)`
  ${imgStyles}
`;

const PreviewContent = styled(Tooltip.Content)`
  ${avatarStyles}
  width: ${(SIZE * PREVIEW_SCALE) / 10}rem;
  height: ${(SIZE * PREVIEW_SCALE) / 10}rem;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${ANIMATIONS.fadeIn} ${(props) => props.theme.motion.timings['200']}
      ${(props) => props.theme.motion.easings.authenticMotion};
  }
`;

const PreviewImg = styled.img`
  ${imgStyles}
`;

/* -------------------------------------------------------------------------------------------------
 * Group
 * -----------------------------------------------------------------------------------------------*/

type GroupElement = HTMLDivElement;

interface GroupProps extends Omit<FlexProps, 'tag'> {}

const Group = React.forwardRef<GroupElement, GroupProps>((props, forwarededRef) => {
  return <GroupFlex {...props} ref={forwarededRef} tag="div" />;
});

const GroupFlex = styled<FlexComponent>(Flex)`
  & > ${AvatarRoot} + ${AvatarRoot} {
    margin-left: -${SIZE / 10 / 2}rem;
  }
`;

export { Item, Group };
export type { ItemElement, ItemProps, GroupElement, GroupProps };
