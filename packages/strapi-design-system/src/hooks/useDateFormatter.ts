import * as React from 'react';

import { DateFormatter } from '@internationalized/date';

export interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  calendar?: string;
}

/**
 * This hook wraps the `DateFormatter` from `@internationalized/date`. Which essentially is
 * an extension of the `Intl.DateTimeFormat` API with some additional features.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * for more information.
 *
 * @returns a memoized DateFormatter instance
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *  const monthFormatter = useDateFormatter(locale, { month: 'long' });
 *  const months: string[] = React.useMemo(
 *    () => [...Array(12).keys()].map((m) => monthFormatter.format(new Date(Date.UTC(2023, m)))),
 *    [monthFormatter],
 *   );
 *
 *  // assuming the locale is `en-GB` this will render `Janyary` to `December`.
 *  return months.map((month) => <p key={month}>{month}</p>)
 * }
 * ```
 */
export function useDateFormatter(locale: string, options?: DateFormatterOptions): DateFormatter {
  // Reuse last options object if it is shallowly equal, which allows the useMemo result to also be reused.
  let lastOptions = React.useRef<DateFormatterOptions | null>(null);

  if (options && lastOptions.current && isEqual(options, lastOptions.current)) {
    options = lastOptions.current;
  }

  lastOptions.current = options ?? null;

  return React.useMemo(() => new DateFormatter(locale, options), [locale, options]);
}

function isEqual(a: DateFormatterOptions, b: DateFormatterOptions) {
  if (a === b) {
    return true;
  }

  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (let key of aKeys) {
    if (b[key] !== a[key]) {
      return false;
    }
  }

  return true;
}
