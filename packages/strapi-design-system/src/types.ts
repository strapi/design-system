import { CSSProperties } from 'react';

import { DefaultTheme } from 'styled-components';

export type DefaultThemeOrCSSProp<T extends keyof DefaultTheme, K extends keyof CSSProperties> =
  | keyof DefaultTheme[T]
  | CSSProperties[K];
