import { Colors, Shadows } from './colors';
import { CommonTheme } from './common-theme';

export * from './lightTheme';
export * from './darkTheme';
export * from './extendTheme';
export * from './utils';

/**
 * Identifies which built-in color scheme a theme is based on. Read it from a
 * `styled-components` theme (`theme.colorScheme`) when a style genuinely has to
 * branch on light vs dark — prefer semantic color tokens whenever one exists.
 */
export type ColorScheme = 'light' | 'dark';

export interface StrapiTheme extends CommonTheme {
  colors: Colors;
  shadows: Shadows;
  colorScheme: ColorScheme;
}
