import { DefaultTheme } from 'styled-components';

import { commonTheme } from '../common-theme';
import { COLOR_SCHEMES } from '../color-scheme';

import { darkColorTokenObject } from './dark-colors';
import { darkShadowTokenObject } from './dark-shadows';

export const darkTheme: DefaultTheme = {
  colorScheme: COLOR_SCHEMES.dark,
  colors: darkColorTokenObject.color,
  shadows: darkShadowTokenObject.shadow,
  ...commonTheme,
};
