import * as React from 'react';

import { focusFocusable } from './focusFocusable';
import { RawTableContext } from './RawTableContext';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export interface RawTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  colCount: number;
  initialCol?: number;
  initialRow?: number;
  jumpStep?: number;
  rowCount: number;
}

export const RawTable = ({ colCount, rowCount, jumpStep = 3, initialCol = 0, initialRow = 0, ...props }) => {
  const tableRef = React.useRef(null);
  const mountedRef = React.useRef(false);
  /**
   * Rows will always have n+1 line because of the <tr><th></th></tr> elements
   */
  const [rowIndex, setRowIndex] = React.useState(initialRow);
  const [colIndex, setColIndex] = React.useState(initialCol);

  const setTableValues = React.useCallback(({ colIndex, rowIndex }) => {
    setColIndex(colIndex);
    setRowIndex(rowIndex);
  }, []);

  React.useEffect(() => {
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

  const context = React.useMemo(() => ({ rowIndex, colIndex, setTableValues }), [colIndex, rowIndex, setTableValues]);

  return (
    <RawTableContext.Provider value={context}>
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
