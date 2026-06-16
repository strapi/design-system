import { DefaultTheme } from 'styled-components';

import { commonTheme } from '../common-theme';

import { lightColorTokenObject } from './light-colors';
import { lightShadowTokenObject } from './light-shadows';

export const lightTheme: DefaultTheme = {
  colorScheme: 'light',
  colors: lightColorTokenObject.color,
  shadows: lightShadowTokenObject.shadow,
  ...commonTheme,
};
