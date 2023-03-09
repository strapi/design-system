/**
 * Stolen from @react-aria/i18n
 */

import { useCollator } from './useCollator';

export interface Filter {
  /** Returns whether a string starts with a given substring. */
  startsWith(string: string, substring: string): boolean;
  /** Returns whether a string ends with a given substring. */
  endsWith(string: string, substring: string): boolean;
  /** Returns whether a string contains a given substring. */
  contains(string: string, substring: string): boolean;
}

/**
 * Provides localized string search functionality that is useful for filtering or matching items
 * in a list. Options can be provided to adjust the sensitivity to case, diacritics, and other parameters.
 */
export function useFilter(locale: string, options?: Intl.CollatorOptions): Filter {
  let collator = useCollator(locale, {
    usage: 'search',
    ...options,
  });

  return {
    startsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }

      // Normalize both strings so we can slice safely
      string = string.normalize('NFC');
      substring = substring.normalize('NFC');

      return collator.compare(string.slice(0, substring.length), substring) === 0;
    },
    endsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }

      string = string.normalize('NFC');
      substring = substring.normalize('NFC');

      return collator.compare(string.slice(-substring.length), substring) === 0;
    },
    contains(string, substring) {
      if (substring.length === 0) {
        return true;
      }

      string = string.normalize('NFC');
      substring = substring.normalize('NFC');

      let scan = 0;
      let sliceLen = substring.length;
      for (; scan + sliceLen <= string.length; scan++) {
        let slice = string.slice(scan, scan + sliceLen);

        if (collator.compare(substring, slice) === 0) {
          return true;
        }
      }

      return false;
    },
  };
}
