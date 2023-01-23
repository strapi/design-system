import { create } from '@storybook/theming/create';

export const createCustomTheme = ({ theme, options = {}, asStorybookTheme = true }) => {
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
