import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { avatarSize, previewSize } from './constants';
import { Typography } from '../Text';
import { Row } from '../Row';

const AvatarImg = styled.img`
  border-radius: 50%;
  display: block;
  position: relative;
`;

const AvatarImgWrapper = styled.div`
  position: relative;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  z-index: ${({ hovering }) => (hovering ? 1 : undefined)};
`;

const PreviewContainer = styled.img`
  border-radius: 50%;
  position: absolute;
  transform: translate(-${(previewSize - avatarSize) / 2}px, -100%);
  margin-top: -${({ theme }) => theme.spaces[1]};
`;

const Overlay = styled.div`
  z-index: 1;
  border-radius: 50%;
  position: absolute;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
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

const getColor =
  (colorName) =>
  ({ theme }) =>
    theme.colors[colorName];

const InitialsWrapper = styled(Row)`
  min-width: ${avatarSize}px;
  min-height: ${avatarSize}px;
  border-radius: 50%;

  background: linear-gradient(
    157deg,
    ${getColor('primary600')} 0%,
    ${getColor('primary500')} 50%,
    ${getColor('primary200')} 81%,
    ${getColor('primary100')} 96%
  );

  span {
    line-height: 0;
  }
`;

export const Initials = ({ children }) => {
  return (
    <InitialsWrapper justifyContent="center">
      <Typography fontWeight="bold" textColor="neutral0" fontSize={0} textTransform="uppercase">
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
  alt: PropTypes.string.isRequired,
  preview: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src: PropTypes.string.isRequired,
};
