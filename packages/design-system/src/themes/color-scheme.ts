export const COLOR_SCHEMES = {
  light: 'light',
  dark: 'dark',
} as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];
