import React from 'react';
import PropTypes from 'prop-types';
import { TreeItem } from './TreeItem';
import { SubTree } from './SubTree';

export const Tree = ({ children, root, endAction, ...props }) => {
  return (
    <ul role="tree" {...props}>
      <TreeItem removeLeaf>
        {root}
        <SubTree endAction={endAction}>{children}</SubTree>
      </TreeItem>
    </ul>
  );
};

Tree.defaultProps = {
  endAction: undefined,
};

Tree.propTypes = {
  children: PropTypes.node.isRequired,
  endAction: PropTypes.node,
  root: PropTypes.node.isRequired,
};
