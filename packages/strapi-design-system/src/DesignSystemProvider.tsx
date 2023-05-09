import { createContext } from './helpers/context';
import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';

const DEFAULT_LOCALE = 'en-EN';

const getDefaultLocale = () => {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  if (navigator.language) {
    return navigator.language;
  }

  return DEFAULT_LOCALE;
};

interface DesignSystemContextValue {
  locale: string;
}

const [Provider, useDesignSystem] = createContext<DesignSystemContextValue>('StrapiDesignSystem', {
  locale: getDefaultLocale(),
});

interface DesignSystemProviderProps extends ThemeProviderProps, Partial<DesignSystemContextValue> {}

const DesignSystemProvider = ({ locale = getDefaultLocale(), ...restProps }: DesignSystemProviderProps) => {
  return (
    <Provider locale={locale}>
      <ThemeProvider {...restProps} />
    </Provider>
  );
};

export { useDesignSystem, DesignSystemProvider };
export type { DesignSystemProviderProps, DesignSystemContextValue };
