import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { TableLabel } from '../Text';
import styled from 'styled-components';

const AssetTagWrapper = styled(Box)`
  display: inline-block;
`;

export const AssetTag = (props) => {
  return (
    <AssetTagWrapper padding={1} background="neutral100" hasRadius={true} color="neutral600">
      <TableLabel {...props} />
    </AssetTagWrapper>
  );
};

AssetTag.displayName = AssetTag;

AssetTag.propTypes = {};
