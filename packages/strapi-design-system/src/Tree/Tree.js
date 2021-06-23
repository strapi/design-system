import React from 'react';
import PropTypes from 'prop-types';
import { TreeItem } from './TreeItem';
import { TreeItemContent } from './TreeItemContent';
import { SubTree } from './SubTree';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { focusNextLeaf, focusPreviousLeaf } from './utils';
import styled from 'styled-components';

const TreeWrapper = styled.ul`
  li:last-of-type {
    padding-bottom: 0;
  }
`;

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
    <TreeWrapper role="tree" onKeyDown={handleKeyDown} {...props}>
      <TreeItem removeMarker>
        <TreeItemContent tabIndex={0}>{root}</TreeItemContent>
        <SubTree>{children}</SubTree>
      </TreeItem>
    </TreeWrapper>
  );
};

Tree.propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.node.isRequired,
};
