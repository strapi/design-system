'use client';

import * as React from 'react';

/*
 * RawTable is the unstyled grid that Table builds on. It implements the WAI-ARIA grid pattern of the legacy RawTable:
 * one roving cell holds `tabindex="0"`, the arrow keys move it, and a cell with an input or several controls is
 * "entered" with Enter and left with Escape. The cell, row and section parts carry the same aria attributes as the
 * legacy parts (`role="grid"`, `role="gridcell"`, `aria-rowcount`, `aria-colcount`, `aria-rowindex`, `aria-colindex`)
 */

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/*
 * The legacy selector, plus the ARIA widget roles. A Base UI control (checkbox, switch, radio) is a `<span>` with a
 * role, not a `<button>`, and keeps its role once the grid sets its `tabindex` to -1
 */
const FOCUSABLE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'details',
  '[tabindex]:not([tabindex="-1"])',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="switch"]',
  '[role="radio"]',
  '[role="combobox"]',
].join(', ');

const getFocusableNodes = (node: HTMLElement, includeNegativeTabIndex?: boolean): HTMLElement[] =>
  [...node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter((element) => {
    if (element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true') return false;

    // A Base UI control renders a hidden native input next to its visible part. Only the visible part takes focus
    if (element.getAttribute('aria-hidden') === 'true') return false;

    if (includeNegativeTabIndex) return true;

    return element.getAttribute('tabindex') !== '-1';
  });

/**
 * The nodes with their own keyboard navigation, such as a text input, where the arrow keys move the caret
 */
const getFocusableNodesWithKeyboardNav = (nodes: HTMLElement[]) =>
  nodes.filter((node) => {
    if (node.tagName === 'INPUT') {
      return (node as HTMLInputElement).type !== 'checkbox' && (node as HTMLInputElement).type !== 'radio';
    }

    return false;
  });

const BUTTON_LIKE_ROLES = ['button', 'checkbox', 'switch', 'radio'];

/**
 * The legacy grid treats a cell of buttons only as a toolbar. The legacy controls were `<button>` elements, the Base UI
 * ones are spans with a widget role, so both count as buttons here
 */
const isButtonLike = (node: HTMLElement) =>
  node.tagName === 'BUTTON' || BUTTON_LIKE_ROLES.includes(node.getAttribute('role') ?? '');

const focusFocusable = (node: HTMLElement | null) => {
  const nextNode = node?.querySelector<HTMLElement>('[tabindex="0"]');

  nextNode?.focus();
};

const useComposedRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useCallback((node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  }, refs);

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface RawTableContextValue {
  rowIndex: number;
  colIndex: number;
  setTableValues: (values: { rowIndex: number; colIndex: number }) => void;
}

const RawTableContext = React.createContext<RawTableContextValue>({
  rowIndex: 0,
  colIndex: 0,
  setTableValues() {
    throw new Error('setTableValues must be initialized via the RawTableContext.Provider');
  },
});

const useRawTable = () => React.useContext(RawTableContext);

/* -------------------------------------------------------------------------------------------------
 * RawTable
 * -----------------------------------------------------------------------------------------------*/

interface RawTableProps extends React.ComponentPropsWithoutRef<'table'> {
  /**
   * The number of columns, exposed as `aria-colcount`
   */
  colCount: number;
  /**
   * The number of rows, header row included, exposed as `aria-rowcount`
   */
  rowCount: number;
  /**
   * The column of the cell that holds the focus first, zero-based
   * @default 0
   */
  initialCol?: number;
  /**
   * The row of the cell that holds the focus first, zero-based
   * @default 0
   */
  initialRow?: number;
  /**
   * How many rows PageUp and PageDown move the focus by
   * @default 3
   */
  jumpStep?: number;
}

const RawTable = React.forwardRef<HTMLTableElement, RawTableProps>(
  ({ colCount, rowCount, jumpStep = 3, initialCol = 0, initialRow = 0, onKeyDown, ...props }, forwardedRef) => {
    const tableRef = React.useRef<HTMLTableElement>(null);
    const composedRef = useComposedRefs(tableRef, forwardedRef);
    const mountedRef = React.useRef(false);
    /*
     * Focus follows the roving cell only during keyboard navigation. A pointer interaction already focuses the
     * clicked element and reports its coords through `setTableValues`. Re-focusing the roving cell there would scroll
     * it into view and jump a scrolled table back to the top
     */
    const shouldSkipFocusRef = React.useRef(false);
    const [rowIndex, setRowIndex] = React.useState(initialRow);
    const [colIndex, setColIndex] = React.useState(initialCol);

    const setTableValues = React.useCallback<RawTableContextValue['setTableValues']>(({ colIndex, rowIndex }) => {
      shouldSkipFocusRef.current = true;
      setColIndex(colIndex);
      setRowIndex(rowIndex);
    }, []);

    React.useEffect(() => {
      if (mountedRef.current && !shouldSkipFocusRef.current) {
        focusFocusable(tableRef.current);
      }

      shouldSkipFocusRef.current = false;
      mountedRef.current = true;
    }, [colIndex, rowIndex]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) return;

      // A key press is keyboard navigation: focus follows the roving cell when the index changes below
      shouldSkipFocusRef.current = false;

      switch (event.key) {
        case 'ArrowRight': {
          event.preventDefault();
          setColIndex((prev) => (prev < colCount - 1 ? prev + 1 : prev));
          break;
        }

        case 'ArrowLeft': {
          event.preventDefault();
          setColIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          setRowIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        }

        case 'ArrowDown': {
          event.preventDefault();
          setRowIndex((prev) => (prev < rowCount - 1 ? prev + 1 : prev));
          break;
        }

        case 'Home': {
          event.preventDefault();

          if (event.ctrlKey) {
            setRowIndex(0);
          }

          setColIndex(0);
          break;
        }

        case 'End': {
          event.preventDefault();

          if (event.ctrlKey) {
            setRowIndex(rowCount - 1);
          }

          setColIndex(colCount - 1);
          break;
        }

        case 'PageDown': {
          event.preventDefault();
          setRowIndex((prev) => (prev + jumpStep < rowCount ? prev + jumpStep : rowCount - 1));
          break;
        }

        case 'PageUp': {
          event.preventDefault();
          setRowIndex((prev) => (prev - jumpStep > 0 ? prev - jumpStep : 0));
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
          ref={composedRef}
          aria-rowcount={rowCount}
          aria-colcount={colCount}
          data-slot="raw-table"
          onKeyDown={handleKeyDown}
          {...props}
        />
      </RawTableContext.Provider>
    );
  },
);

RawTable.displayName = 'RawTable';

/* -------------------------------------------------------------------------------------------------
 * RawThead / RawTbody
 * -----------------------------------------------------------------------------------------------*/

/**
 * Gives each row its `aria-rowindex`. It is 1-based and the header row is the first one
 */
const indexRows = (children: React.ReactNode, getIndex: (index: number) => number) =>
  React.Children.toArray(children).map((child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{ 'aria-rowindex'?: number }>, {
        'aria-rowindex': getIndex(index),
      });
    }

    return child;
  });

type RawTheadProps = React.ComponentPropsWithoutRef<'thead'>;

const RawThead = React.forwardRef<HTMLTableSectionElement, RawTheadProps>(({ children, ...props }, ref) => (
  <thead ref={ref} data-slot="raw-table-header" {...props}>
    {indexRows(children, () => 1)}
  </thead>
));

RawThead.displayName = 'RawThead';

type RawTbodyProps = React.ComponentPropsWithoutRef<'tbody'>;

const RawTbody = React.forwardRef<HTMLTableSectionElement, RawTbodyProps>(({ children, ...props }, ref) => (
  // The header row is row 1, so the first body row is row 2
  <tbody ref={ref} data-slot="raw-table-body" {...props}>
    {indexRows(children, (index) => index + 2)}
  </tbody>
));

RawTbody.displayName = 'RawTbody';

/* -------------------------------------------------------------------------------------------------
 * RawTr
 * -----------------------------------------------------------------------------------------------*/

interface RawTrProps extends React.ComponentPropsWithoutRef<'tr'> {
  'aria-rowindex'?: number;
}

const RawTr = React.forwardRef<HTMLTableRowElement, RawTrProps>(({ children, ...props }, ref) => {
  const rowIndex = props['aria-rowindex'];

  const cells = React.Children.toArray(children).map((child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<RawTdProps>, {
        'aria-colindex': index + 1,
        coords: { col: index + 1, row: rowIndex ?? 0 },
      });
    }

    return child;
  });

  return (
    <tr ref={ref} data-slot="raw-table-row" {...props}>
      {cells}
    </tr>
  );
});

