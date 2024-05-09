import { DefaultTheme, ThemeProvider } from 'styled-components';

import { LiveRegions } from '../components/LiveRegions';
import { createContext } from '../helpers/context';
import { GlobalStyle } from '../styles/global';
import { lightTheme } from '../themes';

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

interface DesignSystemProviderProps extends Partial<DesignSystemContextValue> {
  children?: React.ReactNode;
  theme?: DefaultTheme;
}

const DesignSystemProvider = ({
  locale = getDefaultLocale(),
  theme = lightTheme,
  children,
}: DesignSystemProviderProps) => {
  return (
    <Provider locale={locale}>
      <ThemeProvider theme={theme}>
        {children}
        <LiveRegions />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export { useDesignSystem, DesignSystemProvider };
export type { DesignSystemProviderProps, DesignSystemContextValue };
