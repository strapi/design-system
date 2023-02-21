import { DefaultTheme } from 'styled-components';

import { commonTheme } from '../common-theme';
import { darkColorTokenObject } from './dark-colors';
import { darkShadowTokenObject } from './dark-shadows';

export const darkTheme: DefaultTheme = {
  colors: darkColorTokenObject.color,
  shadows: darkShadowTokenObject.shadow,
  ...commonTheme,
};
