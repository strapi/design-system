import { useLayoutEffect } from 'react';

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
  useLayoutEffect(() => {
    /**
     * Switching themes should not trigger transitions and animations on elements.
     * The following code will remove all transitions and animations when the theme changes.
     */
    const css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(
      document.createTextNode(`
        * {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
          animation: none !important;
        }
    `),
    );
    document.head.appendChild(css);

    const _ = window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
  }, [theme]);

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
