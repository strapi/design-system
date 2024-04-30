import * as React from 'react';

import { styled } from 'styled-components';

import { Box, BoxComponent } from '../Box';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { Typography, TypographyProps } from '../Typography';

import { avatarSize, previewSize } from './constants';

const AvatarImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  display: block;
  position: relative;
`;

const PreviewContainer = styled.img`
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  transform: translate(-${(previewSize - avatarSize) / 2}px, -100%);
  margin-top: -${({ theme }) => theme.spaces[1]};
`;

const Overlay = styled<BoxComponent>(Box)`
  opacity: 0.4;
`;

export interface AvatarProps {
  /**
   * Alternative text
   */
  alt?: string;
  /**
   * Image src of the image preview (displayed on `Avatar` hover).
   */
  preview?: boolean | string;
  /**
   * Image src of the `Avatar`
   */
  src: string;
}

export const Avatar = ({ src, alt, preview }: AvatarProps) => {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const isHovering = Boolean(preview && previewVisible);

  return (
    <span>
      {isHovering ? (
        <PreviewContainer
          aria-hidden
          alt=""
          width={`${previewSize}px`}
          height={`${previewSize}px`}
          // eslint-disable-next-line no-nested-ternary
          src={preview === true ? src : typeof preview === 'string' ? preview : ''}
        />
      ) : null}

      <Box
        zIndex={isHovering ? 1 : undefined}
        position="relative"
        onMouseEnter={() => setPreviewVisible(true)}
        onMouseLeave={() => setPreviewVisible(false)}
        width={`${avatarSize}px`}
        height={`${avatarSize}px`}
      >
        {isHovering ? (
          <Overlay
            background="neutral0"
            borderRadius="50%"
            position="absolute"
            width={`${avatarSize}px`}
            height={`${avatarSize}px`}
            zIndex={1}
          />
        ) : null}
        <AvatarImg src={src} alt={alt} width={`${avatarSize}px`} height={`${avatarSize}px`} />
      </Box>
    </span>
  );
};

const InitialsWrapper = styled<FlexComponent>(Flex)`
  span {
    line-height: 0;
  }
`;

export type InitialsProps = Pick<FlexProps, 'background'> &
  Pick<TypographyProps, 'textColor'> & {
    children: React.ReactNode;
  };

export const Initials = ({ children, background = 'primary600', textColor = 'buttonNeutral0' }: InitialsProps) => {
  return (
    <InitialsWrapper
      background={background}
      borderRadius="50%"
      width={`${avatarSize}px`}
      height={`${avatarSize}px`}
      justifyContent="center"
    >
      <Typography fontSize={0} fontWeight="bold" textColor={textColor} textTransform="uppercase">
        {children}
      </Typography>
    </InitialsWrapper>
  );
};
