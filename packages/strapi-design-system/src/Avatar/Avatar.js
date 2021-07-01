import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const avatarSize = '26px';

const AvatarImg = styled.img`
  border-radius: 50%;
  display: block;
  height: ${avatarSize};
  width: ${avatarSize};
`;

export const Avatar = ({ src, alt }) => {
  return <AvatarImg src={src} alt={alt} width={avatarSize} height={avatarSize} />;
};

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
