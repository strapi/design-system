import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TreeItemMarker } from './TreeItemMarker';
import { Box } from '../Box';

const TreeItemWrapper = styled.li`
  margin-left: ${({ theme }) => theme.spaces[4]};
  padding-top: ${({ theme }) => theme.spaces[6]};
  padding-bottom: ${({ theme }) => theme.spaces[6]};
`;

const TreeItemLeafWrapper = styled(Box)`
  position: absolute;
  margin-left: calc(-${32 / 16}rem - 1rem);
  transform: translateY(-50%);
`;

export const TreeItem = ({ children, removeMarker, ...props }) => {
  return (
    <TreeItemWrapper role="treeitem" tabIndex={-1} {...props}>
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
