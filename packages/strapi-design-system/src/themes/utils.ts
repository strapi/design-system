import { css, DefaultTheme, ThemeSizes } from 'styled-components';

export const getThemeSize = <TType extends keyof ThemeSizes>(type: TType) => {
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

export const buttonFocusStyle = ({ theme }: { theme: DefaultTheme }) => css`
  position: relative;
  outline: none;

  &:after {
    transition-property: all;
    transition-duration: 0.2s;
    border-radius: 8px;
    content: '';
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
    border: 2px solid transparent;
  }

  &:focus-visible {
    outline: none;
    &:after {
      border-radius: 8px;
      content: '';
      position: absolute;
      top: -5px;
      bottom: -5px;
      left: -5px;
      right: -5px;
      border: 2px solid ${theme.colors.primary600};
    }
  }
`;
