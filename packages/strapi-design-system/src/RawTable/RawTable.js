import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RawTableContext } from './RawTableContext';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { focusFocusable } from './focusFocusable';

export const RawTable = ({ colCount, rowCount, jumpStep, initialCol, initialRow, ...props }) => {
  const tableRef = useRef(null);
  const mountedRef = useRef(false);
  /**
   * Rows will always have n+1 line because of the <tr><th></th></tr> elements
   */
  const [rowIndex, setRowIndex] = useState(initialRow);
  const [colIndex, setColIndex] = useState(initialCol);

  const setTableValues = useCallback(({ colIndex, rowIndex }) => {
    setColIndex(colIndex);
    setRowIndex(rowIndex);
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      focusFocusable(tableRef.current);
    }

    if (!mountedRef.current) {
      mountedRef.current = true;
    }
  }, [colIndex, rowIndex]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.RIGHT: {
        e.preventDefault();
        setColIndex((prevColIndex) => (prevColIndex < colCount - 1 ? prevColIndex + 1 : prevColIndex));

        break;
      }

      case KeyboardKeys.LEFT: {
        e.preventDefault();
        setColIndex((prevColIndex) => (prevColIndex > 0 ? prevColIndex - 1 : prevColIndex));

        break;
      }

      case KeyboardKeys.UP: {
        e.preventDefault();
        setRowIndex((prevRowIndex) => (prevRowIndex > 0 ? prevRowIndex - 1 : prevRowIndex));

        break;
      }

      case KeyboardKeys.DOWN: {
        e.preventDefault();
        setRowIndex((prevRowIndex) => (prevRowIndex < rowCount - 1 ? prevRowIndex + 1 : prevRowIndex));

        break;
      }

      case KeyboardKeys.HOME: {
        e.preventDefault();

        if (e.ctrlKey) {
          setRowIndex(0);
        }

        setColIndex(0);

        break;
      }

      case KeyboardKeys.END: {
        e.preventDefault();

        if (e.ctrlKey) {
          setRowIndex(rowCount - 1);
        }

        setColIndex(colCount - 1);

        break;
      }

      case KeyboardKeys.PAGE_DOWN: {
        e.preventDefault();

        setRowIndex((prevRowIndex) => (prevRowIndex + jumpStep < rowCount ? prevRowIndex + jumpStep : rowCount - 1));

        break;
      }

      case KeyboardKeys.PAGE_UP: {
        e.preventDefault();

        setRowIndex((prevRowIndex) => (prevRowIndex - jumpStep > 0 ? prevRowIndex - jumpStep : 0));

        break;
      }

      default:
        break;
    }
  };

  return (
    <RawTableContext.Provider value={{ rowIndex, colIndex, setTableValues }}>
      <table
        role="grid"
        ref={tableRef}
        aria-rowcount={rowCount}
        aria-colcount={colCount}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </RawTableContext.Provider>
  );
};

RawTable.defaultProps = {
  jumpStep: 3,
  initialCol: 0,
  initialRow: 0,
};

RawTable.propTypes = {
  colCount: PropTypes.number.isRequired,
  initialCol: PropTypes.number,
  initialRow: PropTypes.number,
  jumpStep: PropTypes.number,
  rowCount: PropTypes.number.isRequired,
};
