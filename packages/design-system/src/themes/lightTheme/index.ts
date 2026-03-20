import { DefaultTheme } from 'styled-components';

import { commonTheme } from '../common-theme';
import { COLOR_SCHEMES } from '../color-scheme';

import { lightColorTokenObject } from './light-colors';
import { lightShadowTokenObject } from './light-shadows';

export const lightTheme: DefaultTheme = {
  colorScheme: COLOR_SCHEMES.LIGHT,
  colors: lightColorTokenObject.color,
  shadows: lightShadowTokenObject.shadow,
  ...commonTheme,
};
