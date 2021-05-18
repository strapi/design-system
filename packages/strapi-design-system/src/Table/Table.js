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
          setColIndex((prevColIndex) => (prevColIndex < colCount - 1 ? prevColIndex + 1 : prevColIndex));

          break;
        }

        case KeyboardKeys.ARROW_LEFT: {
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
