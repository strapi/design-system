import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';

const CardAssetImg = styled.img`
  // inline flows is based on typography and displays an extra white space below the image
  // switch to block is required in order to make the img stick the bottom of the container
  // addition infos: https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image
  margin: 0;
  padding: 0;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

const CardAssetSizes = {
  S: 88,
  M: 164,
};

const CardAssetWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: ${({ size }) => CardAssetSizes[size] / 16}rem;
  width: 100%;
  background: repeating-conic-gradient(${({ theme }) => theme.colors.neutral100} 0% 25%, transparent 0% 50%) 50% / 20px
    20px;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
`;

export const CardAsset = ({ size, children, ...props }) => {
  return (
    <CardAssetWrapper size={size}>
      {children ? <Flex>{children}</Flex> : <CardAssetImg {...props} aria-hidden />}
    </CardAssetWrapper>
  );
};

CardAsset.defaultProps = {
  children: undefined,
  size: 'M',
};

CardAsset.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(['S', 'M']),
};
