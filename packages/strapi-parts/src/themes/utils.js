export const getThemeSize = (type) => {
  return ({ theme, size }) => theme.sizes[type][size];
};

export const inputFocusStyle = ({ theme, hasError }) => `
outline: 2px solid ${hasError ? theme.colors.danger600 : theme.colors.primary600};
border: 1px solid ${hasError ? theme.colors.danger600 : theme.colors.primary600};
box-shadow: revert;
`;
