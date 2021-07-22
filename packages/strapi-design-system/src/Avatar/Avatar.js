import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const avatarSize = 26;
const previewSize = 64;

const AvatarImg = styled.img`
  border-radius: 50%;
  display: block;
`;

const PreviewContainer = styled.img`
  border-radius: 50%;
  position: absolute;
  transform: translate(-${(previewSize - avatarSize) / 2}px, -100%);
  margin-top: -${({ theme }) => theme.spaces[1]};
`;

export const Avatar = ({ src, alt, preview }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <span>
      {preview && previewVisible && (
        <PreviewContainer
          aria-hidden
          alt=""
          width={`${previewSize}px`}
          height={`${previewSize}px`}
          src={preview === true ? src : preview}
        />
      )}
      <AvatarImg
        src={src}
        alt={alt}
        width={`${avatarSize}px`}
        height={`${avatarSize}px`}
        onMouseEnter={() => setPreviewVisible(true)}
        onMouseLeave={() => setPreviewVisible(false)}
      />
    </span>
  );
};

Avatar.defaultProps = {
  preview: undefined,
};

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  preview: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  src: PropTypes.string.isRequired,
};
