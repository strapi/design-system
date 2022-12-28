import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { avatarSize, previewSize } from './constants';
import { Typography } from '../Typography';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';
import { throwPropErrorRequiredIf } from '../helpers/throwPropError';

const AvatarImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  display: block;
  position: relative;
`;

const AvatarImgWrapper = styled.div`
  position: relative;
  width: ${avatarSize / 16}rem;
  height: ${avatarSize / 16}rem;
  z-index: ${({ hovering }) => (hovering ? 1 : undefined)};
`;

const ImagePreviewContainer = styled.img`
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

const VideoWrapper = styled(Box)`
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const AvatarVideoWrapper = styled(VideoWrapper)`
  position: relative;
  width: ${avatarSize / 16}rem;
  height: ${avatarSize / 16}rem;
`;

const VideoPreviewWrapper = styled(VideoWrapper)`
  position: absolute;
  transform: translate(-${(previewSize - avatarSize) / 2}px, -100%);
  margin-top: -${({ theme }) => theme.spaces[1]};
`;

export const Avatar = ({ src, alt, preview, type, mime }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  if (type === 'video') {
    return (
      <>
        {preview && previewVisible ? (
          <VideoPreviewWrapper
            aria-hidden
            width={`${previewSize / 16}rem`}
            height={`${previewSize / 16}rem`}
            as="figure"
          >
            <video muted src={preview === true ? src : preview} crossOrigin="anonymous">
              <source type={mime} />
            </video>
          </VideoPreviewWrapper>
        ) : null}
        <AvatarVideoWrapper
          as="figure"
          onMouseEnter={() => setPreviewVisible(true)}
          onMouseLeave={() => setPreviewVisible(false)}
        >
          {preview && previewVisible ? <Overlay /> : null}
          <video muted src={src} crossOrigin="anonymous">
            <source type={mime} />
          </video>
          <VisuallyHidden as="figcaption">{alt}</VisuallyHidden>
        </AvatarVideoWrapper>
      </>
    );
  }

  return (
    <span>
      {preview && previewVisible ? (
        <ImagePreviewContainer
          aria-hidden
          alt=""
          width={`${previewSize}px`}
          height={`${previewSize}px`}
          src={preview === true ? src : preview}
        />
      ) : null}

      <AvatarImgWrapper
        hovering={preview && previewVisible}
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

export const Initials = ({ children, background, textColor }) => {
  return (
    <InitialsWrapper
      borderRadius="50%"
      width={`${avatarSize}px`}
      height={`${avatarSize}px`}
      background={background}
      justifyContent="center"
    >
      <Typography fontWeight="bold" textColor={textColor} fontSize={0} textTransform="uppercase">
        {children}
      </Typography>
    </InitialsWrapper>
  );
};

Initials.defaultProps = {
  background: 'primary600',
  textColor: 'buttonNeutral0',
};

Initials.propTypes = {
  /**
   * Initials background, default is primary600
   */
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
  /**
   * Initials textColor, default is buttonNeutral0
   */
  textColor: PropTypes.string,
};

Avatar.defaultProps = {
  alt: undefined,
  mime: undefined,
  preview: undefined,
  type: 'image',
};

Avatar.propTypes = {
  /**
   * Alternative text
   */
  alt: PropTypes.string,
  /**
   * Mime type, required for video Avatar
   */
  mime: throwPropErrorRequiredIf({ type: 'video' }, 'string'),
  /**
   * Image src of the image preview (displayed on `Avatar` hover).
   * if preview is a boolean, src will be used as preview
   */
  preview: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Image src of the `Avatar`
   */
  src: PropTypes.string.isRequired,
  /**
   * Avatar type, can be video or image
   */
  type: PropTypes.oneOf(['video', 'image']),
};
