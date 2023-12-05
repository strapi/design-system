import * as React from 'react';

import { DefaultTheme } from 'styled-components';

export type DefaultThemeOrCSSProp<T extends keyof DefaultTheme, K extends keyof React.CSSProperties> =
  | keyof DefaultTheme[T]
  | React.CSSProperties[K];
