import { Provider as TooltipProvider, TooltipProviderProps } from '@radix-ui/react-tooltip';
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
  tooltipConfig?: Omit<TooltipProviderProps, 'children'>;
}

const DesignSystemProvider = ({
  children,
  locale = getDefaultLocale(),
  theme = lightTheme,
  tooltipConfig,
}: DesignSystemProviderProps) => {
  return (
    <Provider locale={locale}>
      <ThemeProvider theme={theme}>
        <TooltipProvider {...tooltipConfig}>{children}</TooltipProvider>
        <LiveRegions />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  );
};

export { useDesignSystem, DesignSystemProvider };
export type { DesignSystemProviderProps, DesignSystemContextValue };
