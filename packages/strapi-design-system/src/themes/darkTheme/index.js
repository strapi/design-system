import { darkColorTokenObject } from './dark-colors';
import { darkShadowTokenObject } from './dark-shadows';
import { commonTheme } from '../common-theme';

export const darkTheme = {
  colors: darkColorTokenObject.color,
  shadows: darkShadowTokenObject.shadow,
  ...commonTheme,
};
