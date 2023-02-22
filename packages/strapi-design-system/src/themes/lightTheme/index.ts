import { DefaultTheme } from 'styled-components';

import { commonTheme } from '../common-theme';
import { lightColorTokenObject } from './light-colors';
import { lightShadowTokenObject } from './light-shadows';

export const lightTheme: DefaultTheme = {
  colors: lightColorTokenObject.color,
  shadows: lightShadowTokenObject.shadow,
  ...commonTheme,
};
