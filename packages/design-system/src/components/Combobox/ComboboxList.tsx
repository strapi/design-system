interface ComboboxListProps {
  options: unknown[];
}

/**
 * @preserve
 * @deprecated
 * This component was deprecated in 1.6.2. It will be removed in the next major release 2.0.0.
 */
export const ComboboxList = ({ options }: ComboboxListProps): JSX.Element => {
  // Need to return this in a fragment because otherwise TS says that the return type is an array which isn't JSX.Element
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{options}</>;
};
