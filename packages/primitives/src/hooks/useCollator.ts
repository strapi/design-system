/**
 * Stolen from @react-aria/i18n
 */

const cache = new Map<string, Intl.Collator>();

/**
 * Provides localized string collation for the current locale. Automatically updates when the locale changes,
 * and handles caching of the collator for performance.
 * @param options - Collator options.
 */
export function useCollator(locale: string, options?: Intl.CollatorOptions): Intl.Collator {
  const cacheKey =
    locale +
    (options
      ? Object.entries(options)
          .sort((a, b) => (a[0] < b[0] ? -1 : 1))
          .join()
      : '');

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const formatter = new Intl.Collator(locale, options);
  cache.set(cacheKey, formatter);

  return formatter;
}
