import * as React from 'react';

import { getFocusableNodes, getFocusableNodesWithKeyboardNav } from '../../helpers/getFocusableNodes';
import { KeyboardKeys } from '../../helpers/keyboardKeys';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { Box, BoxProps } from '../../primitives/Box';

import { useTable } from './RawTableContext';

/* -------------------------------------------------------------------------------------------------
 * RawTd
 * -----------------------------------------------------------------------------------------------*/

interface RawTdProps extends BoxProps<'td' | 'th'> {
  'aria-colindex'?: number;
  children?: React.ReactNode;
  coords?: {
    col: number;
    row: number;
  };
}

const RawTd = ({ coords = { col: 0, row: 0 }, tag = 'td', ...props }: RawTdProps) => {
  const tdRef = React.useRef<HTMLTableCellElement>(null!);
  const { rowIndex, colIndex, setTableValues } = useTable();
  const [isActive, setIsActive] = React.useState(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTableCellElement> = (e) => {
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
      if (isEnterKey && document.activeElement?.tagName === 'A') {
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
  useIsomorphicLayoutEffect(() => {
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
      tdRef.current.setAttribute('tabIndex', !isActive && isFocused ? '0' : '-1');

      focusableNodes.forEach((node, index) => {
        node.setAttribute('tabIndex', isActive ? '0' : '-1');

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
        node.setAttribute('tabIndex', isFocused ? '0' : '-1');
      });
    }
  }, [isActive, isFocused]);

  const handleFocusableNodeFocus = React.useCallback(() => {
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
  useIsomorphicLayoutEffect(() => {
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

  return <Box role="gridcell" tag={tag} ref={tdRef} onKeyDown={handleKeyDown} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * RawTh
 * -----------------------------------------------------------------------------------------------*/

type RawThProps = Omit<RawTdProps, 'as'>;

const RawTh = (props: RawThProps) => <RawTd {...props} tag="th" />;

export { RawTd, RawTh };
export type { RawTdProps, RawThProps };
