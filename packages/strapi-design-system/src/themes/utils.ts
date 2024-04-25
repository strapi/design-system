import { css, DefaultTheme } from 'styled-components';

export const getThemeSize = <TType extends keyof DefaultTheme['sizes']>(type: TType) => {
  return ({ theme, size }: { theme: DefaultTheme; size: keyof DefaultTheme['sizes'][TType] }) =>
    theme.sizes[type][size];
};

export const inputFocusStyle =
  (rootElement = '&') =>
  ({ theme, hasError = false }: { theme: DefaultTheme; hasError?: boolean }) => css`
    outline: none;
    box-shadow: 0;
    transition-property: border-color, box-shadow, fill;
    transition-duration: 0.2s;

    ${rootElement}:focus-within {
      border: 1px solid ${hasError ? theme.colors.danger600 : theme.colors.primary600};
      box-shadow: ${hasError ? theme.colors.danger600 : theme.colors.primary600} 0px 0px 0px 2px;
    }
  `;
