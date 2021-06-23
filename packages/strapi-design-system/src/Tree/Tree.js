import React from 'react';
import PropTypes from 'prop-types';
import { TreeItem } from './TreeItem';
import { TreeItemContent } from './TreeItemContent';
import { SubTree } from './SubTree';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { focusNextLeaf, focusPreviousLeaf } from './utils';

export const Tree = ({ children, root, ...props }) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.DOWN:
      case KeyboardKeys.ARROW_LEFT: {
        e.preventDefault();

        focusNextLeaf(e.currentTarget);
        break;
      }

      case KeyboardKeys.UP:
      case KeyboardKeys.ARROW_RIGHT: {
        e.preventDefault();

        focusPreviousLeaf(e.currentTarget);
        break;
      }

      default:
        break;
    }
  };

  return (
    <ul role="tree" onKeyDown={handleKeyDown} {...props}>
      <TreeItem removeMarker>
        <TreeItemContent tabIndex={0}>{root}</TreeItemContent>
        <SubTree>{children}</SubTree>
      </TreeItem>
    </ul>
  );
};

Tree.propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.node.isRequired,
};
