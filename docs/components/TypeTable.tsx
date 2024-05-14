/**
 * Atm we just render `null` but we'll use this component to take a type and render a table of its properties.
 * We'll probably use typedoc to parse the information.
 */

interface TypeTableProps {
  of: unknown;
}

const TypeTable = ({ of }: TypeTableProps) => {
  return null;
};

export { TypeTable };
export type { TypeTableProps };
