import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../Box';
import { getFocusableNodes, getFocusableNodesWithKeyboardNav } from '../helpers/getFocusableNodes';
import { KeyboardKeys } from '../helpers/keyboardKeys';

import { useTable } from './RawTableContext';

export const RawTh = (props) => <RawTd {...props} as="th" />;

export const RawTd = ({ coords, as, ...props }) => {
  const tdRef = useRef(null);
  const { rowIndex, colIndex, setTableValues } = useTable();
  const [isActive, setIsActive] = useState(false);

  /** @type {import("react").KeyboardEventHandler<HTMLTableCellElement> } */
  const handleKeyDown = (e) => {
    const focusableNodes = getFocusableNodes(tdRef.current, true);

    /**
     * If the cell does not have focusable children or if it has focusable children
     * without keyboard navigation, we should not run the handler.
     */
    if (
      focusableNodes.length === 0 ||
      (focusableNodes.length === 1 && getFocusableNodesWithKeyboardNav(focusableNodes).length === 0)
    ) {
      return;
      /**
       * This allows cells that **only** have buttons in them to still be
       * navigable with the keyboard arrow keys (left / right) as if they were grid cells.
       *
       * If there are nextNodes (next child node) then we stop the table's keyboard navigation
       * handlers from happening.
       */
    }
    if (focusableNodes.length > 1 && !focusableNodes.find((node) => node.tagName !== 'BUTTON')) {
      e.preventDefault();
      const focussedButtonIndex = focusableNodes.findIndex((node) => node === document.activeElement);

      if (e.key === KeyboardKeys.RIGHT) {
        const nextNode = focusableNodes[focussedButtonIndex + 1];

        if (nextNode) {
          e.stopPropagation();
          nextNode.focus();
        }
      } else if (e.key === KeyboardKeys.LEFT) {
        const nextNode = focusableNodes[focussedButtonIndex - 1];

        if (nextNode) {
          e.stopPropagation();
          nextNode.focus();
        }
      }

      return;
    }

    const isEnterKey = e.key === KeyboardKeys.ENTER;

    if (isEnterKey && !isActive) {
      setIsActive(true);
      /**
       * Cells should be "escapeable" with the escape key or enter key
       */
    } else if ((e.key === KeyboardKeys.ESCAPE || isEnterKey) && isActive) {
      /**
       * It's expected behaviour that the cell can't be escaped with `enter` if
       * the element that is focussed is an anchor tag.
       */
      if (isEnterKey && document.activeElement.tagName === 'A') {
        return;
      }

      setIsActive(false);
      tdRef.current.focus();
    } else if (isActive) {
      /**
       * This stops the table navigation from working
       */
      e.stopPropagation();
    }
  };

  const isFocused = rowIndex === coords.row - 1 && colIndex === coords.col - 1;

  /**
   * Handles tabindex of the rendered cell element
   */
  useLayoutEffect(() => {
    const focusableNodes = getFocusableNodes(tdRef.current, true);

    /**
     * We should focus the cell if there are no focussable children inside
     * If there is only one focusable child and it has it's own keyboard navigation
     * Or if there is more than one focusable child unless those children
     * are exclusively buttons.
     */
    if (
      focusableNodes.length === 0 ||
      (focusableNodes.length === 1 && getFocusableNodesWithKeyboardNav(focusableNodes).length !== 0) ||
      (focusableNodes.length > 1 && Boolean(focusableNodes.find((node) => node.tagName !== 'BUTTON')))
    ) {
      tdRef.current.setAttribute('tabIndex', !isActive && isFocused ? 0 : -1);

      focusableNodes.forEach((node, index) => {
        node.setAttribute('tabIndex', isActive ? 0 : -1);

        /**
         * When a cell is active we want to focus the
         * first focusable element simulating a focus trap
         */
        if (isActive && index === 0) {
          node.focus();
        }
      });
    } else {
      focusableNodes.forEach((node) => {
        node.setAttribute('tabIndex', isFocused ? 0 : -1);
      });
    }
  }, [isActive, isFocused]);

  const handleFocusableNodeFocus = useCallback(() => {
    const focusableNodes = getFocusableNodes(tdRef.current, true);

    /**
     * If there's 1 or more focusable children and at least one has keyboard navigation
     * or the children are exclusively button elements the cell should be using the "active" system
     */
    if (
      focusableNodes.length >= 1 &&
      (getFocusableNodesWithKeyboardNav(focusableNodes).length !== 0 ||
        !focusableNodes.find((node) => node.tagName !== 'BUTTON'))
    ) {
      setIsActive(true);
    }
    /**
     * This function is wrapped in `useCallback` so we can safely
     * assume that the reference will not change
     */
    setTableValues({ rowIndex: coords.row - 1, colIndex: coords.col - 1 });
  }, [coords, setTableValues]);

  /**
   * This handles the case where you click on a focusable
   * node that has it's own keyboard nav (e.g. Input)
   */
  useLayoutEffect(() => {
    const cell = tdRef.current;
    const focusableNodes = getFocusableNodes(cell, true);

    focusableNodes.forEach((node) => {
      node.addEventListener('focus', handleFocusableNodeFocus);
    });

    return () => {
      const focusableNodes = getFocusableNodes(cell, true);
      focusableNodes.forEach((node) => {
        node.removeEventListener('focus', handleFocusableNodeFocus);
      });
    };
  }, [handleFocusableNodeFocus]);

  return <Box role="gridcell" as={as} ref={tdRef} onKeyDown={handleKeyDown} {...props} />;
};

RawTh.defaultProps = {
  children: undefined,
  coords: {},
};

RawTh.propTypes = {
  'aria-colindex': PropTypes.number.isRequired,
  children: PropTypes.node,
  /**
   * Position of the cell in the table
   */
  coords: PropTypes.shape({
    col: PropTypes.number,
    row: PropTypes.number,
  }),
};

RawTd.defaultProps = {
  as: 'td',
  children: undefined,
  coords: {},
};

RawTd.propTypes = {
  'aria-colindex': PropTypes.number.isRequired,
  as: PropTypes.oneOf(['td', 'th']),
  children: PropTypes.node,
  /**
   * Position of the cell in the table
   */
  coords: PropTypes.shape({
    col: PropTypes.number,
    row: PropTypes.number,
  }),
};
