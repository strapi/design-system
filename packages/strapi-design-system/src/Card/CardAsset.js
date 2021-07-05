import React from 'react';
import styled from 'styled-components';

const CardAssetImg = styled.img`
  // inline flows is based on typography and displays an extra white space below the image
  // switch to block is required in order to make the img stick the bottom of the container
  // addition infos: https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image
  display: block;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export const CardAsset = (props) => {
  return <CardAssetImg {...props} aria-hidden />;
};
