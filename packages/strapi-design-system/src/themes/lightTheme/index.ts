import { DefaultTheme } from 'styled-components';

import { lightColorTokenObject } from './light-colors';
import { lightShadowTokenObject } from './light-shadows';
import { commonTheme } from '../common-theme';

export const lightTheme: DefaultTheme = {
  colors: lightColorTokenObject.color,
  shadows: lightShadowTokenObject.shadow,
  ...commonTheme,
};
