import * as React from 'react';

const DEFAULT_LOCALE = 'en-EN';

const LocaleContext = React.createContext<string | undefined>(undefined);

interface LocaleProviderProps {
  /**
   * A BCP 47 locale, e.g. `fr-FR`. The pickers, the number input and the combobox format and match with it
   */
  locale: string;
  children?: React.ReactNode;
}

/**
 * Sets the locale of every component below it, in place of the legacy `DesignSystemProvider` `locale` prop.
 * A component `locale` prop still wins
 */
const LocaleProvider = ({ locale, children }: LocaleProviderProps) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

/**
 * The locale of a component: its own prop, else the closest `LocaleProvider`, else the browser language
 */
const useLocale = (localeProp?: string): string => {
  const contextLocale = React.useContext(LocaleContext);

  const browserLocale = typeof navigator !== 'undefined' ? navigator.language : undefined;

  return localeProp ?? contextLocale ?? (browserLocale || DEFAULT_LOCALE);
};

export { LocaleProvider, useLocale };
export type { LocaleProviderProps };