RawTr.displayName = 'RawTr';

/* -------------------------------------------------------------------------------------------------
 * RawTd / RawTh
 * -----------------------------------------------------------------------------------------------*/

interface RawTdProps extends React.ComponentPropsWithoutRef<'td'> {
  'aria-colindex'?: number;
  /**
   * The 1-based position of the cell. RawTr sets it, so you do not pass it yourself
   */
  coords?: {
    col: number;
    row: number;
  };
}

type RawThProps = React.ComponentPropsWithoutRef<'th'> & Pick<RawTdProps, 'aria-colindex' | 'coords'>;

const DEFAULT_COORDS = { col: 0, row: 0 };

const useGridCell = (
  coords: NonNullable<RawTdProps['coords']>,
  onKeyDown: React.KeyboardEventHandler<HTMLTableCellElement> | undefined,
) => {
  const cellRef = React.useRef<HTMLTableCellElement>(null);
  const { rowIndex, colIndex, setTableValues } = useRawTable();
  const [isActive, setIsActive] = React.useState(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTableCellElement> = (event) => {
    onKeyDown?.(event);

    const cell = cellRef.current;

    if (!cell || event.defaultPrevented) return;

    const focusableNodes = getFocusableNodes(cell, true);

    /*
     * A cell without focusable children, or with a single child that has no keyboard navigation of its own, leaves the
     * keys to the grid
     */
    if (
      focusableNodes.length === 0 ||
      (focusableNodes.length === 1 && getFocusableNodesWithKeyboardNav(focusableNodes).length === 0)
    ) {
      return;
    }

    /*
     * A cell of buttons only works as a toolbar: left and right move between the buttons, and leave the cell at its
     * edges
     */
    if (focusableNodes.length > 1 && focusableNodes.every(isButtonLike)) {
      event.preventDefault();
      const focusedIndex = focusableNodes.findIndex((node) => node === document.activeElement);

      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const nextNode = focusableNodes[focusedIndex + (event.key === 'ArrowRight' ? 1 : -1)];

        if (nextNode) {
          event.stopPropagation();
          nextNode.focus();
        }
      }

      return;
    }

    const isEnterKey = event.key === 'Enter';

    if (isEnterKey && !isActive) {
      setIsActive(true);
    } else if ((event.key === 'Escape' || isEnterKey) && isActive) {
      // Enter on a link follows the link, so it does not leave the cell
      if (isEnterKey && document.activeElement?.tagName === 'A') {
        return;
      }

      setIsActive(false);
      cell.focus();
    } else if (isActive) {
      // While the cell is active, its content owns the keys
      event.stopPropagation();
    }
  };

  const isFocused = rowIndex === coords.row - 1 && colIndex === coords.col - 1;

  /*
   * The cell itself takes focus when it has no focusable child, a single child with its own keyboard navigation, or
   * several children that are not all buttons. Otherwise its children take the focus
   */
  useIsomorphicLayoutEffect(() => {
    const cell = cellRef.current;

    if (!cell) return;

    const focusableNodes = getFocusableNodes(cell, true);

    if (
      focusableNodes.length === 0 ||
      (focusableNodes.length === 1 && getFocusableNodesWithKeyboardNav(focusableNodes).length !== 0) ||
      (focusableNodes.length > 1 && !focusableNodes.every(isButtonLike))
    ) {
      cell.setAttribute('tabIndex', !isActive && isFocused ? '0' : '-1');

      focusableNodes.forEach((node, index) => {
        node.setAttribute('tabIndex', isActive ? '0' : '-1');

        // An active cell focuses its first child, as a focus trap would
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
    const cell = cellRef.current;

    if (!cell) return;

    const focusableNodes = getFocusableNodes(cell, true);

    if (
      focusableNodes.length >= 1 &&
      (getFocusableNodesWithKeyboardNav(focusableNodes).length !== 0 || focusableNodes.every(isButtonLike))
    ) {
      setIsActive(true);
    }

    setTableValues({ rowIndex: coords.row - 1, colIndex: coords.col - 1 });
  }, [coords.row, coords.col, setTableValues]);

  // A click on a child with its own keyboard navigation, such as an input, moves the roving cell to this one
  useIsomorphicLayoutEffect(() => {
    const cell = cellRef.current;

    if (!cell) return undefined;

    const focusableNodes = getFocusableNodes(cell, true);

    focusableNodes.forEach((node) => node.addEventListener('focus', handleFocusableNodeFocus));

    return () => {
      focusableNodes.forEach((node) => node.removeEventListener('focus', handleFocusableNodeFocus));
    };
  }, [handleFocusableNodeFocus]);

  return { cellRef, handleKeyDown };
};

const RawTd = React.forwardRef<HTMLTableCellElement, RawTdProps>(
  ({ coords = DEFAULT_COORDS, onKeyDown, ...props }, forwardedRef) => {
    const { cellRef, handleKeyDown } = useGridCell(coords, onKeyDown);
    const composedRef = useComposedRefs(cellRef, forwardedRef);

    return <td role="gridcell" data-slot="raw-table-cell" ref={composedRef} onKeyDown={handleKeyDown} {...props} />;
  },
);

RawTd.displayName = 'RawTd';

const RawTh = React.forwardRef<HTMLTableCellElement, RawThProps>(
  ({ coords = DEFAULT_COORDS, onKeyDown, ...props }, forwardedRef) => {
    const { cellRef, handleKeyDown } = useGridCell(coords, onKeyDown);
    const composedRef = useComposedRefs(cellRef, forwardedRef);

    return <th role="gridcell" data-slot="raw-table-head" ref={composedRef} onKeyDown={handleKeyDown} {...props} />;
  },
);

RawTh.displayName = 'RawTh';

export { RawTable, RawThead, RawTbody, RawTr, RawTd, RawTh, useRawTable };
export type { RawTableProps, RawTheadProps, RawTbodyProps, RawTrProps, RawTdProps, RawThProps, RawTableContextValue };
