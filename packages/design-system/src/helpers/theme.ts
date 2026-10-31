import { DefaultTheme } from 'styled-components';

import { isKeyOf } from './objects';

export function extractStyleFromTheme<TKey extends keyof DefaultTheme, TSection extends DefaultTheme[TKey]>(
  themeSection: TSection | null | undefined,
  key: string | number | symbol | undefined,
  defaultValue: unknown,
): string | number {
  if (themeSection && key && isKeyOf(themeSection, key)) {
    return themeSection[key];
  }

  // The fallback goes back unchanged. The cast keeps the published string | number return type
  return defaultValue as string | number;
}
