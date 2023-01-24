import { useState } from 'react';
import styled from 'styled-components';

import { Typography, TypographyProps } from '../Typography';
import { Flex, FlexProps } from '../Flex';

import { avatarSize, previewSize } from './constants';

const AvatarImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  display: block;
  position: relative;
`;

const AvatarImgWrapper = styled.div<{ hovering: boolean }>`
  position: relative;
  width: ${avatarSize / 16}rem;
  height: ${avatarSize / 16}rem;
  z-index: ${({ hovering }) => (hovering ? 1 : undefined)};
`;

const PreviewContainer = styled.img`
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  transform: translate(-${(previewSize - avatarSize) / 2}px, -100%);
  margin-top: -${({ theme }) => theme.spaces[1]};
`;

const Overlay = styled.div`
  z-index: 1;
  border-radius: 30%;
  position: absolute;
  width: ${avatarSize / 16}rem;
  height: ${avatarSize / 16}rem;
  background: ${({ theme }) => theme.colors.neutral0};
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
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <span>
      {preview && previewVisible ? (
        <PreviewContainer
          aria-hidden
          alt=""
          width={`${previewSize}px`}
          height={`${previewSize}px`}
          src={preview === true ? src : preview}
        />
      ) : null}

      <AvatarImgWrapper
        hovering={Boolean(preview && previewVisible)}
        onMouseEnter={() => setPreviewVisible(true)}
        onMouseLeave={() => setPreviewVisible(false)}
      >
        {preview && previewVisible ? <Overlay /> : null}
        <AvatarImg src={src} alt={alt} width={`${avatarSize}px`} height={`${avatarSize}px`} />
      </AvatarImgWrapper>
    </span>
  );
};

const InitialsWrapper = styled(Flex)`
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
