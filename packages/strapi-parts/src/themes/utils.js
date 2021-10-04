export const getThemeSize = (type) => {
  return ({ theme, size }) => theme.sizes[type][size];
};

export const inputFocusStyle = ({ theme, hasError }) => `
border: 1px solid ${hasError ? theme.colors.danger600 : theme.colors.primary600};
box-shadow: ${hasError ? theme.colors.danger600 : theme.colors.primary600} 0px 0px 0px 2px;
`;

export const buttonFocusStyle = ({ theme }) => `
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
`;
