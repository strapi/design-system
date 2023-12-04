import * as React from 'react';

import { DefaultTheme } from 'styled-components';

type DefaultThemeOrCSSProp<T extends keyof DefaultTheme, K extends keyof React.CSSProperties> =
  | keyof DefaultTheme[T]
  | React.CSSProperties[K];

/**
 * Take all the keys of an object and prefix them
 * with a dollar sign but keep the values.
 */
type PrefixWithDollar<T> = {
  [K in keyof T as `$${string & K}`]?: T[K];
};

export type { DefaultThemeOrCSSProp, PrefixWithDollar };
