import { create, ThemeVars, ThemeVarsPartial } from '@storybook/theming';
import { DefaultTheme } from 'styled-components';

export const createCustomTheme = <TStorybookTheme extends boolean = true>({
  theme,
  options = {
    base: 'light',
  },
  asStorybookTheme,
}: {
  theme: DefaultTheme;
  options?: ThemeVarsPartial;
  asStorybookTheme?: TStorybookTheme;
}): TStorybookTheme extends true ? ThemeVars : object => {
  const themeValue = {
    // UI
    appBg: theme.colors.neutral100,
    appContentBg: theme.colors.neutral0,
    appBorderColor: theme.colors.neutral200,

    // Text colors
    textColor: theme.colors.neutral800,

    // Toolbar default and active colors
    barTextColor: theme.colors.neutral800,
    barSelectedColor: theme.colors.primary600,
    barBg: theme.colors.neutral0,

    ...options,
  };

  // @ts-expect-error this isn't that vital to solve.
  return asStorybookTheme ? create(themeValue) : themeValue;
};
