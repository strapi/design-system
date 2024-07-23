import { DefaultTheme } from 'styled-components';

import { isKeyOf } from './objects';

export function extractStyleFromTheme<TKey extends keyof DefaultTheme, TSection extends DefaultTheme[TKey]>(
  themeSection: TSection | null | undefined,
  key: string | number | symbol | undefined,
  defaultValue: any,
): string | number {
  if (themeSection && key && isKeyOf(themeSection, key)) {
    return themeSection[key];
  }

  return defaultValue;
}
