import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TableContext } from './TableContext';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const Table = ({ colCount, rowCount, jumpStep, ...props }) => {
  const tableRef = useRef(null);
  /**
   * Rows will always have n+1 line because of the <tr><th></th></tr> elements
   */
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case KeyboardKeys.ARROW_RIGHT: {
          e.preventDefault();
          setColIndex((s) => (s < colCount - 1 ? s + 1 : s));

          break;
        }

        case KeyboardKeys.ARROW_LEFT: {
          e.preventDefault();
          setColIndex((s) => (s > 0 ? s - 1 : s));

          break;
        }

        case KeyboardKeys.UP: {
          e.preventDefault();
          setRowIndex((s) => (s > 0 ? s - 1 : s));
          break;
        }

        case KeyboardKeys.DOWN: {
          e.preventDefault();
          setRowIndex((s) => (s < rowCount - 1 ? s + 1 : s));
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

          setRowIndex((s) => (s + jumpStep < rowCount ? s + jumpStep : rowCount - 1));

          break;
        }

        case KeyboardKeys.PAGE_UP: {
          e.preventDefault();

          setRowIndex((s) => (s - jumpStep > 0 ? s - jumpStep : 0));
          break;
        }

        default:
          break;
      }
    };

    tableRef.current.addEventListener('keydown', handleKeyDown);

    return () => {
      tableRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <TableContext.Provider value={{ rowIndex, colIndex }}>
      <table ref={tableRef} aria-rowcount={rowCount} aria-colcount={colCount} {...props} />
    </TableContext.Provider>
  );
};

Table.defaultProps = {
  jumpStep: 3,
};

Table.propTypes = {
  colCount: PropTypes.number.isRequired,
  jumpStep: PropTypes.number,
  rowCount: PropTypes.number.isRequired,
};
