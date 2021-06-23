import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TreeItemMarker } from './TreeItemMarker';
import { Box } from '../Box';

const TreeItemWrapper = styled.li`
  padding-top: ${({ theme }) => theme.spaces[6]};
  padding-bottom: ${({ theme }) => theme.spaces[6]};
  position: relative;
`;

const TreeItemLeafWrapper = styled(Box)`
  position: absolute;
  transform: translateY(-50%);
`;

export const TreeItem = ({ children, removeMarker, ...props }) => {
  return (
    <TreeItemWrapper role="treeitem" {...props}>
      {removeMarker ? null : (
        <TreeItemLeafWrapper>
          <TreeItemMarker />
        </TreeItemLeafWrapper>
      )}
      {children}
    </TreeItemWrapper>
  );
};

TreeItem.defaultProps = {
  removeMarker: false,
};

TreeItem.propTypes = {
  children: PropTypes.node.isRequired,
  removeMarker: PropTypes.bool,
};
