export const getThemeSize = (type) => {
  return ({ theme, size }) => theme.sizes[type][size];
};
