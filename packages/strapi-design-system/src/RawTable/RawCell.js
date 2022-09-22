import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../Box';
import { getFocusableNodes } from '../helpers/getFocusableNodes';

import { useTable } from './RawTableContext';

export const RawTh = (props) => <RawTd {...props} as="th" />;

export const RawTd = ({ coords, as, ...props }) => {
  const tdRef = useRef(null);
  const { rowIndex, colIndex } = useTable();
  const [isActive, setIsActive] = useState(false);

  /** @type {import("react").KeyboardEventHandler<HTMLTableCellElement> } */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isActive) {
      setIsActive(true);
      /**
       * Cells should be "escapeable" with the escape key or enter key
       */
    } else if ((e.key === 'Escape' || e.key === 'Enter') && isActive) {
      setIsActive(false);
      /**
       * Refocus the cell
       */
      tdRef.current.focus();
    } else if (isActive) {
      /**
       * This stops the table navigation from working
       */
      e.stopPropagation();
    }
  };

  const isFocused = rowIndex === coords.row - 1 && colIndex === coords.col - 1;

  useLayoutEffect(() => {
    tdRef.current.setAttribute('tabIndex', !isActive && isFocused ? 0 : -1);
  }, [isActive, isFocused]);

  useLayoutEffect(() => {
    const focusableNodes = getFocusableNodes(tdRef.current, true);
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
  }, [isActive]);

  return <Box as={as ? as : 'td'} ref={tdRef} onKeyDown={handleKeyDown} {...props} />;
};

RawTh.defaultProps = {
  coords: {},
};

RawTh.propTypes = {
  ['aria-colindex']: PropTypes.number.isRequired,
  /**
   * Position of the cell in the table
   */
  coords: PropTypes.shape({
    col: PropTypes.number,
    row: PropTypes.number,
  }),
};

RawTd.defaultProps = {
  coords: {},
};

RawTd.propTypes = {
  ['aria-colindex']: PropTypes.number.isRequired,
  as: PropTypes.oneOf(['td', 'th']),
  /**
   * Position of the cell in the table
   */
  coords: PropTypes.shape({
    col: PropTypes.number,
    row: PropTypes.number,
  }),
};
