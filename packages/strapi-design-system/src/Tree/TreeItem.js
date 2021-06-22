import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TreeLeaf } from './TreeLeaf';

const TreeLeafWrapper = styled.div`
  margin-left: calc(-${({ theme }) => theme.spaces[8]} - ${4 / 2 / 16}rem);
  position: absolute;
`;

export const TreeItem = ({ children, ...props }) => {
  return (
    <li role="treeitem" tabIndex={-1} {...props} style={{ padding: '16px 0' }}>
      <TreeLeafWrapper>
        <TreeLeaf />
      </TreeLeafWrapper>
      {children}
    </li>
  );
};

TreeItem.propTypes = {
  children: PropTypes.node.isRequired,
};
