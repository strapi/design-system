import { create, ThemeVars } from '@storybook/theming';

export const createCustomTheme = <TStorybookTheme extends boolean = true>({
  theme,
  options = {
    base: 'light',
  },
  asStorybookTheme,
}: {
  theme: any;
  options?: ThemeVars;
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

  return asStorybookTheme ? create(themeValue) : themeValue;
};
