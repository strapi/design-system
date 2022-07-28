import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { avatarSize, previewSize } from './constants';
import { Typography } from '../Typography';
import { Flex } from '../Flex';

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

export const Avatar = ({ src, alt, preview }) => {
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

export const Initials = ({ children }) => {
  return (
    <InitialsWrapper
      borderRadius="50%"
      width={`${avatarSize}px`}
      height={`${avatarSize}px`}
      background="primary600"
      justifyContent="center"
    >
      <Typography fontWeight="bold" textColor="buttonNeutral0" fontSize={0} textTransform="uppercase">
        {children}
      </Typography>
    </InitialsWrapper>
  );
};

Initials.propTypes = {
  children: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  preview: undefined,
};

Avatar.propTypes = {
  /**
   * Alternative text
   */
  alt: PropTypes.string.isRequired,
  /**
   * Image src of the image preview (displayed on `Avatar` hover).
   */
  preview: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Image src of the `Avatar`
   */
  src: PropTypes.string.isRequired,
};
