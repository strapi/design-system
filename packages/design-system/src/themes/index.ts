import { ColorScheme } from './color-scheme';
import { Colors, Shadows } from './colors';
import { CommonTheme } from './common-theme';

export * from './color-scheme';
export * from './lightTheme';
export * from './darkTheme';
export * from './extendTheme';
export * from './utils';

export interface StrapiTheme extends CommonTheme {
  colors: Colors;
  shadows: Shadows;
  colorScheme: ColorScheme;
}
