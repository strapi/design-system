export const COLOR_SCHEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];
