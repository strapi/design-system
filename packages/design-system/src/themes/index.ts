import { Colors, Shadows } from './colors';
import { CommonTheme } from './common-theme';

export * from './lightTheme';
export * from './darkTheme';
export * from './extendTheme';
export * from './utils';

export interface StrapiTheme extends CommonTheme {
  colors: Colors;
  shadows: Shadows;
}
